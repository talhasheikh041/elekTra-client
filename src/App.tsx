import {
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   Navigate,
} from "react-router-dom"
import { lazy } from "react"
import RootLayout from "@/features/components/layout/Root-Layout"
import { ThemeProvider } from "@/features/components/shared/Theme-Provider"

// Pages
const Customers = lazy(() => import("@/pages/Customers"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const Products = lazy(() => import("@/pages/Products"))
const Transactions = lazy(() => import("@/pages/Transactions"))
const Bar = lazy(() => import("@/pages/charts/Bar"))
const Line = lazy(() => import("@/pages/charts/Line"))
const Pie = lazy(() => import("@/pages/charts/Pie"))
const Stopwatch = lazy(() => import("@/pages/apps/Stopwatch"))
const Toss = lazy(() => import("@/pages/apps/Toss"))
const Coupon = lazy(() => import("@/pages/apps/Coupon"))

function App() {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin" element={<RootLayout />}>
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
