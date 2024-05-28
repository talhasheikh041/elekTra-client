import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/features/components/ui/dialog"
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
} from "@/features/components/ui/form"
import { Input } from "@/features/components/ui/input"
import { Button } from "@/features/components/ui/button"
import { useState } from "react"

const newProductSchema = z.object({
   name: z.string().min(1, { message: "Name is required" }),
   price: z.number().min(0, { message: "Price must be a positive number" }),
   stock: z.number().int().min(0, { message: "Stock must be a positive integer" }),
   photo: z.string().url({ message: "Photo must be a valid URL" }),
})

const AddProductCard = () => {
   const [open, setOpen] = useState(false)

   const form = useForm<z.infer<typeof newProductSchema>>({
      resolver: zodResolver(newProductSchema),
      defaultValues: {
         name: "",
         price: 0,
         stock: 0,
         photo: "",
      },
   })

   const onSubmit = (values: z.infer<typeof newProductSchema>) => {
      console.log(values)
      console.log("running")
   }

   const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen)
      if (!isOpen) {
         form.reset() // Reset the form when modal is closed
      }
   }

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>
            <CirclePlusIcon
               size={"40px"}
               className="rounded-full bg-primary px-2 py-2 text-white"
            />
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="mx-auto text-3xl uppercase tracking-wider">
                  New Product
               </DialogTitle>

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
                                       onChange={(e) => field.onChange(Number(e.target.value))}
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
                                       onChange={(e) => field.onChange(Number(e.target.value))}
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
                                    <Input type="file" {...field} />
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
            </DialogHeader>
         </DialogContent>
      </Dialog>
   )
}
export default AddProductCard
