import {
   Table,
   TableBody,
   TableHead,
   TableHeader,
   TableRow,
} from "@/features/global-components/ui/table"

import { Button } from "@/features/global-components/ui/button"
import { Input } from "@/features/global-components/ui/input"
import CartBill from "@/features/products/cart/Cart-Bill"
import CartItem from "@/features/products/cart/Cart-Item"
import { applyDiscount, calculateBill } from "@/features/products/reducer/cart-reducer"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import axios from "axios"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Link } from "react-router-dom"

const Cart = () => {
   const [couponCode, setCouponCode] = useState<string>("")
   const [isCouponCodeValid, setIsCouponCodeValid] = useState("")

   const { total } = useAppSelector((state) => state.cartReducer)

   const dispatch = useAppDispatch()

   const cartItems = useAppSelector((state) => {
      return state.cartReducer.cartItems
   })

   useEffect(() => {
      dispatch(calculateBill())
   }, [cartItems])

   const applyCouponHandler = async () => {
      try {
         if (!couponCode) return toast.error("Please provide coupon code")

         const res = await axios.get(
            `${import.meta.env.VITE_SERVER_LINK}/api/v1/payment/discount?coupon=${couponCode}&total=${total}`,
         )
         dispatch(applyDiscount(res.data.discount))
         toast.success("Coupon Applied")
         setIsCouponCodeValid("Coupon code valid")
      } catch (error: any) {
         toast.error(error.response.data.message || "Check your internet connection")
         dispatch(applyDiscount(0))
         setIsCouponCodeValid("Invalid coupon code")
      }
   }

   const removeDiscount = () => {
      dispatch(applyDiscount(0))
      setCouponCode("")
      setIsCouponCodeValid("")
   }

   return (
      <section className="mx-auto px-4 sm:w-3/4 sm:px-0">
         <h1 className="mt-10 flex justify-center text-5xl font-light uppercase tracking-widest">
            Cart
         </h1>

         {!cartItems.length ? (
            <p className="mt-20 flex items-center justify-center text-4xl font-thin">
               Nothing in the cart
            </p>
         ) : (
            <>
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
                        {cartItems.map((item) => (
                           <CartItem
                              name={item.name}
                              photo={item.photo}
                              price={item.price}
                              productId={item.productId}
                              quantity={item.quantity}
                              stock={item.stock}
                              key={item.productId}
                           />
                        ))}
                     </TableBody>
                  </Table>
               </div>

               <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  <CartBill />
               </div>

               <div className="mt-5 flex flex-col gap-4 md:flex-row">
                  <div className="relative flex flex-col">
                     {couponCode && (
                        <span
                           className="absolute right-2 top-8 cursor-pointer"
                           onClick={removeDiscount}
                        >
                           <X />
                        </span>
                     )}
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
                     {isCouponCodeValid &&
                        (isCouponCodeValid === "Coupon code valid" ? (
                           <span className="text-xs text-green-500">Coupon Code Valid!</span>
                        ) : (
                           <span className="text-xs text-red-500">Invalid Coupon Code</span>
                        ))}
                  </div>
                  <div className="space-x-4 md:mt-6">
                     <Button onClick={applyCouponHandler} variant="outline">
                        Apply Coupon
                     </Button>
                     <Button>
                        <Link to={"/shipping"} state={{ from: "/cart" }}>
                           Checkout
                        </Link>
                     </Button>
                  </div>
               </div>
            </>
         )}
      </section>
   )
}
export default Cart
