import { Button } from "@/features/global-components/ui/button"
import ShippingForm from "@/features/customers/forms/Shipping-Form"

import { ArrowBigLeft } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "@/redux/store"
import { useEffect } from "react"
import { toast } from "sonner"

const Shipping = () => {
   const { state } = useLocation()
   const navigate = useNavigate()

   const { cartItems, total } = useAppSelector((state) => state.cardReducer)

   useEffect(() => {
      if (cartItems.length <= 0) {
         toast.error("First add something in the cart")
         navigate("/cart")
      }
   }, [cartItems])

   return (
      <section className="relative">
         <div>
            <Link to={state?.from || ".."}>
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
            <ShippingForm amount={total} />
         </div>
      </section>
   )
}
export default Shipping
