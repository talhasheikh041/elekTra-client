import { selectUser } from "@/features/customers/reducer/user-reducer"
import { useBarChartQuery } from "@/features/dashboard/api/dashboard-api"
import { BarChart } from "@/features/dashboard/components/Charts"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { getLastMonths } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType } from "@/types/api-types"
import { toast } from "sonner"

const { lastSixMonths, lastTwelveMonths } = getLastMonths()

function Bar() {
   const { user } = useAppSelector(selectUser)

   const { data, isLoading, isError, isSuccess, error } = useBarChartQuery(user?._id!)

   let errorMessage: string | null = null
   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">Bar Charts</CardTitle>
         </CardHeader>
         <CardContent className="py-6">
            {isLoading ? (
               <SkeletonWrapper className="flex flex-col items-center gap-10" quantity={2}>
                  <Skeleton className="h-[300px] w-full" />
               </SkeletonWrapper>
            ) : isSuccess && data ? (
               <>
                  <section>
                     <div className="h-[70vh]">
                        <BarChart
                           data_1={data.barCarts.products}
                           data_2={data.barCarts.users}
                           title_1="Products"
                           title_2="Users"
                           bgColor_1={`hsl(260,50%,30%)`}
                           bgColor_2={`hsl(360,90%,90%)`}
                           labels={lastSixMonths}
                        />
                     </div>
                     <h2 className="mt-4 flex justify-center">
                        Top Selling Products & Top Customers
                     </h2>
                  </section>

                  <section className="mt-20">
                     <div className="h-[70vh]">
                        <BarChart
                           horizontal={true}
                           data_1={data.barCarts.orders}
                           data_2={[]}
                           title_1="Orders"
                           title_2=""
                           bgColor_1={`hsl(180, 40%, 50%)`}
                           bgColor_2=""
                           labels={lastTwelveMonths}
                        />
                     </div>
                     <h2 className="mt-4 flex justify-center">Orders throughout the year</h2>
                  </section>
               </>
            ) : (
               <p>{errorMessage}</p>
            )}
         </CardContent>
      </Card>
   )
}
export default Bar
