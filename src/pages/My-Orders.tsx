import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
import { Badge } from "@/features/global-components/ui/badge"
import {
   customerOrderColumns,
   CustomerOrderType,
} from "@/features/customers/table/customer-order-columns"
import { Link } from "react-router-dom"
import { useAppSelector } from "@/redux/store"
import { selectUser } from "@/features/customers/reducer/user-reducer"
import { useMyOrdersQuery } from "@/features/transactions/api/order-api"
import { CustomErrorType } from "@/types/api-types"
import { toast } from "sonner"
import OrderDetails from "@/features/customers/components/Order-Details"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Skeleton } from "@/features/global-components/ui/skeleton"

const data: CustomerOrderType[] = [
   {
      _id: "hahahhaa",
      quantity: 10,
      amount: 2000,
      discount: 100,
      status: (
         <Badge className=" cursor-default bg-purple-500 hover:bg-purple-500">Processing</Badge>
      ),
      action: (
         <Badge className="bg-primary">
            <Link to={`/admin/transaction/23`}>Manage</Link>
         </Badge>
      ),
   },
   {
      _id: "2",
      quantity: 10,
      amount: 2000,
      discount: 100,
      status: (
         <Badge className=" cursor-default bg-purple-500 hover:bg-purple-500">Processing</Badge>
      ),
      action: (
         <Badge className="bg-primary">
            <Link to={`/admin/transaction/23`}>Manage</Link>
         </Badge>
      ),
   },
   {
      _id: "3",
      quantity: 10,
      amount: 2000,
      discount: 100,
      status: (
         <Badge className=" cursor-default bg-purple-500 hover:bg-purple-500">Processing</Badge>
      ),
      action: (
         <Badge className="bg-primary">
            <Link to={`/admin/transaction/23`}>Manage</Link>
         </Badge>
      ),
   },
   {
      _id: "4",
      quantity: 10,
      amount: 2000,
      discount: 100,
      status: (
         <Badge className=" cursor-default bg-purple-500 hover:bg-purple-500">Processing</Badge>
      ),
      action: (
         <Badge className="bg-primary">
            <Link to={`/admin/transaction/23`}>Manage</Link>
         </Badge>
      ),
   },
   {
      _id: "5",
      quantity: 10,
      amount: 2000,
      discount: 100,
      status: (
         <Badge className=" cursor-default bg-purple-500 hover:bg-purple-500">Processing</Badge>
      ),
      action: (
         <Badge className="bg-primary">
            <Link to={`/admin/transaction/23`}>Manage</Link>
         </Badge>
      ),
   },
]

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
