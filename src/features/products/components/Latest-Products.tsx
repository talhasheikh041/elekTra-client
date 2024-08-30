import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import {
   Carousel,
   CarouselContent,
   CarouselDotButtons,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/features/global-components/ui/carousel"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { useLatestProdcutsQuery } from "@/features/products/api/product-api"
import ProductCard from "@/features/products/components/Product-Card"
import { CustomErrorType } from "@/types/api-types"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const LatestProducts = () => {
   const { data, isError, isSuccess, isLoading, error } = useLatestProdcutsQuery(null)

   let errorMessage: string | null = null

   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   return (
      <>
         <div className="mb-8 flex items-center justify-between font-light uppercase tracking-widest">
            <h1 className="text-lg sm:text-2xl">Latest Products</h1>
            <Link className="text-xs hover:font-normal md:text-sm" to={"search"}>
               More
            </Link>
         </div>

         {isLoading ? (
            <SkeletonWrapper className="mt-8 flex w-full gap-3" quantity={4}>
               <Skeleton className="h-64 w-80" />
            </SkeletonWrapper>
         ) : isSuccess && data ? (
            <Carousel>
               <CarouselContent className="-ml-[calc(2rem*1)] flex touch-pan-y touch-pinch-zoom md:gap-3 xl:gap-1">
                  {data.products.map((product) => (
                     <CarouselItem
                        className="flex w-full min-w-0 flex-shrink-0 grow basis-auto justify-center pl-6 sm:w-1/2 md:pl-8 lg:w-1/4"
                        key={product._id}
                     >
                        <ProductCard product={product} />
                     </CarouselItem>
                  ))}
               </CarouselContent>
               <div className="mt-7 grid grid-cols-[auto_1fr] justify-between gap-5">
                  <div className="grid grid-cols-2 items-center gap-2">
                     <CarouselPrevious className="static translate-y-0" />
                     <CarouselNext className="static translate-y-0" />
                  </div>

                  <div className="embla__dots">
                     <CarouselDotButtons />
                  </div>
               </div>
            </Carousel>
         ) : (
            <p className="grid place-items-center">{errorMessage}</p>
         )}
      </>
   )
}
export default LatestProducts
