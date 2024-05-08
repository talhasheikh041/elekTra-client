import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

// Pages
import { Customers } from '@/pages'
import { Dashboard } from '@/pages'
import { Products } from '@/pages'
import { Transactions } from '@/pages'

function App() {
   const router = createBrowserRouter(createRoutesFromElements(<Route></Route>))

   return <>Hello World</>
}

export default App
