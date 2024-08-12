import { Button } from "@/features/global-components/ui/button"
import { Card, CardContent } from "@/features/global-components/ui/card"

const FeaturedProduct = () => {
   return (
      <Card className="rounded-3xl bg-secondary">
         <CardContent>
            <div className="flex w-full flex-col items-center justify-center gap-20 px-1 py-8 md:flex-row md:px-12 xl:py-0">
               <div>
                  <img
                     src="http://localhost:3000/uploads/fd1e521b-72ba-4e8b-b44c-ff9544c2d158.webp"
                     alt="Featured Product"
                     className="mix-blend-multiply lg:p-10"
                  />
               </div>

               <div>
                  <h1 className="scroll-m-20 text-4xl font-light tracking-widest lg:text-5xl">
                     Apple Smart Watch
                  </h1>
                  <div className="mt-1 space-x-2">
                     <span>⭐⭐⭐⭐⭐</span>
                     <span className="text-sm font-medium leading-none">(250 Reviews)</span>
                  </div>
                  <p className="font-light leading-7 [&:not(:first-child)]:mt-6">
                     Every man needs a good solid watch. I own many watches, but this one is usually
                     the one on my wrist. It's help you track all day.
                  </p>
                  <p className="mt-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                     Price: $150
                  </p>
                  <Button className="mt-5 w-full md:w-auto">Order Now</Button>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
export default FeaturedProduct
