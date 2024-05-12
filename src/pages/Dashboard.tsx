import DashboardCard from "@/features/components/shared/Dashboard-Card"
import DashboardHeader from "@/features/components/shared/Dashboard-Header"

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
         </section>
      </div>
   )
}
export default Dashboard
