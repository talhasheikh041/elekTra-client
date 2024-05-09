import Sidebar from '@/features/components/shared/Sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
   return (
      <>
         <Sidebar />
         <main>
            <Outlet />
         </main>
      </>
   )
}

export default RootLayout
