import Mytooltip from "@/features/components/shared/My-tooltip"
import RadialProgress from "@/features/components/shared/Radial-Progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/components/ui/avatar"
import { Card } from "@/features/components/ui/card"
import { Input } from "@/features/components/ui/input"

import { Bell, Search, TrendingUp } from "lucide-react"

const Dashboard = () => {
   return (
      <div className="py-2">
         <section className="relative flex items-center gap-3 border-b border-b-slate-300 pb-2">
            <Input
               className="border-0 bg-transparent px-8 text-base placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
               placeholder="Search for docs, data, users"
            />
            <Search className="absolute top-2 text-gray-400" />

            <Mytooltip title="Notifications">
               <Bell size="28px" className="cursor-pointer text-gray-400 hover:text-black" />
            </Mytooltip>

            <Mytooltip title="Profile">
               <Avatar className="size-8 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>MT</AvatarFallback>
               </Avatar>
            </Mytooltip>
         </section>

         <section className="mt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               <Card className="flex items-center justify-between px-4 py-3">
                  <div className="flex flex-col">
                     <p className="text-sm tracking-tight text-gray-500">Revenue (Rs)</p>
                     <p className="text-xl font-bold">
                        {new Intl.NumberFormat("en-PK", {}).format(3400000)}
                     </p>
                     <div className="mt-1 flex items-center gap-2">
                        <TrendingUp color="green" size="18px" />
                        <p className="text-sm text-green-500">40%</p>
                     </div>
                  </div>

                  <div className="self-end">
                     <RadialProgress progress={60} color="text-purple-500" />
                  </div>
               </Card>

               <Card className="flex items-center justify-between px-4 py-3">
                  <div className="flex flex-col">
                     <p className="text-sm tracking-tight text-gray-500">Users</p>
                     <p className="text-xl font-bold">$34000</p>
                     <div className="mt-1 flex items-center gap-2">
                        <TrendingUp color="green" size="18px" />
                        <p className="text-sm text-green-500">40%</p>
                     </div>
                  </div>

                  <div className="self-end">
                     <RadialProgress progress={40} color="text-blue-500" />
                  </div>
               </Card>

               <Card className="flex items-center justify-between px-4 py-3">
                  <div className="flex flex-col">
                     <p className="text-sm tracking-tight text-gray-500">Transactions</p>
                     <p className="text-xl font-bold">$34000</p>
                     <div className="mt-1 flex items-center gap-2">
                        <TrendingUp color="green" size="18px" />
                        <p className="text-sm text-green-500">80%</p>
                     </div>
                  </div>

                  <div className="self-end">
                     <RadialProgress progress={80} color="text-orange-500" />
                  </div>
               </Card>

               <Card className="flex items-center justify-between px-4 py-3">
                  <div className="flex flex-col">
                     <p className="text-sm tracking-tight text-gray-500">Products</p>
                     <p className="text-xl font-bold">$34000</p>
                     <div className="mt-1 flex items-center gap-2">
                        <TrendingUp color="green" size="18px" />
                        <p className="text-sm text-green-500">20%</p>
                     </div>
                  </div>

                  <div className="text-red self-end">
                     <RadialProgress progress={20} color="text-cyan-500" />
                  </div>
               </Card>
            </div>
         </section>
      </div>
   )
}
export default Dashboard
