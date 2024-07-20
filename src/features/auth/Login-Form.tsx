import { Button } from "@/features/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/features/components/ui/form"

import { Calendar } from "@/features/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/features/components/ui/popover"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { FaGoogle } from "react-icons/fa"

const loginSchema = z.object({
   gender: z.string().min(1, { message: "Gender is required" }),
   dob: z.date({
      required_error: "A date of birth is required.",
   }),
})

const LoginForm = () => {
   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         gender: "",
         dob: undefined,
      },
   })

   function onSubmit(values: z.infer<typeof loginSchema>) {
      console.log(values)
   }

   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:w-1/3">
               <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                 <SelectValue placeholder="Choose Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="male">Male</SelectItem>
                                 <SelectItem value="female">Female</SelectItem>
                                 <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                           </Select>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={"outline"}
                                       className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground",
                                       )}
                                    >
                                       {field.value ? (
                                          format(field.value, "PPP")
                                       ) : (
                                          <span>Pick a date</span>
                                       )}
                                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                 </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                       date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                 />
                              </PopoverContent>
                           </Popover>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <Button className="mx-auto flex justify-center gap-2" variant="outline">
                  <FaGoogle />
                  <span>Login with Google</span>
               </Button>
            </form>
         </Form>
      </>
   )
}
export default LoginForm
