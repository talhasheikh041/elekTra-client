import { lazy } from "react"
import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom"

// Components and Layouts
import DashboardLayout from "@/features/global-components/layout/Dashboard-Layout"
import RootLayout from "@/features/global-components/layout/Root-Layout"
import Error404 from "@/features/global-components/shared/Error-404"
import PersistAuth from "@/features/global-components/shared/Persist-Auth"
import RequireAuth from "@/features/global-components/shared/Require-Auth"

// Customer Pages
const Home = lazy(() => import("@/pages/Home"))
const Cart = lazy(() => import("@/pages/Cart"))
const Search = lazy(() => import("@/pages/Search"))
const Shipping = lazy(() => import("@/pages/Shipping"))
const Login = lazy(() => import("@/pages/Login"))
const MyOrders = lazy(() => import("@/pages/My-Orders"))
const Checkout = lazy(() => import("@/pages/Checkout"))
const ProductDetails = lazy(() => import("@/pages/Product-Details"))

// Admin Pages
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"))
const Products = lazy(() => import("@/pages/admin/products/Products"))
const NewProduct = lazy(() => import("@/pages/admin/products/New-Product"))
const Transactions = lazy(() => import("@/pages/admin/transactions/Transactions"))
const TransactionDetails = lazy(() => import("@/pages/admin/transactions/Transaction-Details"))
const Customers = lazy(() => import("@/pages/admin/Customers"))
const Bar = lazy(() => import("@/pages/admin/charts/Bar"))
const Line = lazy(() => import("@/pages/admin/charts/Line"))
const Pie = lazy(() => import("@/pages/admin/charts/Pie"))
const Stopwatch = lazy(() => import("@/pages/admin/apps/Stopwatch"))
const Toss = lazy(() => import("@/pages/admin/apps/Toss"))
const Coupons = lazy(() => import("@/pages/admin/apps/Coupons"))

function App() {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route element={<PersistAuth />}>
            <Route path="/" element={<RootLayout />}>
               <Route errorElement={<Error404 />}>
                  <Route index element={<Home />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="search" element={<Search />} />
                  <Route path="login" element={<Login />} />
                  <Route path="product/:productId" element={<ProductDetails />} />

                  {/* Require Auth Routes */}
                  <Route element={<RequireAuth isAdmin={false} />}>
                     <Route>
                        <Route path="shipping" element={<Shipping />} />
                        <Route path="pay" element={<Checkout />} />
                        <Route path="myorders" element={<MyOrders />} />
                     </Route>
                  </Route>
               </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<RequireAuth isAdmin={true} />}>
               <Route path="/admin" element={<DashboardLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="customers" element={<Customers />} />

                  <Route path="products">
                     <Route index element={<Products />} />
                     <Route path="new" element={<NewProduct />} />
                  </Route>

                  <Route path="transactions">
                     <Route index element={<Transactions />} />
                     <Route path=":id" element={<TransactionDetails />} />
                  </Route>

                  <Route path="charts">
                     <Route path="bar" element={<Bar />} />
                     <Route path="pie" element={<Pie />} />
                     <Route path="line" element={<Line />} />
                  </Route>

                  <Route path="apps">
                     <Route path="stopwatch" element={<Stopwatch />} />
                     <Route path="toss" element={<Toss />} />
                     <Route path="coupon" element={<Coupons />} />
                  </Route>
               </Route>
            </Route>
         </Route>,
      ),
   )

   return <RouterProvider router={router} />
}

export default App
