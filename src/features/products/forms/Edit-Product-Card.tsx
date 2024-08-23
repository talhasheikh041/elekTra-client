import { selectUser } from "@/features/customers/reducer/user-reducer"
import Tiptap from "@/features/global-components/shared/editor/Tiptap"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/features/global-components/ui/alert-dialog"
import { Badge } from "@/features/global-components/ui/badge"
import { Button, buttonVariants } from "@/features/global-components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/features/global-components/ui/dialog"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/features/global-components/ui/form"
import { Input } from "@/features/global-components/ui/input"
import { Textarea } from "@/features/global-components/ui/textarea"
import {
   useDeleteProductMutation,
   useUpdateProductMutation,
} from "@/features/products/api/product-api"
import { cn, responseToast } from "@/lib/utils"
import { TiptapEditorRef } from "@/pages/admin/products/New-Product"
import { useAppSelector } from "@/redux/store"
import { ProductType } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload } from "lucide-react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type EditProductCardProps = {
   product: ProductType
}

const productSchema = z.object({
   name: z.string().min(1, { message: "Name is required" }),
   category: z.string().min(1, { message: "Category is required" }),
   price: z.number().min(0, { message: "Price must be a positive number" }),
   stock: z.number().int().min(0, { message: "Stock must be a positive integer" }),
   photos: z
      .array(
         z
            .instanceof(File, { message: "Each photo must be a valid file" })
            .refine((file) => file.size <= 5 * 1024 * 1024, {
               message: "Each photo must be less than 5MB",
            }),
      )
      .min(1, { message: "At least one photo is required" })
      .max(6, { message: "You can upload a maximum of 6 photos" })
      .optional(),
   shortDescription: z
      .string()
      .min(100, { message: "Short description must be at least 100 characters" })
      .max(260, { message: "Short description must be 260 characters or less" }),
   detail: z.string(),
})

const EditProductCard = ({ product }: EditProductCardProps) => {
   const [open, setOpen] = useState(false)

   const { user } = useAppSelector(selectUser)

   const [previewPhotos, setPreviewPhotos] = useState(() =>
      product.photos.map((photo) => photo.url),
   )

   const editorRef = useRef<TiptapEditorRef | null>(null)

   const [updateProduct] = useUpdateProductMutation()
   const [deleteProduct] = useDeleteProductMutation()

   const form = useForm<z.infer<typeof productSchema>>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: product.name,
         category: product.category,
         price: product.price,
         stock: product.stock,
         photos: undefined,
         shortDescription: product.shortDescription,
         detail: product.detail,
      },
   })

   const updateProductHandler = async (values: z.infer<typeof productSchema>) => {
      try {
         const formData = new FormData()

         formData.set("name", values.name)
         formData.set("price", values.price.toString())
         formData.set("stock", values.stock.toString())
         formData.set("category", values.category.toString())
         formData.set("shortDescription", values.shortDescription)
         formData.set("detail", values.detail)

         if (values.photos) {
            values.photos.forEach((photo) => {
               formData.append(`photos`, photo)
            })
         }

         const res = await updateProduct({ userId: user?._id!, productId: product._id, formData })
         responseToast(res)
         handleOpenChange(false)
      } catch (error) {
         toast.error(error as string)
      }
   }

   const deleteHandler = async () => {
      try {
         const res = await deleteProduct({ userId: user?._id!, productId: product._id })
         responseToast(res)
         handleOpenChange(false)
      } catch (error) {
         toast.error(error as string)
      }
   }

   const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen)
      if (isOpen) {
         form.reset({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            photos: undefined,
            shortDescription: product.shortDescription,
            detail: product.detail,
         })
      }
   }

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger>
            <Badge className="cursor-pointer">Manage</Badge>
         </DialogTrigger>
         <DialogContent className="max-h-screen max-w-5xl overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="mx-auto text-2xl font-light uppercase tracking-widest">
                  Edit Product
               </DialogTitle>
               <DialogDescription className="mx-auto">
                  Make changes to your product here. Click update when you're done.
               </DialogDescription>
            </DialogHeader>
            <div>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(updateProductHandler)}
                     className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                  >
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                 <Input
                                    type="number"
                                    {...field}
                                    value={field.value === undefined ? "" : field.value}
                                    onChange={(e) =>
                                       field.onChange(
                                          e.target.value === ""
                                             ? undefined
                                             : Number(e.target.value),
                                       )
                                    }
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                 <Input
                                    type="number"
                                    {...field}
                                    value={field.value === undefined ? "" : field.value}
                                    onChange={(e) =>
                                       field.onChange(
                                          e.target.value === ""
                                             ? undefined
                                             : Number(e.target.value),
                                       )
                                    }
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className="col-span-full">
                        <FormField
                           control={form.control}
                           name="shortDescription"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Short Description (250 characters)</FormLabel>
                                 <FormControl>
                                    <Textarea className="resize-none" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>

                     <div className="col-span-full">
                        <FormField
                           control={form.control}
                           name="detail"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Product Detail</FormLabel>
                                 <FormControl>
                                    {/* <Textarea className="h-60 resize-none" {...field} /> */}
                                    <Tiptap
                                       ref={editorRef}
                                       description={field.value}
                                       onChange={field.onChange}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>

                     <FormField
                        control={form.control}
                        name="photos"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="space-y-2">
                                 <div>Photos</div>
                                 <div
                                    className={cn(
                                       buttonVariants({ variant: "outline" }),
                                       "cursor-pointer justify-center gap-2",
                                    )}
                                 >
                                    <span>
                                       <Upload className="size-5" />
                                    </span>
                                    <span>Upload Photos</span>
                                 </div>
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    name={field.name}
                                    onBlur={field.onBlur}
                                    className="sr-only"
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                       const files = Object.values(e.target.files!)
                                       if (files) {
                                          field.onChange(files)
                                          setPreviewPhotos(
                                             files.map((file) => URL.createObjectURL(file)),
                                          )
                                       }
                                    }}
                                 />
                              </FormControl>
                              <FormDescription>This will replace the below photos</FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className="col-span-full flex flex-wrap gap-3">
                        {previewPhotos &&
                           previewPhotos.map((photo, index) => (
                              <div
                                 key={index}
                                 className="relative h-24 w-24 overflow-hidden rounded-md border border-[#ccc]"
                              >
                                 <img
                                    src={photo}
                                    alt="Selected"
                                    className="h-full w-full object-cover"
                                 />
                              </div>
                           ))}
                     </div>

                     <div className="col-span-full flex justify-center gap-3">
                        <Button variant={"default"} type="submit">
                           Update
                        </Button>

                        <AlertDialog>
                           <AlertDialogTrigger asChild>
                              <Button variant={"outline"} className="border border-black">
                                 Delete
                              </Button>
                           </AlertDialogTrigger>
                           <AlertDialogContent>
                              <AlertDialogHeader>
                                 <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                 <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    product.
                                 </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                                 <AlertDialogAction onClick={deleteHandler} asChild>
                                    <Button
                                       variant={"destructive"}
                                       className="bg-destructive hover:bg-destructive/90"
                                    >
                                       Delete
                                    </Button>
                                 </AlertDialogAction>
                              </AlertDialogFooter>
                           </AlertDialogContent>
                        </AlertDialog>
                     </div>
                  </form>
               </Form>
            </div>
         </DialogContent>
      </Dialog>
   )
}
export default EditProductCard
