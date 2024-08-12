import { Card } from "@/features/global-components/ui/card"
import { Package2Icon, ShieldCheckIcon, TimerIcon } from "lucide-react"

const PointCards = () => {
   return (
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
         <Card className="bg-secondary">
            <div className="flex h-44 flex-col items-center justify-center">
               <div>
                  <Package2Icon className="size-8" />
               </div>

               <div>
                  <p className="mt-2 text-center  text-lg font-light tracking-widest">
                     Express Delivery
                  </p>
                  <p className="mx-auto mt-2 max-w-[80%] text-center font-thin">
                     DHL express delivery worldwide from our company{" "}
                  </p>
               </div>
            </div>
         </Card>

         <Card className="bg-secondary">
            <div className="flex h-44 flex-col items-center justify-center">
               <div>
                  <TimerIcon className="size-8" />
               </div>

               <div>
                  <p className="mt-2 text-center  text-lg font-light tracking-widest">
                     24/7 Support
                  </p>
                  <p className="mx-auto mt-2 max-w-[80%] text-center font-thin">
                     Contact us any time for your problem
                  </p>
               </div>
            </div>
         </Card>

         <Card className="bg-secondary sm:col-span-2 sm:mx-auto sm:w-1/2 md:col-span-1 md:mx-0 md:w-full">
            <div className="flex h-44 flex-col items-center justify-center">
               <div>
                  <ShieldCheckIcon className="size-8" />
               </div>

               <div>
                  <p className="mt-2 text-center  text-lg font-light tracking-widest">
                     Secure Payment
                  </p>
                  <p className="mx-auto mt-2 max-w-[80%] text-center font-thin">
                     Hey! don't worry we ensure secure transactions
                  </p>
               </div>
            </div>
         </Card>
      </div>
   )
}
export default PointCards
