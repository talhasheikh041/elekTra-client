import Sidebar from '@/features/components/shared/Sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
   return (
      <div className='flex'>
         <aside className='min-w-72 absolute sm:relative -translate-x-full sm:translate-x-0 transition-transform left-0 duration-300'>
            <Sidebar />
         </aside>
         <main className='flex-auto bg-gray-50'>
            <Outlet />
         </main>
      </div>
   )
}

export default RootLayout
