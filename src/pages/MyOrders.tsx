import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
import { Badge } from "@/features/global-components/ui/badge"
import {
   customerOrderColumns,
   CustomerOrderType,
} from "@/features/customers/table/customer-order-columns"
import { Link } from "react-router-dom"

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
   return (
      <div className="container py-8">
         <h1 className="flex justify-center text-4xl font-light uppercase tracking-widest">
            My Orders
         </h1>

         <main className="mt-8">
            <DataTable columns={customerOrderColumns} data={data} isPagination={true} />
         </main>
      </div>
   )
}
export default MyOrders
