import { DataTableColumnHeader } from "@/features/components/shared/data-table/Column-Header"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transactions = {
   "id": string,
   "amount": number,
   "quantity": number,
   "discount": number,
   "status": string
}

export const transactionColumns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "status",
    header: "Status",
  }
]
