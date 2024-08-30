import { selectUser } from "@/features/customers/reducer/user-reducer"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { useNewProductMutation } from "@/features/products/api/product-api"
import { cn, responseToast } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import Tiptap from "@/features/global-components/shared/editor/Tiptap"
import { Button, buttonVariants } from "@/features/global-components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/features/global-components/ui/form"
import { Input } from "@/features/global-components/ui/input"
import { Textarea } from "@/features/global-components/ui/textarea"
import { Loader, Trash, Upload } from "lucide-react"
import { useRef } from "react"

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
      .max(6, { message: "You can upload a maximum of 6 photos" }),
   shortDescription: z
      .string()
      .min(100, { message: "Short description must be at least 100 characters" })
      .max(260, { message: "Short description must be 260 characters or less" }),
   detail: z.string(),
})

export interface TiptapEditorRef {
   clearEditor: () => void
}

const NewProduct = () => {
   const { user } = useAppSelector(selectUser)

   const [newProduct, { isLoading }] = useNewProductMutation()

   const editorRef = useRef<TiptapEditorRef | null>(null)

   const form = useForm<z.infer<typeof productSchema>>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: "",
         category: "",
         detail: "",
         shortDescription: "",
         price: undefined,
         stock: undefined,
         photos: [],
      },
   })

   const handleDeletePreview = (index: number) => {
      const updatedPhotos = form.getValues().photos.filter((_, i) => i !== index)
      form.setValue("photos", updatedPhotos, { shouldValidate: true })
   }

   const onSubmit = async (values: z.infer<typeof productSchema>) => {
      try {
         const formData = new FormData()

         formData.set("name", values.name)
         formData.set("price", values.price.toString())
         formData.set("stock", values.stock.toString())
         formData.set("category", values.category.toString())
         formData.set("shortDescription", values.shortDescription)
         formData.set("detail", values.detail)

         values.photos.forEach((photo) => {
            formData.append(`photos`, photo)
         })

         const res = await newProduct({ id: user?._id!, formData })
         responseToast(res)
         editorRef.current?.clearEditor()
         form.reset()
      } catch (error) {
         toast.error(error as string)
      }
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">New Product</CardTitle>
         </CardHeader>
         <CardContent>
            <div>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
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
                                          e.target.value === "" ? null : Number(e.target.value),
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
                                          e.target.value === "" ? null : Number(e.target.value),
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
                                       }
                                    }}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className="col-span-full flex flex-wrap justify-center gap-3">
                        {form.getValues().photos &&
                           form.getValues().photos.map((photo, index) => (
                              <div
                                 key={index}
                                 className="relative h-24 w-24 overflow-hidden rounded-md border border-[#ccc]"
                              >
                                 <img
                                    src={URL.createObjectURL(photo)}
                                    alt="Selected"
                                    className="h-full w-full object-cover"
                                 />
                                 <Button
                                    type="button"
                                    onClick={() => handleDeletePreview(index)}
                                    className="absolute right-1 top-1 h-6 w-6"
                                    variant={"destructive"}
                                    size={"icon"}
                                 >
                                    <Trash size={16} />
                                 </Button>
                              </div>
                           ))}
                     </div>

                     <div className="col-span-full flex justify-center">
                        <Button className="text-md mx-auto px-6" type="submit" disabled={isLoading}>
                           {isLoading ? (
                              <span className="inline-flex items-center gap-2">
                                 Creating <Loader className="animate-spin" />
                              </span>
                           ) : (
                              <span>Create</span>
                           )}
                        </Button>
                     </div>
                  </form>
               </Form>
            </div>
         </CardContent>
      </Card>
   )
}
export default NewProduct
