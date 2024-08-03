import { Button } from "@/features/global-components/ui/button"
import { useEffect, useState } from "react"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { NewOrderRequestType } from "@/types/api-types"
import { selectUser } from "@/features/customers/reducer/user-reducer"
import { toast } from "sonner"
import { useNewOrderMutation } from "@/features/transactions/api/order-api"
import { responseToast } from "@/lib/utils"
import { resetCart } from "@/features/products/reducer/cart-reducer"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const CheckoutForm = () => {
   const stripe = useStripe()
   const elements = useElements()
   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const { cartItems, discount, shippingCharges, shippingInfo, subtotal, tax, total } =
      useAppSelector((state) => state.cartReducer)
   const { user } = useAppSelector(selectUser)

   const [newOrder] = useNewOrderMutation()

   const [isProcessing, setIsProcessing] = useState<boolean>(false)

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!stripe || !elements) return

      setIsProcessing(true)

      const order: NewOrderRequestType = {
         discount,
         orderItems: cartItems,
         shippingCharges,
         shippingInfo,
         subtotal,
         tax,
         total,
         user: user?._id!,
      }

      const res = await stripe.confirmPayment({
         elements,
         confirmParams: { return_url: window.location.origin },
         redirect: "if_required",
      })

      if (res.error) {
         setIsProcessing(false)
         return toast.error(res.error.message || "Something went wrong")
      }

      if (res.paymentIntent.status === "succeeded") {
         const res = await newOrder(order)
         responseToast(res)
         dispatch(resetCart())
         navigate("/myorders")
      }
      setIsProcessing(false)
   }

   return (
      <div>
         <h1 className="mt-10 flex justify-center text-5xl font-light uppercase tracking-widest">
            Payment
         </h1>

         <div className="md:w-1/2 sm:w-3/4 px-3 mx-auto mt-16">
            <form onSubmit={handleSubmit}>
               <PaymentElement />
               <Button className="mx-auto flex w-20 text-md mt-6"  disabled={isProcessing} type="submit">
                  {isProcessing ? "Processing..." : "Pay"}
               </Button>
            </form>
         </div>
      </div>
   )
}

const Checkout = () => {
   const location = useLocation()

   const clientSecret: string | undefined = location.state

   if (!clientSecret) return <Navigate to={"/shipping"} />

   return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
         <CheckoutForm />
      </Elements>
   )
}
export default Checkout
