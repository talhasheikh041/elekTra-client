import OrderDetails from "@/features/customers/components/Order-Details"
import { selectUser } from "@/features/customers/reducer/user-reducer"
import {
   customerOrderColumns,
   CustomerOrderType,
} from "@/features/customers/table/customer-order-columns"
import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Badge } from "@/features/global-components/ui/badge"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { useMyOrdersQuery } from "@/features/transactions/api/order-api"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType } from "@/types/api-types"
import { toast } from "sonner"

const MyOrders = () => {
   const { user } = useAppSelector(selectUser)

   const { data, isLoading, isError, error, isSuccess } = useMyOrdersQuery(user?._id!)

   let errorMessage: string | null = null

   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   const myOrders: CustomerOrderType[] | null = data
      ? data.orders?.map((order) => ({
           amount: order.total,
           _id: order._id,
           discount: order.discount,
           quantity: order.orderItems.length,
           status: <Badge variant="secondary">{order.status}</Badge>,
           action: <OrderDetails key={order._id} order={order} />,
        }))
      : null

   return (
      <div className="container py-8">
         <h1 className="flex justify-center text-4xl font-light uppercase tracking-widest">
            My Orders
         </h1>

         <main className="mt-8">
            {isLoading ? (
               <SkeletonWrapper className="space-y-3" quantity={8}>
                  <Skeleton className="h-16 w-full" />
               </SkeletonWrapper>
            ) : isSuccess && myOrders ? (
               <DataTable columns={customerOrderColumns} data={myOrders} isPagination={true} />
            ) : (
               <p className="mt-8 grid place-items-center">{errorMessage}</p>
            )}
         </main>
      </div>
   )
}
export default MyOrders
