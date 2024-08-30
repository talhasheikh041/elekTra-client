import { selectUser } from "@/features/customers/reducer/user-reducer"
import { usePieChartQuery } from "@/features/dashboard/api/dashboard-api"
import { DoughnutChart, PieChart } from "@/features/dashboard/components/Charts"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType } from "@/types/api-types"
import { toast } from "sonner"

function Pie() {
   const { user } = useAppSelector(selectUser)

   const { data, isLoading, isError, isSuccess, error } = usePieChartQuery(user?._id!)

   let errorMessage: string | null = null
   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">
               Pie and Doughnut Charts
            </CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col gap-8 py-6">
            {isLoading ? (
               <SkeletonWrapper className="flex flex-col items-center gap-10" quantity={6}>
                  <Skeleton className="h-[150px] w-[150px] rounded-full sm:h-[300px] sm:w-[300px]" />
               </SkeletonWrapper>
            ) : isSuccess && data ? (
               <>
                  <section>
                     <div className="mx-auto flex justify-center md:w-3/4 lg:w-1/2">
                        <PieChart
                           labels={Object.keys(data.pieCarts.orderFulfillmentRatio)}
                           data={Object.values(data.pieCarts.orderFulfillmentRatio)}
                           bgColor={[`hsl(110,80%, 80%)`, `hsl(110,80%, 50%)`, `hsl(110,40%, 50%)`]}
                           offset={[0, 0, 50]}
                        />
                     </div>
                     <h2 className="flex justify-center">Order Fulfillment Ratio</h2>
                  </section>

                  <section>
                     <div className="mx-auto flex justify-center md:w-3/4 lg:w-1/2">
                        <DoughnutChart
                           labels={Object.keys(data.pieCarts.productCategoriesRatio)}
                           data={Object.values(data.pieCarts.productCategoriesRatio)}
                           bgColor={Object.values(data.pieCarts.productCategoriesRatio).map(
                              (value) => `hsl(${value * 4},${value}%, 50%)`,
                           )}
                           legends={false}
                           offset={[0, 0, 0, 80]}
                           cutout={"70%"}
                        />
                     </div>
                     <h2 className="flex justify-center">Product Categories Ratio</h2>
                  </section>

                  <section>
                     <div className="mx-auto flex justify-center md:w-3/4 lg:w-1/2">
                        <DoughnutChart
                           labels={["In Stock", "Out Of Stock"]}
                           data={[
                              data.pieCarts.stockAvailability.inStock,
                              data.pieCarts.stockAvailability.outOfStock,
                           ]}
                           bgColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                           legends={false}
                           offset={[0, 80]}
                           cutout={"70%"}
                        />
                     </div>
                     <h2 className="flex justify-center">Stock Availability</h2>
                  </section>

                  <section>
                     <div className="mx-auto flex justify-center md:w-3/4 lg:w-1/2">
                        <DoughnutChart
                           labels={[
                              "Marketing Cost",
                              "Discount",
                              "Burnt",
                              "Production Cost",
                              "Net Margin",
                           ]}
                           data={[
                              data.pieCarts.revenueDistribution.marketingCost,
                              data.pieCarts.revenueDistribution.discount,
                              data.pieCarts.revenueDistribution.burnt,
                              data.pieCarts.revenueDistribution.productionCost,
                              data.pieCarts.revenueDistribution.netMargin,
                           ]}
                           bgColor={[
                              "hsl(110,80%,40%)",
                              "hsl(19,80%,40%)",
                              "hsl(69,80%,40%)",
                              "hsl(300,80%,40%)",
                              "rgb(53, 162, 255)",
                           ]}
                           legends={false}
                           offset={[20, 30, 20, 30, 80]}
                           cutout={"70%"}
                        />
                     </div>
                     <h2 className="flex justify-center">Revenue Distribution</h2>
                  </section>

                  <section>
                     <div className="mx-auto flex justify-center md:w-3/4 lg:w-1/2">
                        <PieChart
                           labels={["Teenager(Below 20)", "Adult (20-40)", "Older (above 40)"]}
                           data={[
                              data.pieCarts.userAgeGroup.teen,
                              data.pieCarts.userAgeGroup.adult,
                              data.pieCarts.userAgeGroup.old,
                           ]}
                           bgColor={[
                              `hsl(10, ${80}%, 80%)`,
                              `hsl(10, ${80}%, 50%)`,
                              `hsl(10, ${40}%, 50%)`,
                           ]}
                           offset={[0, 0, 50]}
                        />
                     </div>
                     <h2 className="flex justify-center">Users Age Group</h2>
                  </section>

                  <section>
                     <div className="mx-auto flex justify-center md:w-3/4 lg:w-1/2">
                        <DoughnutChart
                           labels={["Admin", "Customers"]}
                           data={[data.pieCarts.userCount.admin, data.pieCarts.userCount.customer]}
                           bgColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                           offset={[0, 80]}
                           cutout={"70%"}
                        />
                     </div>
                  </section>
               </>
            ) : (
               <p>{errorMessage}</p>
            )}
         </CardContent>
      </Card>
   )
}
export default Pie
