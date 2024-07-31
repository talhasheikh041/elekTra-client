import { DataTableColumnHeader } from "@/features/global-components/shared/data-table/Column-Header"
import { ColumnDef } from "@tanstack/react-table"
import { ReactNode } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumnsTypes = {
   name: string
   price: number
   stock: number
   photo: ReactNode
   action: ReactNode
}

export const productColumns: ColumnDef<ProductColumnsTypes>[] = [
   {
      accessorKey: "photo",
      header: "Photo",
      cell: ({ cell }) => (
         <div className="flex items-center *:h-12 *:w-12 *:rounded-lg *:object-contain">
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
