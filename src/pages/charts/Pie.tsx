import { DoughnutChart, PieChart } from "@/features/components/shared/Charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/components/ui/card"
import { categories } from "@/assets/data.json"

function Pie() {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">
               Pie and Doughnut Charts
            </CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col gap-8 py-6">
            <section>
               <div className="mx-auto flex justify-center md:w-3/4 lg:w-1/2">
                  <PieChart
                     labels={["Processing", "Shipped", "Delivered"]}
                     data={[12, 9, 13]}
                     bgColor={[`hsl(110,80%, 80%)`, `hsl(110,80%, 50%)`, `hsl(110,40%, 50%)`]}
                     offset={[0, 0, 50]}
                  />
               </div>
               <h2 className="flex justify-center">Order Fulfillment Ratio</h2>
            </section>

            <section>
               <div className="mx-auto flex justify-center md:w-3/4 lg:w-1/2">
                  <DoughnutChart
                     labels={categories.map((i) => i.heading)}
                     data={categories.map((i) => i.value)}
                     bgColor={categories.map((i) => `hsl(${i.value * 4},${i.value}%, 50%)`)}
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
                     data={[40, 20]}
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
                     data={[32, 18, 5, 20, 25]}
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
                     data={[30, 250, 70]}
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
                     data={[40, 250]}
                     bgColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                     offset={[0, 80]}
                     cutout={"70%"}
                  />
               </div>
            </section>
         </CardContent>
      </Card>
   )
}
export default Pie
