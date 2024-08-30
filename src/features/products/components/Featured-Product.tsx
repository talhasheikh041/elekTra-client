import { Button } from "@/features/global-components/ui/button"
import { Card, CardContent } from "@/features/global-components/ui/card"
import RatingStars from "@/features/products/components/Rating-Stars"
import appleSmartWatch from "@/assets/apple-smartwatch.webp"
import { Link } from "react-router-dom"

const FeaturedProduct = () => {
   return (
      <Card className="rounded-3xl bg-secondary py-10 lg:px-28 xl:py-16">
         <CardContent>
            <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row md:gap-20 ">
               <div className="max-w-lg md:w-60 md:flex-shrink-0 lg:w-96">
                  <img src={appleSmartWatch} alt="Featured Product" className="object-cover" />
               </div>

               <div>
                  <h1 className="scroll-m-20 text-2xl font-light tracking-widest md:text-4xl lg:text-5xl">
                     Apple Smart Watch
                  </h1>
                  <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center">
                     <RatingStars rating={4.5} readOnly={true} />
                     <span className="text-xs font-medium leading-none md:text-sm">
                        (250 Reviews)
                     </span>
                  </div>
                  <p className="text-sm font-light leading-7 lg:text-base [&:not(:first-child)]:mt-2 md:[&:not(:first-child)]:mt-6">
                     Every man needs a good solid watch. I own many watches, but this one is usually
                     the one on my wrist. It's help you track all day.
                  </p>
                  <p className="mt-5 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 lg:text-3xl">
                     Price: $150
                  </p>
                  <Button className="mt-5 w-full md:w-auto">
                     <Link to={"/product/66cfcb8ebefd01bf33bd37a8"}>Order Now</Link>
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
export default FeaturedProduct
