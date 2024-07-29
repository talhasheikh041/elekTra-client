import { BarChart } from "@/features/global-components/shared/admin/Charts"
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

function Bar() {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">Bar Charts</CardTitle>
         </CardHeader>
         <CardContent className="py-6">
            <section>
               <div className="h-[70vh]">
                  <BarChart
                     data_1={[200, 444, 343, 556, 778, 455, 990]}
                     data_2={[300, 144, 433, 655, 237, 755, 190]}
                     title_1="Products"
                     title_2="Users"
                     bgColor_1={`hsl(260,50%,30%)`}
                     bgColor_2={`hsl(360,90%,90%)`}
                  />
               </div>
               <h2 className="mt-4 flex justify-center">Top Selling Products & Top Customers</h2>
            </section>

            <section className="mt-20">
               <div className="h-[70vh]">
                  <BarChart
                     horizontal={true}
                     data_1={[200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909]}
                     data_2={[]}
                     title_1="Products"
                     title_2=""
                     bgColor_1={`hsl(180, 40%, 50%)`}
                     bgColor_2=""
                     labels={months}
                  />
               </div>
               <h2 className="mt-4 flex justify-center">Orders throughout the year</h2>
            </section>
         </CardContent>
      </Card>
   )
}
export default Bar
