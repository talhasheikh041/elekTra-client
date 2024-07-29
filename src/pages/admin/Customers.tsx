import MyTooltip from "@/features/global-components/shared/My-Tooltip"
import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/global-components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { CustomersType, customersColumns } from "@/features/customers/table/customer-columns"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { Button } from "@/features/global-components/ui/button"

const img = "https://randomuser.me/api/portraits/women/54.jpg"
const img2 = "https://randomuser.me/api/portraits/women/50.jpg"

const arr: CustomersType[] = [
   {
      avatar: (
         <Avatar>
            <AvatarImage src={img} />
            <AvatarFallback>CN</AvatarFallback>
         </Avatar>
      ),
      name: "Emily Palmer",
      email: "emily.palmer@example.com",
      gender: "female",
      role: "user",
      action: (
         <MyTooltip title="Delete">
            <Button size={"icon"} variant={"destructive"} className="rounded-full w-8 h-8">
               <FaTrash />
            </Button>
         </MyTooltip>
      ),
   },

   {
      avatar: (
         <Avatar>
            <AvatarImage src={img2} />
            <AvatarFallback>CN</AvatarFallback>
         </Avatar>
      ),
      name: "May Scoot",
      email: "aunt.may@example.com",
      gender: "female",
      role: "user",
      action: (
         <MyTooltip title="Delete">
            <Button variant={"destructive"} size={"icon"} className="rounded-full w-8 h-8">
               <FaTrash />
            </Button>
         </MyTooltip>
      ),
   },
]

const Customers = () => {
   const [data] = useState(arr)

   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">Customers</CardTitle>
         </CardHeader>
         <CardContent>
            <DataTable columns={customersColumns} data={data} isPagination={true} />
         </CardContent>
      </Card>
   )
}
export default Customers
