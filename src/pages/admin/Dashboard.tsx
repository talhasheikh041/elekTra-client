import { BarChart, DoughnutChart } from "@/features/dashboard/components/Charts"
import ProgressCard from "@/features/dashboard/components/Progress-Card"
import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import ProductCategory from "@/features/products/components/Product-Category"
import { getTransactionColumns } from "@/features/transactions/table/Transaction-Columns"
import { BiMaleFemale } from "react-icons/bi"

import { selectUser } from "@/features/customers/reducer/user-reducer"
import { useStatsQuery } from "@/features/dashboard/api/dashboard-api"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType } from "@/types/api-types"
import { toast } from "sonner"
import { getLastMonths } from "@/lib/utils"

const { lastSixMonths } = getLastMonths()

const Dashboard = () => {
   const { user } = useAppSelector(selectUser)

   const { data, isLoading, isError, isSuccess, error } = useStatsQuery(user?._id!)

   let errorMessage: string | null = null
   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   return (
      <>
         {isLoading ? (
            <SkeletonWrapper className="grid grid-cols-1 gap-4 lg:grid-cols-4" quantity={8}>
               <Skeleton className="lg:[300px] h-[200px] bg-muted-foreground/10 lg:[&:nth-child(1)]:h-[106px] lg:[&:nth-child(1)]:w-[240px] lg:[&:nth-child(2)]:h-[106px] lg:[&:nth-child(2)]:w-[240px] lg:[&:nth-child(3)]:h-[106px] lg:[&:nth-child(3)]:w-[240px] lg:[&:nth-child(4)]:h-[106px] lg:[&:nth-child(4)]:w-[240px] lg:[&:nth-child(5)]:col-span-3 lg:[&:nth-child(8)]:col-span-3 " />
            </SkeletonWrapper>
         ) : isSuccess ? (
            <div>
               <section>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                     <ProgressCard
                        amount={data.stats.count.totalRevenue}
                        color="text-purple-500"
                        heading="Revenue"
                        percentage={data.stats.percentage.revenue}
                     />
                     <ProgressCard
                        amount={data.stats.count.users}
                        color="text-blue-500"
                        heading="Users"
                        percentage={data.stats.percentage.users}
                     />
                     <ProgressCard
                        amount={data.stats.count.orders}
                        color="text-orange-500"
                        heading="Transactions"
                        percentage={data.stats.percentage.orders}
                     />
                     <ProgressCard
                        amount={data.stats.count.product}
                        color="text-cyan-500"
                        heading="Products"
                        percentage={data.stats.percentage.products}
                     />
                  </div>
               </section>

               <section className="mt-8 flex flex-col gap-4 lg:flex-row ">
                  <Card className="flex-grow lg:w-2/3">
                     <CardHeader>
                        <CardTitle className="mx-auto text-xl font-light uppercase tracking-widest text-gray-500">
                           Revenue & Transactions
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="h-80">
                        <BarChart
                           title_1="Revenues"
                           title_2="Transactions"
                           data_1={data.stats.barChart.revenue}
                           data_2={data.stats.barChart.order}
                           bgColor_1="rgb(0,115,255)"
                           bgColor_2="rgb(53,162,235,0.5)"
                           labels={lastSixMonths}
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
                        {Object.entries(data.stats.categories).map(([category, value]) => (
                           <ProductCategory key={category} category={category} value={value} />
                        ))}
                     </CardContent>
                  </Card>
               </section>

               <section className="mt-8 flex flex-col gap-4 lg:flex-row">
                  <Card className="relative lg:w-80">
                     <CardHeader>
                        <CardTitle className="mx-auto text-xl font-light uppercase tracking-widest text-gray-500">
                           Gender Ratio
                        </CardTitle>
                     </CardHeader>

                     <CardContent className="mx-auto w-80">
                        <DoughnutChart
                           data={Object.values(data.stats.userRatio)}
                           labels={["Male", "Female"]}
                           bgColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                           cutout={90}
                        />
                        <BiMaleFemale
                           size={"30px"}
                           className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500"
                        />
                     </CardContent>
                  </Card>

                  <Card className="lg:w-full">
                     <CardHeader>
                        <CardTitle className="text-xl font-light uppercase tracking-widest text-gray-500">
                           Top Transactions
                        </CardTitle>
                     </CardHeader>

                     <CardContent>
                        <DataTable
                           columns={getTransactionColumns(false)}
                           data={data.stats.latestTransactions.map((order) => ({
                              discount: order.discount,
                              status: order.status,
                              quantity: order.quantity,
                              user: order.user.name.split(" ")[0],
                              amount: order.amount,
                           }))}
                        />
                     </CardContent>
                  </Card>
               </section>
            </div>
         ) : (
            <p>{errorMessage}</p>
         )}
      </>
   )
}
export default Dashboard
