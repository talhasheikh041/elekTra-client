import { DataTableColumnHeader } from "@/features/global-components/shared/data-table/Column-Header"
import { ColumnDef } from "@tanstack/react-table"
import { ReactNode } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionsType = {
   user: string
   amount: number
   discount: number
   quantity: number
   status: ReactNode
   action?: ReactNode // Make action optional
}

export const getTransactionColumns = (includeAction: boolean): ColumnDef<TransactionsType>[] => {
   const columns: ColumnDef<TransactionsType>[] = [
      {
         accessorKey: "user",
         header: "User",
      },
      {
         accessorKey: "amount",
         header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      },
      {
         accessorKey: "discount",
         header: "Discount",
      },
      {
         accessorKey: "quantity",
         header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
      },
      {
         accessorKey: "status",
         header: "Status",
         cell: ({ cell }) => <span>{cell.renderValue<ReactNode>()}</span>,
      },
   ]

   if (includeAction) {
      columns.push({
         accessorKey: "action",
         header: "Action",
         cell: ({ cell }) => <span>{cell.renderValue<ReactNode>()}</span>,
      })
   }

   return columns
}
