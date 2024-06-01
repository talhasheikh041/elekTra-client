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
      <div className="">
         <aside>
            <Sidebar isSideBarActive={isSideBarActive} setIsSidebarActive={setIsSideBarActive} />
         </aside>
         <main className="min-h-screen flex-auto bg-secondary dark:bg-secondary sm:ms-72">
            <Suspense fallback={<BounceLoader />}>
               <div className="container py-4">
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
