import BounceLoader from "@/features/global-components/shared/Bounce-Loader"
import ScrollToTop from "@/features/global-components/shared/ScrollToTop"
import DashboardHeader from "@/features/dashboard/components/Dashboard-Header"
import Sidebar from "@/features/dashboard/components/Sidebar"
import { Suspense, useState } from "react"
import { Outlet } from "react-router-dom"

export type OutletContextType = [
   isSideBarActive: boolean,
   setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>,
]

const DashboardLayout = () => {
   const [isSideBarActive, setIsSideBarActive] = useState(false)

   return (
      <>
         <ScrollToTop />
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

export default DashboardLayout
