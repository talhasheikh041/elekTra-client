import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/features/global-components/ui/table"

import coverImg from "@/assets/cover.jpg"
import { Button } from "@/features/global-components/ui/button"
import { Input } from "@/features/global-components/ui/input"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"

const Cart = () => {
   const [couponCode, setCouponCode] = useState<string>("")
   const [isCouponCodeValid, setIsCouponCodeValid] = useState(true)

   return (
      <section className="mx-auto px-4 sm:w-3/4 sm:px-0">
         <h1 className="mt-10 flex justify-center text-5xl font-light uppercase tracking-widest">
            Cart
         </h1>

         <div className="mt-10">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="">Decription</TableHead>
                     <TableHead>Quantity</TableHead>
                     <TableHead>Price</TableHead>
                     <TableHead className="text-right">Remove</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  <TableRow>
                     <TableCell>
                        <div className="flex items-center gap-4">
                           <div className="w-11">
                              <img className="rounded-md object-cover" src={coverImg} alt="" />
                           </div>
                           <p>Canon M50 Mark 2</p>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-2">
                           <Button
                              variant="outline"
                              className="flex size-8 cursor-pointer items-center justify-center text-lg"
                              size="icon"
                           >
                              +
                           </Button>
                           <p>1</p>
                           <Button
                              variant="outline"
                              className="flex size-8 cursor-pointer items-center justify-center text-lg"
                              size="icon"
                           >
                              -
                           </Button>
                        </div>
                     </TableCell>
                     <TableCell>$9999</TableCell>
                     <TableCell className="text-right">
                        <div>
                           <Button className="size-8" size="icon" variant="destructive">
                              <FaTrash />
                           </Button>
                        </div>
                     </TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>
                        <div className="flex items-center gap-4">
                           <div className="w-11">
                              <img className="rounded-md object-cover" src={coverImg} alt="" />
                           </div>
                           <p>Canon M50 Mark 2</p>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-2">
                           <Button
                              variant="outline"
                              className="flex size-8 cursor-pointer items-center justify-center text-lg"
                              size="icon"
                           >
                              +
                           </Button>
                           <p>1</p>
                           <Button
                              variant="outline"
                              className="flex size-8 cursor-pointer items-center justify-center text-lg"
                              size="icon"
                           >
                              -
                           </Button>
                        </div>
                     </TableCell>
                     <TableCell>$9999</TableCell>
                     <TableCell className="text-right">
                        <div>
                           <Button className="size-8" size="icon" variant="destructive">
                              <FaTrash />
                           </Button>
                        </div>
                     </TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </div>

         <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="flex items-center justify-center gap-6 rounded-md border bg-secondary p-4">
               <p>Subtotal</p>
               <strong>$100</strong>
            </div>

            <div className="flex items-center justify-center gap-6 rounded-md border bg-secondary p-4">
               <p>Discount</p>
               <strong>$100</strong>
            </div>

            <div className="flex items-center justify-center gap-6 rounded-md border bg-secondary p-4">
               <p>Delivery</p>
               <strong>$100</strong>
            </div>

            <div className="flex items-center justify-center gap-6 rounded-md border bg-secondary p-4">
               <p>Tax</p>
               <strong>$100</strong>
            </div>

            <div className="flex items-center justify-center gap-6 rounded-md border border-primary p-4 sm:col-span-2 md:col-span-1">
               <p>Total</p>
               <strong>$100</strong>
            </div>
         </div>

         <div className="mt-5 flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col">
               <label className="text-sm text-muted-foreground" htmlFor="couponCode">
                  If you have a coupon code, please enter it here
               </label>
               <Input
                  onChange={(e) => setCouponCode(e.target.value)}
                  value={couponCode}
                  type="text"
                  placeholder="Enter coupon code"
                  className="mt-1 focus-visible:ring-0"
               />
               {couponCode &&
                  (isCouponCodeValid ? (
                     <span className="text-xs text-green-500">Coupon Code Valid!</span>
                  ) : (
                     <span className="text-xs text-red-500">Invalid Coupon Code</span>
                  ))}
            </div>
            <div className="space-x-4 md:mt-6">
               <Button variant="outline">Apply Coupon</Button>
               <Button>Checkout</Button>
            </div>
         </div>
      </section>
   )
}
export default Cart
