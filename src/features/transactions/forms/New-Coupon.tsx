import { selectUser } from "@/features/customers/reducer/user-reducer"
import MyTooltip from "@/features/global-components/shared/My-Tooltip"
import { Button } from "@/features/global-components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
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
import { Switch } from "@/features/global-components/ui/switch"
import { useAppSelector } from "@/redux/store"
import { MessageResponseType } from "@/types/api-types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { CirclePlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const couponFormSchema = z
   .object({
      prefix: z.string().optional(),
      couponLength: z.number().int().min(8).max(25),
      discount: z.number().gt(0, { message: "Discount must be greater than 0" }),
      options: z
         .object({
            includeCharacters: z.boolean(),
            includeSymbols: z.boolean(),
            includeNumbers: z.boolean(),
         })
         .required()
         .refine(
            (options) =>
               options.includeCharacters || options.includeSymbols || options.includeNumbers,
            {
               message: "At least one of 'options' must be selected",
            },
         ),
   })
   .superRefine((data, ctx) => {
      if (data.prefix && data.prefix.length > data.couponLength) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Prefix length must be equal to or less than coupon length",
            path: ["prefix"],
         })
      }
   })

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const allNumbers = "1234567890"
const allSymbols = "!@#$%^&*()_+"

type NewCouponProps = {
   setRevalidate: React.Dispatch<React.SetStateAction<boolean>>
}

const NewCoupon = ({ setRevalidate }: NewCouponProps) => {
   const [coupon, setCoupon] = useState("")
   const [isCopied, setIsCopied] = useState(false)
   const [open, setOpen] = useState(false)

   const { user } = useAppSelector(selectUser)

   const form = useForm<z.infer<typeof couponFormSchema>>({
      resolver: zodResolver(couponFormSchema),
      defaultValues: {
         prefix: "",
         couponLength: 8,
         discount: undefined,
         options: {
            includeCharacters: false,
            includeNumbers: false,
            includeSymbols: false,
         },
      },
   })

   const handleCouponCopy = async () => {
      const clipboard = window.navigator.clipboard
      await clipboard.writeText(coupon)
      setIsCopied(true)
   }

   const onSubmit = async (values: z.infer<typeof couponFormSchema>) => {
      const { couponLength, options, prefix } = values
      let couponString = ""
      if (prefix) couponString += prefix
      if (couponLength === couponString.length) return setCoupon(couponString)

      while (couponString.length < couponLength) {
         if (options.includeCharacters) {
            const characterIndex = Math.floor(Math.random() * allLetters.length)
            couponString += allLetters[characterIndex]
         }
         if (options.includeNumbers) {
            const numberIndex = Math.floor(Math.random() * allNumbers.length)
            couponString += allNumbers[numberIndex]
         }
         if (options.includeSymbols) {
            const symbolIndex = Math.floor(Math.random() * allSymbols.length)
            couponString += allSymbols[symbolIndex]
         }
      }

      setCoupon(couponString)
      setIsCopied(false)
   }

   const handleActivate = async () => {
      const discount = form.getValues().discount

      try {
         const res = await axios.post<MessageResponseType>(
            `${import.meta.env.VITE_SERVER_LINK}/api/v1/payment/coupon/new?id=${user?._id}`,
            { coupon, discount },
            {
               headers: {
                  "Content-Type": "application/json",
               },
            },
         )

         toast.success(res.data.message)
         handleOpenChange(false)
         setRevalidate((prev) => !prev)
      } catch (error) {
         toast.error((error as AxiosError<MessageResponseType>).response?.data.message)
      }
   }

   const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen)
      setCoupon("")
      form.reset({
         prefix: "",
         couponLength: 8,
         discount: undefined,
         options: {
            includeCharacters: false,
            includeNumbers: false,
            includeSymbols: false,
         },
      })
   }

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>
            <Button size="icon" className="rounded-full">
               <MyTooltip title="Add new Coupon">
                  <CirclePlusIcon size={"30px"} />
               </MyTooltip>
            </Button>
         </DialogTrigger>
         <DialogContent className="max-h-full overflow-y-scroll">
            <DialogHeader>
               <DialogTitle className="mx-auto text-2xl font-light uppercase tracking-widest">
                  New Coupon
               </DialogTitle>
               <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
               <section>
                  <Form {...form}>
                     <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                           control={form.control}
                           name="prefix"
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormLabel>Coupon Text</FormLabel>
                                    <FormControl>
                                       <Input {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )
                           }}
                        />
                        <FormField
                           control={form.control}
                           name="couponLength"
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormLabel>Coupon Length</FormLabel>
                                    <FormControl>
                                       <Input
                                          {...field}
                                          type="number"
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
                              )
                           }}
                        />

                        <FormField
                           control={form.control}
                           name="discount"
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormLabel>Discount %</FormLabel>
                                    <FormControl>
                                       <Input
                                          {...field}
                                          type="number"
                                          value={field.value !== undefined ? field.value : ""}
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
                              )
                           }}
                        />

                        <div className="mt-2 flex flex-col space-y-1">
                           <FormField
                              control={form.control}
                              name="options.includeCharacters"
                              render={({ field }) => {
                                 return (
                                    <FormItem className="flex items-center justify-between">
                                       <FormLabel>Characters</FormLabel>
                                       <FormControl>
                                          <Switch
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                          />
                                       </FormControl>
                                    </FormItem>
                                 )
                              }}
                           />
                           <FormField
                              control={form.control}
                              name="options.includeNumbers"
                              render={({ field }) => {
                                 return (
                                    <FormItem className="flex items-center justify-between">
                                       <FormLabel>Numbers</FormLabel>
                                       <FormControl>
                                          <Switch
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                          />
                                       </FormControl>
                                    </FormItem>
                                 )
                              }}
                           />
                           <FormField
                              control={form.control}
                              name="options.includeSymbols"
                              render={({ field }) => {
                                 return (
                                    <FormItem className="flex items-center justify-between">
                                       <FormLabel>Symbols</FormLabel>
                                       <FormControl>
                                          <Switch
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                          />
                                       </FormControl>
                                    </FormItem>
                                 )
                              }}
                           />
                        </div>
                        {form.formState.errors.options?.root?.message && (
                           <div className="mt-2 flex justify-center text-red-500">
                              {form.formState.errors.options?.root?.message}
                           </div>
                        )}
                        <div className="mt-8 flex justify-center gap-3">
                           <Button variant={"outline"} size={"default"} type="submit">
                              Generate
                           </Button>
                           {coupon && (
                              <Button
                                 onClick={handleActivate}
                                 type="button"
                                 size={"default"}
                                 variant={"default"}
                              >
                                 Activate
                              </Button>
                           )}
                        </div>
                     </form>
                  </Form>
               </section>

               <section className="mt-8">
                  {coupon && (
                     <p
                        className={`relative flex cursor-pointer justify-center rounded-lg border border-gray-500 px-2 py-1  before:absolute before:-top-6 before:left-[50%] before:rounded-lg before:bg-black before:px-2 before:text-white before:transition-all before:hover:-translate-x-1/2 ${!isCopied ? "before:hover:content-['Copy']" : "before:hover:content-['Copied']"} `}
                        onClick={handleCouponCopy}
                     >
                        {coupon}
                     </p>
                  )}
               </section>
            </div>
         </DialogContent>
      </Dialog>
   )
}
export default NewCoupon
