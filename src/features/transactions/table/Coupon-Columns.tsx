import type { ColumnDef } from "@tanstack/react-table"
import { ReactNode } from "react"

export type CouponColumnsType = {
   coupon: string
   discount: number
   action: ReactNode
}

export const couponColumns: ColumnDef<CouponColumnsType>[] = [
   {
      accessorKey: "coupon",
      header: "Coupon",
   },
   {
      accessorKey: "discount",
      header: "Discount",
   },
   {
      accessorKey: "action",
      header: "Action",
      cell: ({ cell }) => cell.renderValue<ReactNode>(),
   },
]
