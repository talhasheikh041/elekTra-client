import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
   return (
      <footer className="mt-16 bg-secondary pt-10 md:mt-20">
         <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">
               Elek<span className="text-orange-700">Tra</span>.
            </div>

            <div className="mt-6 flex flex-col gap-2 *:px-4 sm:flex-row">
               <Link
                  to={"#"}
                  className="text-center font-extralight first:border-l-0 hover:font-light dark:border-primary sm:border-l sm:text-left"
               >
                  Home
               </Link>
               <Link
                  to={"#"}
                  className="text-center font-extralight hover:font-light dark:border-primary sm:border-l sm:text-left"
               >
                  About
               </Link>
               <Link
                  to={"#"}
                  className="text-center font-extralight hover:font-light dark:border-primary sm:border-l sm:text-left"
               >
                  Products
               </Link>
               <Link
                  to={"#"}
                  className="text-center font-extralight hover:font-light dark:border-primary sm:border-l sm:text-left"
               >
                  Privacy
               </Link>
               <Link
                  to={"#"}
                  className="text-center font-extralight hover:font-light dark:border-primary sm:border-l sm:text-left"
               >
                  Contact
               </Link>
            </div>

            <div className="mt-8 w-full bg-primary-foreground py-4 dark:bg-secondary dark:py-4 sm:flex-row">
               <div className="container flex flex-col items-center justify-between gap-3 sm:gap-0 md:flex-row">
                  <p className="font-thin text-xs md:text-sm">
                     Copyright &copy; 2024. ElekTra. All Rights Reserved.
                  </p>

                  <div className="flex items-center gap-3">
                     <span>
                        <FaFacebook />
                     </span>
                     <span>
                        <FaTwitter />
                     </span>
                     <span>
                        <FaLinkedin />
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}
export default Footer
