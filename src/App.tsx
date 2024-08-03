import { lazy } from "react"
import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom"

// Hooks
import useAuthChanged from "@/features/auth/hooks/use-auth-changed"

// Components
import AdminLayout from "@/features/global-components/layout/Admin-Layout"
import RootLayout from "@/features/global-components/layout/Root-Layout"
import RequireAuth from "@/features/global-components/shared/Require-Auth"
import Error404 from "@/features/global-components/shared/Error-404"

// User Pages
const Home = lazy(() => import("@/pages/Home"))
const Cart = lazy(() => import("@/pages/Cart"))
const Search = lazy(() => import("@/pages/Search"))
const Shipping = lazy(() => import("@/pages/Shipping"))
const Login = lazy(() => import("@/pages/Login"))
const MyOrders = lazy(() => import("@/pages/My-Orders"))
const Checkout = lazy(() => import("@/pages/Checkout"))

// Admin Pages
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"))
const Products = lazy(() => import("@/pages/admin/Products"))
const Transactions = lazy(() => import("@/pages/admin/Transactions"))
const Customers = lazy(() => import("@/pages/admin/Customers"))
const Bar = lazy(() => import("@/pages/admin/charts/Bar"))
const Line = lazy(() => import("@/pages/admin/charts/Line"))
const Pie = lazy(() => import("@/pages/admin/charts/Pie"))
const Stopwatch = lazy(() => import("@/pages/admin/apps/Stopwatch"))
const Toss = lazy(() => import("@/pages/admin/apps/Toss"))
const Coupon = lazy(() => import("@/pages/admin/apps/Coupon"))

function App() {
   useAuthChanged()

   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route errorElement={<Error404 />}>
            <Route path="/" element={<RootLayout />}>
               <Route index element={<Home />} />
               <Route path="cart" element={<Cart />} />
               <Route path="search" element={<Search />} />
               <Route path="login" element={<Login />} />

               {/* Require Auth Routes */}
               <Route element={<RequireAuth isAdmin={false} />}>
                  <Route>
                     <Route path="shipping" element={<Shipping />} />
                     <Route path="pay" element={<Checkout />} />
                     <Route path="myorders" element={<MyOrders />} />
                  </Route>
               </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<RequireAuth isAdmin={true} />}>
               <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="products" element={<Products />} />
                  <Route path="transactions" element={<Transactions />} />

                  <Route path="charts">
                     <Route path="bar" element={<Bar />} />
                     <Route path="pie" element={<Pie />} />
                     <Route path="line" element={<Line />} />
                  </Route>

                  <Route path="apps">
                     <Route path="stopwatch" element={<Stopwatch />} />
                     <Route path="toss" element={<Toss />} />
                     <Route path="coupon" element={<Coupon />} />
                  </Route>
               </Route>
            </Route>
         </Route>,
      ),
   )

   return <RouterProvider router={router} />
}

export default App
