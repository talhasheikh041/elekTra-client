import BounceLoader from "@/features/components/shared/Bounce-Loader"
import DashboardHeader from "@/features/components/shared/admin/Dashboard-Header"
import Sidebar from "@/features/components/shared/admin/Sidebar"
import { Suspense, useState } from "react"
import { Outlet } from "react-router-dom"

export type OutletContextType = [
   isSideBarActive: boolean,
   setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>,
]

const AdminLayout = () => {
   const [isSideBarActive, setIsSideBarActive] = useState(false)

   return (
      <>
         <aside>
            <Sidebar isSideBarActive={isSideBarActive} setIsSidebarActive={setIsSideBarActive} />
         </aside>
         <main className="bg-secondary py-4 dark:bg-secondary sm:ms-72">
            <Suspense fallback={<BounceLoader />}>
               <div className="container">
                  <DashboardHeader
                     isSideBarActive={isSideBarActive}
                     setIsSidebarActive={setIsSideBarActive}
                  />
                  <Outlet />
               </div>
            </Suspense>
         </main>
      </>
   )
}

export default AdminLayout
