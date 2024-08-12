import BounceLoader from "@/features/global-components/shared/Bounce-Loader"
import Footer from "@/features/global-components/shared/Footer"
import Header from "@/features/global-components/shared/Header"
import ScrollTotop from "@/features/global-components/shared/ScrollToTop"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
   return (
      <>
         <ScrollTotop />
         <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] min-h-dvh">
            <Header />
            <div>
               <Suspense fallback={<BounceLoader />}>
                  <Outlet />
               </Suspense>
            </div>
            <Footer />
         </div>
      </>
   )
}
export default RootLayout
