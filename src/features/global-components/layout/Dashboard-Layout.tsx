import { selectUser } from "@/features/customers/reducer/user-reducer"
import DashboardHeader from "@/features/dashboard/components/Dashboard-Header"
import Sidebar from "@/features/dashboard/components/Sidebar"
import BounceLoader from "@/features/global-components/shared/Bounce-Loader"
import ScrollToTop from "@/features/global-components/shared/ScrollToTop"
import useFcmToken from "@/hooks/use-fcm-token"
import { useAppSelector } from "@/redux/store"
import axios from "axios"
import { Suspense, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

export type OutletContextType = [
   isSideBarActive: boolean,
   setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>,
]

const DashboardLayout = () => {
   const [isSideBarActive, setIsSideBarActive] = useState(false)
   const { user } = useAppSelector(selectUser)

   // @ts-ignore
   const { token, notificationPermissionStatus } = useFcmToken()

   useEffect(() => {
      const storeFCMToken = async () => {
         try {
            await axios.post(`${import.meta.env.VITE_SERVER_LINK}/api/v1/fcm/store-token`, {
               userId: user?._id,
               token: token,
            })
         } catch (error) {
            console.log(error)
         }
      }

      if (token) storeFCMToken()
   }, [token])

   return (
      <>
         <ScrollToTop />
         <aside>
            <Sidebar isSideBarActive={isSideBarActive} setIsSidebarActive={setIsSideBarActive} />
         </aside>
         <header className="sticky top-0 z-50 bg-background shadow-sm sm:ms-72">
            <DashboardHeader
               isSideBarActive={isSideBarActive}
               setIsSidebarActive={setIsSideBarActive}
            />
         </header>
         <main className="min-h-[calc(100svh-56px)] bg-secondary py-4 dark:bg-secondary sm:ms-72">
            <Suspense fallback={<BounceLoader />}>
               <div className="container">
                  <Outlet />
               </div>
            </Suspense>
         </main>
      </>
   )
}

export default DashboardLayout
