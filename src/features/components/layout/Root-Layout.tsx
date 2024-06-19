import BounceLoader from "@/features/components/shared/Bounce-Loader"
import Header from "@/features/components/shared/Header"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
   return (
      <>
         <Header />
         <Suspense fallback={<BounceLoader />}>
            <Outlet />
         </Suspense>
      </>
   )
}
export default RootLayout
