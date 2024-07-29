import { LineChart } from "@/features/global-components/shared/admin/Charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"

const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "Aug",
   "Sept",
   "Oct",
   "Nov",
   "Dec",
]

function Line() {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">
               Pie and Doughnut Charts
            </CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col gap-12 py-6">
            <section>
               <div>
                  <LineChart
                     data={[200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200]}
                     label="Users"
                     borderColor="rgb(53, 162, 255)"
                     bgColor="rgba(53, 162, 255,0.5)"
                     labels={months}
                  />
               </div>
               <h2 className="mt-4 flex justify-center">Active Users</h2>
            </section>
            <section>
               <div>
                  <LineChart
                     data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32]}
                     bgColor={"hsla(269,80%,40%,0.4)"}
                     borderColor={"hsl(269,80%,40%)"}
                     label="Products"
                     labels={months}
                  />
               </div>
               <h2 className="mt-4 flex justify-center">Total Products (SKU)</h2>
            </section>
            <section>
               <div>
                  <LineChart
                     data={[
                        24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000, 144400,
                        100000, 120000,
                     ]}
                     bgColor={"hsla(129,80%,40%,0.4)"}
                     borderColor={"hsl(129,80%,40%)"}
                     label="Revenue"
                     labels={months}
                  />
               </div>
               <h2 className="mt-4 flex justify-center">Total Revenue</h2>
            </section>
            <section>
               <div>
                  <LineChart
                     data={[
                        9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500, 2000, 5000,
                     ]}
                     bgColor={"hsla(29,80%,40%,0.4)"}
                     borderColor={"hsl(29,80%,40%)"}
                     label="Discount"
                     labels={months}
                  />
               </div>
               <h2 className="mt-4 flex justify-center">Discount Allotted</h2>
            </section>
         </CardContent>
      </Card>
   )
}
export default Line
