import { selectUser } from "@/features/customers/reducer/user-reducer"
import MyTooltip from "@/features/global-components/shared/My-Tooltip"
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
import { useNewProductMutation } from "@/features/products/api/product-api"
import { responseToast } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { CirclePlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const productSchema = z.object({
   name: z.string().min(1, { message: "Name is required" }),
   category: z.string().min(1, { message: "Category is required" }),
   price: z.number().min(0, { message: "Price must be a positive number" }),
   stock: z.number().int().min(0, { message: "Stock must be a positive integer" }),
   photo: z
      .instanceof(File, { message: "Photo is required" })
      .refine((file) => file.size <= 5 * 1024 * 1024, { message: "Photo must be less than 5MB" }),
})

const AddProductCard = () => {
   const [open, setOpen] = useState(false)
   const [photoURL, setPhotoURL] = useState<string | null>(null)

   const { user } = useAppSelector(selectUser)

   const [newProduct] = useNewProductMutation()

   const form = useForm<z.infer<typeof productSchema>>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: "",
         category: "",
         price: undefined,
         stock: undefined,
         photo: undefined,
      },
   })

   const handlePhotoPreview = (file: File) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
         if (typeof reader.result === "string") setPhotoURL(reader.result)
      }
   }

   const onSubmit = async (values: z.infer<typeof productSchema>) => {
      try {
         const formData = new FormData()

         formData.set("name", values.name)
         formData.set("price", values.price.toString())
         formData.set("stock", values.stock.toString())
         formData.set("category", values.category.toString())
         formData.set("photo", values.photo)

         const res = await newProduct({ id: user?._id!, formData })
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
         setPhotoURL(null) // Reset the form when modal is closed
      }
   }

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>
            <Button size="icon" className="rounded-full">
               <MyTooltip title="Add new Product">
                  <CirclePlusIcon size={"30px"} />
               </MyTooltip>
            </Button>
         </DialogTrigger>
         <DialogContent className="h-full overflow-y-scroll">
            <DialogHeader>
               <DialogTitle className="mx-auto text-2xl font-light uppercase tracking-widest">
                  New Product
               </DialogTitle>
            </DialogHeader>
            <div>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                     {photoURL && (
                        <div className="mt-4 flex flex-col items-center space-y-2">
                           <p className="text-xs text-gray-500">Photo Preview</p>
                           <img className="size-20 rounded-lg" src={photoURL} alt="product photo" />
                        </div>
                     )}
                     <div className="flex justify-center">
                        <Button className="text-md mx-auto px-6" type="submit">
                           Create
                        </Button>
                     </div>
                  </form>
               </Form>
            </div>
         </DialogContent>
      </Dialog>
   )
}
export default AddProductCard
