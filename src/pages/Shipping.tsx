import { Button } from "@/features/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage
} from "@/features/components/ui/form"

import { Input } from "@/features/components/ui/input"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowBigLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

const addressSchema = z.object({
   address: z.string().min(1, "Address is required"),
   city: z.string().min(1, "City is required"),
   state: z.string().min(1, "State is required"),
   country: z.string().min(1, "Country is required"),
   pinCode: z
      .number()
      .positive("PinCode must be a positive number")
      .int("PinCode must be an integer"),
})

const Shipping = () => {
   const form = useForm<z.infer<typeof addressSchema>>({
      resolver: zodResolver(addressSchema),
      defaultValues: {
         address: "",
         city: "",
         state: "",
         country: "",
         pinCode: undefined,
      },
   })

   function onSubmit(values: z.infer<typeof addressSchema>) {
      console.log(values)
   }

   return (
      <section className="relative">
         <div>
            <Link to="..">
               <Button
                  size="icon"
                  variant="default"
                  className="absolute left-7 top-0 rounded-full bg-secondary-foreground dark:bg-primary-foreground"
               >
                  <ArrowBigLeft className="text-secondary transition-transform hover:-translate-x-[2px]" />
               </Button>
            </Link>
         </div>

         <h1 className="mt-10 flex justify-center text-5xl font-light uppercase tracking-widest">
            Shipping
         </h1>

         <div className="mt-8 flex justify-center">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:w-1/3">
                  <FormField
                     control={form.control}
                     name="address"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input placeholder="Address" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="city"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input placeholder="City" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="country"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Choose Country" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="pakistan">Pakistan</SelectItem>
                                    <SelectItem value="india">India</SelectItem>
                                    <SelectItem value="turkey">Turkey</SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="state"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input placeholder="State" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="pinCode"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 type="number"
                                 placeholder="Pin Code"
                                 {...field}
                                 value={field.value === undefined ? "" : field.value}
                                 onChange={(e) =>
                                    field.onChange(
                                       e.target.value === "" ? undefined : Number(e.target.value),
                                    )
                                 }
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button className="mx-auto flex" type="submit">
                     Pay Now
                  </Button>
               </form>
            </Form>
         </div>
      </section>
   )
}
export default Shipping
