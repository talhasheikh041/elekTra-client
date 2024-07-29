import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/features/global-components/ui/form"
import { Button } from "@/features/global-components/ui/button"
import { Input } from "@/features/global-components/ui/input"
import { Checkbox } from "@/features/global-components/ui/checkbox"
import { useState } from "react"

const couponFormSchema = z
   .object({
      prefix: z.string().optional(),
      couponLength: z.number().int().min(8).max(25),
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

const Coupon = () => {
   const [coupon, setCoupon] = useState("")
   const [isCopied, setIsCopied] = useState(false)

   const form = useForm<z.infer<typeof couponFormSchema>>({
      resolver: zodResolver(couponFormSchema),
      defaultValues: {
         prefix: "",
         couponLength: 8,
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

   const onSubmit = (values: z.infer<typeof couponFormSchema>) => {
      const { couponLength, options, prefix } = values
      let couponString = ""
      if (prefix) couponString += prefix
      if (couponLength === couponString.length) return couponString

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

   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">Coupon</CardTitle>
         </CardHeader>
         <CardContent className=" grid h-[calc(100vh_-_106px)] place-items-center">
            <section>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                     <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-5 sm:space-y-0">
                        <FormField
                           control={form.control}
                           name="prefix"
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormControl>
                                       <Input
                                          {...field}
                                          type="text"
                                          placeholder="Text to display"
                                          className="w-auto"
                                       />
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
                                          placeholder="Coupon Length"
                                          className="w-auto"
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )
                           }}
                        />
                     </div>

                     <fieldset className="mt-3">
                        <legend>Include</legend>
                        <div className="mt-2 flex flex-col space-y-1 sm:flex-row sm:space-x-8">
                           <FormField
                              control={form.control}
                              name="options.includeCharacters"
                              render={({ field }) => {
                                 return (
                                    <FormItem className="flex space-x-1 space-y-0 sm:items-center sm:justify-center">
                                       <FormControl>
                                          <Checkbox
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                          />
                                       </FormControl>
                                       <FormLabel>Characters</FormLabel>
                                    </FormItem>
                                 )
                              }}
                           />
                           <FormField
                              control={form.control}
                              name="options.includeNumbers"
                              render={({ field }) => {
                                 return (
                                    <FormItem className="flex space-x-1 space-y-0 sm:items-center sm:justify-center">
                                       <FormControl>
                                          <Checkbox
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                          />
                                       </FormControl>
                                       <FormLabel>Numbers</FormLabel>
                                    </FormItem>
                                 )
                              }}
                           />
                           <FormField
                              control={form.control}
                              name="options.includeSymbols"
                              render={({ field }) => {
                                 return (
                                    <FormItem className="flex space-x-1 space-y-0 sm:items-center sm:justify-center">
                                       <FormControl>
                                          <Checkbox
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                          />
                                       </FormControl>
                                       <FormLabel>Symbols</FormLabel>
                                    </FormItem>
                                 )
                              }}
                           />
                        </div>
                        {form.formState.errors.options?.root?.message && (
                           <div className="mt-2 text-red-500">
                              {form.formState.errors.options?.root?.message}
                           </div>
                        )}
                     </fieldset>
                     <div className="mt-8 flex justify-center">
                        <Button className="sm:w-1/4" type="submit">
                           Generate
                        </Button>
                     </div>
                  </form>
               </Form>
            </section>

            <section className="mt-6">
               {coupon && (
                  <p
                     className={`relative cursor-pointer rounded-lg border border-gray-500 px-2 py-1  before:absolute before:left-3 before:top-6 before:rounded-lg before:bg-black before:px-2 before:text-white before:transition-all before:hover:translate-y-1/2 ${!isCopied ? "before:hover:content-['Copy']" : "before:hover:content-['Copied']"} `}
                     onClick={handleCouponCopy}
                  >
                     {coupon}
                  </p>
               )}
            </section>
         </CardContent>
      </Card>
   )
}
export default Coupon
