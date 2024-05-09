import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import RootLayout from '@/features/components/layout/Root-Layout'
import BounceLoader from '@/features/components/shared/Bounce-Loader'

// Pages
const Customers = lazy(() => import('@/pages/Customers'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Products = lazy(() => import('@/pages/Products'))
const Transactions = lazy(() => import('@/pages/Transactions'))

function App() {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route
               path="/admin"
               element={
                  <Suspense fallback={<BounceLoader />}>
                     <RootLayout />
                  </Suspense>
               }
            >
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="customers" element={<Customers />} />
               <Route path="products" element={<Products />} />
               <Route path="transactions" element={<Transactions />} />
            </Route>
         </Route>
      )
   )

   return <RouterProvider router={router} />
}

export default App
