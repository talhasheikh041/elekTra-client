import RadialProgress from "@/features/components/shared/admin/Radial-Progress"
import { Card } from "@/features/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"

type DashboardCardProps = {
   heading: string
   amount: number
   percentage: number
   color: string
}

const DashboardCard = ({ amount, heading, percentage, color }: DashboardCardProps) => {
   return (
      <Card className="flex items-center justify-between px-4 py-3">
         <div className="flex flex-col">
            <p className="text-sm tracking-tight text-gray-500">{heading}</p>
            <p className="text-xl font-bold">{new Intl.NumberFormat("en-PK", {}).format(amount)}</p>
            {percentage > 0 ? (
               <div className="mt-1 flex items-center gap-2">
                  <TrendingUp color="green" size="18px" />
                  <p className="text-sm text-green-500">+{percentage}%</p>
               </div>
            ) : (
               <div className="mt-1 flex items-center gap-2">
                  <TrendingDown color="red" size="18px" />
                  <p className="text-sm text-red-500">{percentage}%</p>
               </div>
            )}
         </div>

         <div className="self-end">
            <RadialProgress progress={percentage} color={color} />
         </div>
      </Card>
   )
}
export default DashboardCard
