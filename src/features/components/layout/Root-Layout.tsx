import BounceLoader from "@/features/components/shared/Bounce-Loader"
import Sidebar from "@/features/components/shared/Sidebar"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
   return (
      <div className="flex">
         <aside className="custom-scroll absolute left-0 top-0 max-h-screen min-w-72 -translate-x-full overflow-hidden transition-all duration-300 hover:overflow-y-auto sm:static sm:translate-x-0">
            <Sidebar />
         </aside>
         <main className="min-h-screen flex-auto bg-gray-50">
            <Suspense fallback={<BounceLoader />}>
               <div className="container">
                  <Outlet />
               </div>
            </Suspense>
         </main>
      </div>
   )
}

export default RootLayout
