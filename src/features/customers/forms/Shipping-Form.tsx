import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/features/global-components/ui/form"

import { Input } from "@/features/global-components/ui/input"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/global-components/ui/select"

import { Button } from "@/features/global-components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { useAppDispatch } from "@/redux/store"
import { saveShippingInfo } from "@/features/products/reducer/cart-reducer"

const addressSchema = z.object({
   address: z.string().min(1, "Address is required"),
   city: z.string().min(1, "City is required"),
   state: z.string().min(1, "State is required"),
   country: z.string().min(1, "Country is required"),
   pinCode: z.string().regex(/^\d{5}$/, "Pincode must be a 5-digit number"),
})

type ShippingFormProps = {
   amount: number
}

const ShippingForm = ({ amount }: ShippingFormProps) => {
   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const form = useForm<z.infer<typeof addressSchema>>({
      resolver: zodResolver(addressSchema),
      defaultValues: {
         address: "",
         city: "",
         state: "",
         country: "",
         pinCode: "",
      },
   })

   async function onSubmit(values: z.infer<typeof addressSchema>) {
      try {
         const res = await axios.post<{ clientSecret: string }>(
            `${import.meta.env.VITE_SERVER_LINK}/api/v1/payment/create`,
            { amount },
            { headers: { "Content-Type": "application/json" } },
         )

         navigate("/pay", { state: res.data.clientSecret })
         dispatch(saveShippingInfo(values))
      } catch (error: any) {
         toast.error(error.response.data.message || "Something went wrong")
      }
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
                           <Input placeholder="Pin Code" {...field} />
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
