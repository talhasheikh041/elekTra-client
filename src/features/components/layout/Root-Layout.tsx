import BounceLoader from "@/features/components/shared/Bounce-Loader"
import Sidebar from "@/features/components/shared/Sidebar"
import { Suspense, useState } from "react"
import { Outlet } from "react-router-dom"

export type OutletContextType = [
   isSideBarActive: boolean,
   setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>,
]

const RootLayout = () => {
   const [isSideBarActive, setIsSideBarActive] = useState(false)

   return (
      <div className="flex">
         <aside>
            <Sidebar isSideBarActive={isSideBarActive} setIsSidebarActive={setIsSideBarActive} />
         </aside>
         <main className="min-h-screen flex-auto bg-secondary dark:bg-secondary">
            <Suspense fallback={<BounceLoader />}>
               <div className="container">
                  <Outlet
                     context={[isSideBarActive, setIsSideBarActive] satisfies OutletContextType}
                  />
               </div>
            </Suspense>
         </main>
      </div>
   )
}

export default RootLayout
