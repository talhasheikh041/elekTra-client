import MyTooltip from "@/features/components/shared/My-Tooltip"
import { buttonVariants } from "@/features/components/ui/button"
import { cn } from "@/lib/utils"
import { BiCartAdd } from "react-icons/bi"

const ProductCard = () => {
   return (
      <>
         <div className="relative flex min-h-72 w-80 cursor-pointer flex-col items-center justify-center p-3">
            <img
               src="https://m.media-amazon.com/images/I/71ItMeqpN3L._AC_SX522_.jpg"
               className="w-full rounded-lg object-cover"
               alt="product"
            />
            <p className="mt-4 text-sm">Apple Macbook Air 2024</p>
            <p className="mt-1 font-medium">$12000</p>

            <div className="absolute grid h-full w-full place-items-center rounded-lg bg-secondary/35 opacity-0 hover:opacity-100">
               <MyTooltip title="Add to Cart">
                  <span
                     className={cn(
                        buttonVariants({ variant: "default" }),
                        "m-0 size-12 rounded-full p-0",
                     )}
                  >
                     <BiCartAdd size="25px" />
                  </span>
               </MyTooltip>
            </div>
         </div>
      </>
   )
}
export default ProductCard
