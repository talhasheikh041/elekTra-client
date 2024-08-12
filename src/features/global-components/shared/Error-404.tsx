import { Link } from "react-router-dom"

const Error404 = () => {
   return (
      <section>
         <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <div className="mx-auto max-w-screen-sm text-center">
               <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary dark:text-primary lg:text-9xl">
                  404
               </h1>
               <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                  Something's missing.
               </p>
               <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Sorry, we can't find that page. You'll find lots to explore on the home page.{" "}
               </p>
               <Link
                  to={"/"}
                  className="my-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary/90"
               >
                  Back to Homepage
               </Link>
            </div>
         </div>
      </section>
   )
}
export default Error404
