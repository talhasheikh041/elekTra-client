import { Form, FormControl, FormField, FormItem, FormMessage } from "@/features/global-components/ui/form"

import { Input } from "@/features/global-components/ui/input"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/global-components/ui/select"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/features/global-components/ui/button"

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

const ShippingForm = () => {
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
      <>
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
      </>
   )
}
export default ShippingForm
