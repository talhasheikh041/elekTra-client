import { ColumnDef } from "@tanstack/react-table"
import { ReactNode } from "react"

export type CustomersType = {
   avatar: ReactNode
   name: string
   email: string
   gender: string
   role: string
   action: ReactNode
}

export const customersColumns: ColumnDef<CustomersType>[] = [
   {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ cell }) => <span>{cell.renderValue<ReactNode>()}</span>,
   },
   {
      accessorKey: "name",
      header: "Name",
   },
   {
      accessorKey: "email",
      header: "Email",
   },
   {
      accessorKey: "gender",
      header: "Gender",
   },
   {
      accessorKey: "role",
      header: "Role",
   },
   {
      accessorKey: "action",
      header: "Action",
      cell: ({ cell }) => <span>{cell.renderValue<ReactNode>()}</span>,
   },
]