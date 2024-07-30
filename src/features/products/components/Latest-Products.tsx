import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
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
         <div className="flex items-center justify-between font-light uppercase tracking-widest">
            <h1 className="text-2xl">Latest Products</h1>
            <Link className="hover:font-normal" to={"search"}>
               More
            </Link>
         </div>

         {isLoading ? (
            <SkeletonWrapper className="mt-8 flex w-full justify-between" quantity={4}>
               <Skeleton className="h-64 w-64" />
            </SkeletonWrapper>
         ) : isSuccess && data ? (
            <div className="mt-8 flex snap-x snap-mandatory overflow-x-scroll">
               {data.products.map((product) => (
                  <ProductCard
                     name={product.name}
                     price={product.price}
                     key={product._id}
                     photo={product.photo}
                  />
               ))}
            </div>
         ) : (
            <p className="grid place-items-center">{errorMessage}</p>
         )}
      </>
   )
}
export default LatestProducts
