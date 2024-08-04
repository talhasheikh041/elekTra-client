import { Button } from "@/features/global-components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/features/global-components/ui/form"

import { useLoginMutation } from "@/features/auth/api/auth-api"
import { useLazyGetUserQuery } from "@/features/customers/api/user-api"
import { userExist, userNotExist } from "@/features/customers/reducer/user-reducer"
import { Calendar } from "@/features/global-components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/features/global-components/ui/popover"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/global-components/ui/select"
import { auth } from "@/firebase"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/redux/store"
import { CustomErrorType, MessageResponseType } from "@/types/api-types"
import { format } from "date-fns"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { CalendarIcon } from "lucide-react"
import { FaGoogle } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const loginSchema = z.object({
   gender: z.string().min(1, { message: "Gender is required" }).optional(),
   dob: z
      .date({
         required_error: "A date of birth is required.",
      })
      .optional(),
})

const LoginForm = () => {
   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         gender: undefined,
         dob: undefined,
      },
   })

   const location = useLocation()
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const [login] = useLoginMutation()
   const [trigger] = useLazyGetUserQuery()

   async function onSubmit(values: z.infer<typeof loginSchema>) {
      const { dob, gender } = values
      try {
         const provider = new GoogleAuthProvider()
         const { user } = await signInWithPopup(auth, provider)

         await login({
            _id: user.uid,
            name: user.displayName!,
            email: user.email!,
            gender: gender!,
            dob: dob?.toISOString()!,
            photo: user.photoURL!,
         }).unwrap()

         const data = await trigger(user.uid).unwrap()
         dispatch(userExist(data.user))
      } catch (error) {
         const err = error as CustomErrorType
         toast.error(err.data.message)
         dispatch(userNotExist())
      }
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
                                    captionLayout="dropdown"
                                    classNames={{
                                       caption_dropdowns: "flex justify-between w-full",
                                       vhidden: "hidden",
                                       dropdown_month: "flex",
                                       dropdown:
                                          "flex w-full items-center justify-between rounded-md border border-input bg-background px-2 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                                       dropdown_icon: "hidden",
                                       caption_label: "hidden",
                                    }}
                                    fromYear={1900}
                                    toYear={2025}
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
