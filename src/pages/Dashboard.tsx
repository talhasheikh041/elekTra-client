import { BarChart, DoughnutChart } from "@/features/components/shared/Charts"
import DashboardCard from "@/features/components/shared/Dashboard-Card"
import DashboardHeader from "@/features/components/shared/Dashboard-Header"
import ProductCategory from "@/features/components/shared/Product-Category"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/components/ui/card"
import { BiMaleFemale } from "react-icons/bi"

const Dashboard = () => {
   return (
      <div className="py-2">
         <section>
            <DashboardHeader />
         </section>

         <section className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
               <DashboardCard
                  amount={3400000}
                  color="text-purple-500"
                  heading="Revenue (Rs)"
                  percentage={60}
               />
               <DashboardCard
                  amount={65383}
                  color="text-blue-500"
                  heading="Users"
                  percentage={40}
               />
               <DashboardCard
                  amount={560000}
                  color="text-orange-500"
                  heading="Transactions"
                  percentage={80}
               />
               <DashboardCard
                  amount={2300}
                  color="text-cyan-500"
                  heading="Products"
                  percentage={20}
               />
            </div>

            <section className="mt-8 flex flex-col gap-4 lg:flex-row ">
               <Card className="flex-grow lg:w-2/3">
                  <CardHeader>
                     <CardTitle className="mx-auto text-xl font-light uppercase tracking-widest text-gray-500">
                        Revenue & Transactions
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <BarChart
                        title_1="Revenues"
                        title_2="Transactions"
                        data_1={[234, 773, 553, 776, 334, 889, 764]}
                        data_2={[773, 334, 543, 657, 998, 432, 386]}
                        bgColor_1="rgb(0,115,255)"
                        bgColor_2="rgb(53,162,235,0.5)"
                     />
                  </CardContent>
               </Card>

               <Card className="lg:w-1/3">
                  <CardHeader>
                     <CardTitle className="mx-auto text-xl font-light uppercase tracking-widest text-gray-500">
                        Inventory
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-[300px] space-y-6 overflow-y-auto">
                     <ProductCategory category="Laptops" value={33} />
                     <ProductCategory category="Phones" value={90} />
                     <ProductCategory category="Shoes" value={25} />
                     <ProductCategory category="Cameras" value={46} />
                     <ProductCategory category="Jeans" value={87} />
                  </CardContent>
               </Card>
            </section>

            <section className="mt-8 flex flex-col gap-4 lg:flex-row">
               <Card className="relative lg:w-80">
                  <CardHeader>
                     <CardTitle className="mx-auto text-xl font-light uppercase tracking-widest text-gray-500">
                        Gender Ratio
                     </CardTitle>

                     <CardContent className="p-6">
                        <DoughnutChart
                           data={[12, 19]}
                           labels={["Male", "Female"]}
                           bgColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                           cutout={70}
                        />
                        <BiMaleFemale size={"30px"} className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500" />
                     </CardContent>
                  </CardHeader>
               </Card>
            </section>
         </section>
      </div>
   )
}
export default Dashboard
