import {
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   Link,
} from "react-router-dom"
import { lazy } from "react"
import AdminLayout from "@/features/components/layout/Admin-Layout"
import { ThemeProvider } from "@/features/components/shared/Theme-Provider"
import { Button } from "@/features/components/ui/button"

// Pages
const Customers = lazy(() => import("@/pages/admin/Customers"))
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"))
const Products = lazy(() => import("@/pages/admin/Products"))
const Transactions = lazy(() => import("@/pages/admin/Transactions"))
const Bar = lazy(() => import("@/pages/admin/charts/Bar"))
const Line = lazy(() => import("@/pages/admin/charts/Line"))
const Pie = lazy(() => import("@/pages/admin/charts/Pie"))
const Stopwatch = lazy(() => import("@/pages/admin/apps/Stopwatch"))
const Toss = lazy(() => import("@/pages/admin/apps/Toss"))
const Coupon = lazy(() => import("@/pages/admin/apps/Coupon"))

function App() {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route>
            <Route
               path="/"
               element={
                  <div className="grid min-h-screen place-items-center">
                     <Button>
                        <Link to="admin/dashboard">Go to Dashboard</Link>
                     </Button>
                  </div>
               }
            />
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
         </Route>,
      ),
   )

   return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
         <RouterProvider router={router} />
      </ThemeProvider>
   )
}

export default App
