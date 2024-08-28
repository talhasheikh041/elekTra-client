import { selectUser } from "@/features/customers/reducer/user-reducer"
import { useLineChartQuery } from "@/features/dashboard/api/dashboard-api"
import { LineChart } from "@/features/dashboard/components/Charts"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { getLastMonths } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType } from "@/types/api-types"
import { toast } from "sonner"

const { lastTwelveMonths } = getLastMonths()

function Line() {
   const { user } = useAppSelector(selectUser)

   const { data, isLoading, isError, isSuccess, error } = useLineChartQuery(user?._id!)

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
         <CardContent className="flex flex-col gap-12 py-6">
            {isLoading ? (
               <SkeletonWrapper className="flex flex-col items-center gap-10" quantity={2}>
                  <Skeleton className="h-[300px] w-full" />
               </SkeletonWrapper>
            ) : isSuccess && data ? (
               <>
                  <section>
                     <div>
                        <LineChart
                           data={data.lineCarts?.users}
                           label="Users"
                           borderColor="rgb(53, 162, 255)"
                           bgColor="rgba(53, 162, 255,0.5)"
                           labels={lastTwelveMonths}
                        />
                        I
                     </div>
                     <h2 className="mt-4 flex justify-center">Active Users</h2>
                  </section>
                  <section>
                     <div>
                        <LineChart
                           data={data.lineCarts.products}
                           bgColor={"hsla(269,80%,40%,0.4)"}
                           borderColor={"hsl(269,80%,40%)"}
                           label="Products"
                           labels={lastTwelveMonths}
                        />
                     </div>
                     <h2 className="mt-4 flex justify-center">Total Products (SKU)</h2>
                  </section>
                  <section>
                     <div>
                        <LineChart
                           data={data.lineCarts.revenue}
                           bgColor={"hsla(129,80%,40%,0.4)"}
                           borderColor={"hsl(129,80%,40%)"}
                           label="Revenue"
                           labels={lastTwelveMonths}
                        />
                     </div>
                     <h2 className="mt-4 flex justify-center">Total Revenue</h2>
                  </section>
                  <section>
                     <div>
                        <LineChart
                           data={data.lineCarts.discount}
                           bgColor={"hsla(29,80%,40%,0.4)"}
                           borderColor={"hsl(29,80%,40%)"}
                           label="Discount"
                           labels={lastTwelveMonths}
                        />
                     </div>
                     <h2 className="mt-4 flex justify-center">Discount Allotted</h2>
                  </section>
               </>
            ) : (
               <p>{errorMessage}</p>
            )}
         </CardContent>
      </Card>
   )
}
export default Line
