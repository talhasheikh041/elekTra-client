import RootLayout from "@/features/global-components/layout/Root-Layout"

const Error404 = () => {
   return (
      <>
         <RootLayout />
         <div className="grid h-[calc(100vh-60px)] place-items-center text-6xl">
            404 - Page not found!
         </div>
      </>
   )
}
export default Error404
