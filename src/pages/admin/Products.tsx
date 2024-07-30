import { selectUser } from "@/features/customers/reducer/user-reducer"
import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { useAllProdcuctsQuery } from "@/features/products/api/product-api"
import AddProductCard from "@/features/products/forms/Add-Product-Card"
import EditProductCard from "@/features/products/forms/Edit-Product-Card"
import { ProductColumnsTypes, productColumns } from "@/features/products/table/Product-Columns"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType } from "@/types/api-types"
import { skipToken } from "@reduxjs/toolkit/query"
import { useId } from "react"
import { toast } from "sonner"

const SERVER_LINK = import.meta.env.VITE_SERVER_LINK as string

const Products = () => {
   const addNewProductId = useId()

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
           photo: <img src={`${SERVER_LINK}/uploads/${product.photo}`} alt="Shoes" />,
           name: product.name,
           price: product.price,
           stock: product.stock,
           action: (
              <EditProductCard
                 product={{
                    photo: `${SERVER_LINK}/uploads/${product.photo}`,
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                 }}
              />
           ),
        }))
      : null

   return (
      <Card>
         <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-light uppercase tracking-widest">Products</CardTitle>
            <AddProductCard key={addNewProductId} />
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
