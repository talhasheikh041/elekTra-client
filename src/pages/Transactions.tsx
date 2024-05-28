import { DataTable } from "@/features/components/shared/data-table/Data-Table"
import { buttonVariants } from "@/features/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/components/ui/card"
import {
   TransactionsType,
   transactionColumns,
} from "@/features/transactions/transactions-list/Transaction-Columns"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Link } from "react-router-dom"

const arr: TransactionsType[] = [
   {
      user: "Charas",
      amount: 4500,
      discount: 400,
      quantity: 3,
      status: <span className="red">Processing</span>,
      action: (
         <Link
            className={cn(buttonVariants({ variant: "default" }), "h-5 rounded-full px-3")}
            to="/admin/transaction/sajknaskd"
         >
            Manage
         </Link>
      ),
   },
   {
      user: "Xavirors",
      amount: 6999,
      discount: 400,
      status: <span className="green">Shipped</span>,
      quantity: 6,
      action: (
         <Link
            className={cn(buttonVariants({ variant: "default" }), "h-5 rounded-full px-3")}
            to="/admin/transaction/sajknaskd"
         >
            Manage
         </Link>
      ),
   },
   {
      user: "Xavirors",
      amount: 6999,
      discount: 400,
      status: <span className="purple">Delivered</span>,
      quantity: 6,
      action: (
         <Link
            className={cn(buttonVariants({ variant: "default" }), "h-5 rounded-full px-3")}
            to="/admin/transaction/sajknaskd"
         >
            Manage
         </Link>
      ),
   },
]

const Transactions = () => {
   const [data] = useState(arr)

   return (
      <Card className="my-4">
         <CardHeader>
            <CardTitle>Transactions</CardTitle>
         </CardHeader>
         <CardContent>
            <DataTable columns={transactionColumns} data={data} isPagination={true} />
         </CardContent>
      </Card>
   )
}
export default Transactions
