import { DataTableColumnHeader } from "@/features/global-components/shared/data-table/Column-Header"
import { ColumnDef } from "@tanstack/react-table"
import { ReactNode } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsType = {
   photo: ReactNode
   name: string
   price: number
   stock: number
   action: ReactNode
}

export const productColumns: ColumnDef<ProductsType>[] = [
   {
      accessorKey: "photo",
      header: "Photo",
      cell: ({ cell }) => (
         <div className="flex items-center *:w-12 *:rounded-lg">
            {cell.renderValue<ReactNode>()}
         </div>
      ),
   },
   {
      accessorKey: "name",
      header: "Name",
   },
   {
      accessorKey: "price",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
   },
   {
      accessorKey: "stock",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
   },
   {
      accessorKey: "action",
      header: "Action",
      cell: ({ cell }) => <span>{cell.renderValue<ReactNode>()}</span>,
   },
]
