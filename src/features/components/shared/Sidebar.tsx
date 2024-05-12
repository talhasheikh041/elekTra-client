import {
   ArrowLeftRight,
   BarChart3,
   Coins,
   LayoutDashboardIcon,
   LineChart,
   PieChart,
   Puzzle,
   ShoppingBag,
   Timer,
   Users,
   X,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import logo from "@/assets/logo.svg"
import { Button } from "@/features/components/ui/button"

const Sidebar = ({
   isSideBarActive,
   setIsSidebarActive,
}: {
   isSideBarActive: boolean
   setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {
   return (
      <div
         className={`custom-scroll dark:custom-scroll-dark absolute left-0 top-0 z-50 flex max-h-screen min-w-72  flex-col overflow-hidden bg-background p-4 transition-all duration-300 hover:overflow-y-auto sm:static sm:translate-x-0 ${isSideBarActive ? "translate-x-0" : "-translate-x-full"}`}
      >
         <div className="flex items-center gap-2">
            <img className="size-10" src={logo} />
            <p className="text-3xl font-bold">
               Elek<span className="text-orange-700">Tra</span>.
            </p>
            <Button
               onClick={() => setIsSidebarActive(!isSideBarActive)}
               variant="outline"
               className="ms-auto h-auto px-1 py-1 sm:hidden"
            >
               <X />
            </Button>
         </div>
         <div className="mt-6">
            <p className="text-sm uppercase tracking-[3px] text-gray-500">Dashboard</p>
            <ul className="mt-3 ps-3">
               <li>
                  <NavLink
                     to="/admin/dashboard"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-200 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <LayoutDashboardIcon size="18px" color="purple" />
                     </span>
                     Dashboard
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/products"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <ShoppingBag size="18px" color="blue" />
                     </span>
                     Products
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/customers"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <Users size="18px" color="darkorange" />
                     </span>
                     Customers
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/transactions"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <ArrowLeftRight size="18px" color="darkcyan" />
                     </span>
                     Transactions
                  </NavLink>
               </li>
            </ul>
         </div>

         <div className="mt-6">
            <p className="text-sm uppercase tracking-[3px] text-gray-500">Charts</p>
            <ul className="mt-3 ps-3">
               <li>
                  <NavLink
                     to="/admin/bar"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <BarChart3 size="18px" color="#1c5f88" />
                     </span>
                     Bar
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/pie"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <PieChart size="18px" color="green" />
                     </span>
                     Pie
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/line"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <LineChart size="18px" color="darkgray" />
                     </span>
                     Line
                  </NavLink>
               </li>
            </ul>
         </div>

         <div className="mt-6">
            <p className="text-sm uppercase tracking-[3px] text-gray-500">Apps</p>
            <ul className="mt-3 ps-3">
               <li>
                  <NavLink
                     to="/admin/stopwatch"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <Timer size="18px" color="darkred" />
                     </span>
                     Stopwatch
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/coupon"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <Puzzle size="18px" color="Fuchsia" />
                     </span>
                     Coupon
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/admin/toss"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide dark:bg-primary"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-secondary"
                     }
                  >
                     <span>
                        <Coins size="18px" color="Teal" />
                     </span>
                     Toss
                  </NavLink>
               </li>
            </ul>
         </div>
      </div>
   )
}
export default Sidebar
