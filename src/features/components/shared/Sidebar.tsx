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
} from "lucide-react"
import { NavLink } from "react-router-dom"
import logo from "@/assets/logo.svg"

const Sidebar = () => {
   return (
      <div className="flex min-w-64 flex-col bg-white p-4">
         <div className="flex items-center gap-2">
            <img className="size-10" src={logo} />
            <p className="text-3xl font-bold">
               Elek<span className="text-orange-700">Tra</span>.
            </p>
         </div>
         <div className="mt-6">
            <p className="text-sm uppercase tracking-[3px] text-gray-500">Dashboard</p>
            <ul className="mt-3 ps-3">
               <li>
                  <NavLink
                     to="/admin/dashboard"
                     className={({ isActive }) =>
                        isActive
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
                           ? "flex cursor-pointer items-center gap-2 rounded-lg bg-orange-100 p-2 tracking-wide"
                           : "flex cursor-pointer items-center gap-2 rounded-lg p-2 tracking-wide hover:bg-gray-100"
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
