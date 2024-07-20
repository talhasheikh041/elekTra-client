import { ColumnDef } from "@tanstack/react-table"
import { ReactElement } from "react"

export type CustomerOrderType = {
   _id: string
   amount: number
   quantity: number
   discount: number
   status: ReactElement
   action: ReactElement
}

export const customerOrderColumns: ColumnDef<CustomerOrderType>[] = [
   {
      accessorKey: "_id",
      header: "ID",
   },
   {
      accessorKey: "quantity",
      header: "Quantity",
   },
   {
      accessorKey: "discount",
      header: "Discount",
   },
   {
      accessorKey: "amount",
      header: "Amount",
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ cell }) => <span>{cell.renderValue<ReactElement>()}</span>,
   },
   {
      accessorKey: "action",
      header: "Action",
      cell: ({ cell }) => <span>{cell.renderValue<ReactElement>()}</span>,
   },
]
