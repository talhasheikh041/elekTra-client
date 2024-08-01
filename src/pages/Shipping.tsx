import { Button } from "@/features/global-components/ui/button"
import ShippingForm from "@/features/customers/forms/Shipping-Form"

import { ArrowBigLeft } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const Shipping = () => {
   const { state } = useLocation()

   return (
      <section className="relative">
         <div>
            <Link to={state.from}>
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
            <ShippingForm />
         </div>
      </section>
   )
}
export default Shipping
