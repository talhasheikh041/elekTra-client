import { selectUser } from "@/features/customers/reducer/user-reducer"
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
import { Button } from "@/features/global-components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/features/global-components/ui/dialog"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/features/global-components/ui/form"
import { Input } from "@/features/global-components/ui/input"
import {
   useDeleteProductMutation,
   useUpdateProductMutation,
} from "@/features/products/api/product-api"
import { responseToast } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaTrash } from "react-icons/fa"
import { toast } from "sonner"
import { z } from "zod"

type EditProductCardProps = {
   product: {
      photo: string
      name: string
      category: string
      price: number
      stock: number
      _id: string
   }
}

const productSchema = z.object({
   name: z.string().min(1, { message: "Name is required" }),
   category: z.string().min(1, { message: "Category is required" }),
   price: z.number().min(0, { message: "Price must be a positive number" }),
   stock: z.number().int().min(0, { message: "Stock must be a positive integer" }),
   photo: z
      .instanceof(File, { message: "Photo is required" })
      .refine((file) => file.size <= 5 * 1024 * 1024, { message: "Photo must be less than 5MB" })
      .optional(),
})

const EditProductCard = ({ product }: EditProductCardProps) => {
   const [open, setOpen] = useState(false)
   const [item, setItem] = useState(product)

   const { user } = useAppSelector(selectUser)

   const [updateProduct] = useUpdateProductMutation()
   const [deleteProduct] = useDeleteProductMutation()

   const form = useForm<z.infer<typeof productSchema>>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: item.name,
         category: item.category,
         price: item.price,
         stock: item.stock,
         photo: undefined,
      },
   })

   const handlePhotoPreview = (file: File) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
         if (typeof reader.result === "string") {
            setItem((prev) => ({
               ...prev,
               photo: reader.result as string,
            }))
         }
      }
   }

   const updateProductHandler = async (values: z.infer<typeof productSchema>) => {
      try {
         const formData = new FormData()

         formData.set("name", values.name)
         formData.set("price", values.price.toString())
         formData.set("stock", values.stock.toString())
         formData.set("category", values.category.toString())

         if (values.photo) formData.set("photo", values.photo)

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
      if (!isOpen) {
         form.reset()
         setItem((prev) => ({
            ...prev,
            photo: product.photo,
         }))
      }
   }

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>
            <Badge className="cursor-pointer">Manage</Badge>
         </DialogTrigger>
         <DialogContent className="max-h-screen max-w-4xl overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="mx-auto text-2xl font-light uppercase tracking-widest">
                  Edit Product
               </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-12">
               <div className="relative flex-1 rounded-lg border p-4">
                  <div className="flex justify-end">
                     <span className="font-semibold text-green-500">
                        {form.getValues().stock} available
                     </span>
                  </div>

                  <div className="mt-4 flex justify-center">
                     <img
                        className="h-60 rounded-lg object-contain"
                        src={item.photo as string}
                        alt="product-photo"
                     />
                  </div>

                  <div className="mt-5 flex flex-col items-center justify-center gap-4">
                     <span className="mx-auto tracking-widest">{form.getValues().name}</span>
                     <span className="text-3xl font-bold">${form.getValues().price}</span>
                  </div>

                  <div className="absolute left-2 top-2">
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant={"destructive"} size={"icon"}>
                              <FaTrash size={"18px"} />
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
               </div>

               <div className="flex-1">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(updateProductHandler)} className="space-y-6">
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
                           name="photo"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Photo</FormLabel>
                                 <FormControl>
                                    <Input
                                       type="file"
                                       onChange={(e) => {
                                          const file = e.target.files?.[0]
                                          if (file) {
                                             field.onChange(file)
                                             handlePhotoPreview(file)
                                          }
                                       }}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="flex justify-center">
                           <Button className="text-md mx-auto px-6" type="submit">
                              Update
                           </Button>
                        </div>
                     </form>
                  </Form>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   )
}
export default EditProductCard
