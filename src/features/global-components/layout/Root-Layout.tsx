import BounceLoader from "@/features/global-components/shared/Bounce-Loader"
import Header from "@/features/global-components/shared/Header"
import ScrollTotop from "@/features/global-components/shared/ScrollToTop"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
   return (
      <>
         <ScrollTotop />
         <Header />
         <Suspense fallback={<BounceLoader />}>
            <Outlet />
         </Suspense>
      </>
   )
}
export default RootLayout
