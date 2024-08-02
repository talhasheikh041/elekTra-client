import { selectUser } from "@/features/customers/reducer/user-reducer"
import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Badge } from "@/features/global-components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { useAllOrdersQuery } from "@/features/transactions/api/order-api"
import EditTransaction from "@/features/transactions/forms/Edit-Transaction"
import {
   TransactionsType,
   getTransactionColumns,
} from "@/features/transactions/table/Transaction-Columns"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType } from "@/types/api-types"
import { toast } from "sonner"

const Transactions = () => {
   const { user } = useAppSelector(selectUser)

   const { data, isLoading, isError, error, isSuccess } = useAllOrdersQuery(user?._id!)

   let errorMessage: string | null = null

   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   const allTransactions: TransactionsType[] | null = data
      ? data.orders?.map((order) => ({
           amount: order.total,
           user: order.user.name,
           discount: order.discount,
           quantity: order.orderItems.length,
           status: <Badge variant="secondary">{order.status}</Badge>,
           action: <EditTransaction key={order._id} order={order} />,
        }))
      : null

   return (
      <Card className="min-h-screen">
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">Transactions</CardTitle>
         </CardHeader>
         <CardContent>
            {isLoading ? (
               <SkeletonWrapper className="space-y-3" quantity={8}>
                  <Skeleton className="h-16 w-full" />
               </SkeletonWrapper>
            ) : isSuccess && allTransactions ? (
               <DataTable
                  columns={getTransactionColumns(true)}
                  data={allTransactions}
                  isPagination={true}
               />
            ) : (
               <p className="mt-8 grid place-items-center">{errorMessage}</p>
            )}
         </CardContent>
      </Card>
   )
}
export default Transactions
