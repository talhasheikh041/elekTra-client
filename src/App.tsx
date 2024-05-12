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
