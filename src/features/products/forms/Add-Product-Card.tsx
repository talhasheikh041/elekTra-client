import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/features/global-components/ui/dialog"
import { CirclePlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormControl,
   // FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/features/global-components/ui/form"
import { Input } from "@/features/global-components/ui/input"
import { Button } from "@/features/global-components/ui/button"
import { useState } from "react"
import MyTooltip from "@/features/global-components/shared/My-Tooltip"

const productSchema = z.object({
   name: z.string().min(1, { message: "Name is required" }),
   price: z.number().min(0, { message: "Price must be a positive number" }),
   stock: z.number().int().min(0, { message: "Stock must be a positive integer" }),
   photo: z
      .instanceof(File, { message: "Photo is required" })
      .refine((file) => file.size <= 5 * 1024 * 1024, { message: "Photo must be less than 5MB" }),
})

const AddProductCard = () => {
   const [open, setOpen] = useState(false)
   const [photoURL, setPhotoURL] = useState<string | null>(null)

   const form = useForm<z.infer<typeof productSchema>>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: "",
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

   const onSubmit = (values: z.infer<typeof productSchema>) => {
      console.log(values)
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
         <DialogContent>
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
