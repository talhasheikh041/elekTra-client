import { selectUser } from "@/features/customers/reducer/user-reducer"
import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
import MyTooltip from "@/features/global-components/shared/My-Tooltip"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Button } from "@/features/global-components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { useAllProdcuctsQuery } from "@/features/products/api/product-api"
import EditProductCard from "@/features/products/forms/Edit-Product-Card"
import { ProductColumnsTypes, productColumns } from "@/features/products/table/Product-Columns"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType } from "@/types/api-types"
import { skipToken } from "@reduxjs/toolkit/query"
import { CirclePlusIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const Products = () => {
   const { user } = useAppSelector(selectUser)

   const { data, isError, isSuccess, isLoading, error } = useAllProdcuctsQuery(
      user?._id ?? skipToken,
   )

   let errorMessage: string | null = null

   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   const allProducts: ProductColumnsTypes[] | null = data
      ? data.products.map((product) => ({
           photo: <img src={`${product.photos[0].url}`} alt="Shoes" />,
           name: product.name,
           price: product.price,
           stock: product.stock,
           action: <EditProductCard product={product} />,
        }))
      : null

   return (
      <Card>
         <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-light uppercase tracking-widest">Products</CardTitle>
            <Link to={"new"}>
               <Button size="icon" className="rounded-full">
                  <MyTooltip title="Add new Product">
                     <CirclePlusIcon size={"30px"} />
                  </MyTooltip>
               </Button>
            </Link>
         </CardHeader>
         <CardContent>
            {isLoading ? (
               <SkeletonWrapper className="space-y-3" quantity={8}>
                  <Skeleton className="h-16 w-full" />
               </SkeletonWrapper>
            ) : isSuccess && allProducts ? (
               <DataTable columns={productColumns} data={allProducts} isPagination={true} />
            ) : (
               <p>{errorMessage}</p>
            )}
         </CardContent>
      </Card>
   )
}
export default Products
