import { Button, buttonVariants } from "@/features/global-components/ui/button"
import {
   Dialog,
   DialogContent,
   // DialogDescription,
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
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type EditProductCardProps = {
   product: {
      photo: string
      name: string
      price: number
      stock: number
   }
}

const productSchema = z.object({
   name: z.string().min(1, { message: "Name is required" }),
   price: z.number().min(0, { message: "Price must be a positive number" }),
   stock: z.number().int().min(0, { message: "Stock must be a positive integer" }),
   photo: z
      .instanceof(File, { message: "Photo is required" })
      .refine((file) => file.size <= 5 * 1024 * 1024, { message: "Photo must be less than 5MB" }),
})

const EditProductCard = ({ product }: EditProductCardProps) => {
   const [open, setOpen] = useState(false)
   const [item, setItem] = useState(product)

   const form = useForm<z.infer<typeof productSchema>>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: item.name,
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
               photo: reader.result as string
            }))
         }
      }
   }

   const onSubmit = (values: z.infer<typeof productSchema>) => {
      console.log(values)
   }

   const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen)
      if (!isOpen) {
         form.reset()
         setItem((prev) => ({
            ...prev,
            photo: product.photo
         }))
      }
   }

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>
            <span
               className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-5 cursor-pointer rounded-full px-3",
               )}
            >
               Manage
            </span>
         </DialogTrigger>
         <DialogContent className="max-w-4xl overflow-y-auto max-h-screen">
            <DialogHeader>
               <DialogTitle className="mx-auto text-2xl font-light uppercase tracking-widest">
                  Edit Product
               </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-12">
               <div className="flex-1 rounded-lg border p-4">
                  <div className="flex justify-end">
                     <span className="font-semibold text-green-500">
                        {form.getValues().stock} available
                     </span>
                  </div>

                  <div className="mt-4">
                     <img
                        className="rounded-lg object-cover aspect-square"
                        src={item.photo as string}
                        alt="product-photo"
                     />
                  </div>

                  <div className="flex flex-col items-center justify-center mt-5 gap-4">
                     <span className="tracking-widest mx-auto">{form.getValues().name}</span>
                     <span className="text-3xl font-bold">${form.getValues().price}</span>
                  </div>
               </div>

               <div className="flex-1">
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
                              Create
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
