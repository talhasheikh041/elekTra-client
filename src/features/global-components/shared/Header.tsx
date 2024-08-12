import { selectUser } from "@/features/customers/reducer/user-reducer"
import MyTooltip from "@/features/global-components/shared/My-Tooltip"
import { useTheme } from "@/features/global-components/shared/Theme-Provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/global-components/ui/avatar"
import { Button } from "@/features/global-components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/features/global-components/ui/dropdown-menu"
import { auth } from "@/firebase"
import { useAppSelector } from "@/redux/store"
import { signOut } from "firebase/auth"
import { HomeIcon, Loader, LogInIcon, Moon, SearchIcon, ShoppingBagIcon, Sun } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import logo from "@/assets/logo.svg"

const Header = () => {
   const { theme, setTheme } = useTheme()
   const { user, loading } = useAppSelector(selectUser)
   const navigate = useNavigate()

   const logoutHandler = async () => {
      try {
         await signOut(auth)
         toast.success("Logged out successfully")
      } catch (error) {
         toast.error(error as string)
      }
   }

   return (
      <header className="sticky top-0 z-50 bg-primary-foreground dark:bg-secondary">
         <nav className="flex items-center justify-between gap-3 rounded-bl-2xl rounded-br-2xl  px-3 py-4 font-light md:container">
            <div>
               <Link to="/">
                  <div className="flex items-center gap-2">
                     <img className="size-9" src={logo} />
                     <div className="hidden text-3xl font-bold sm:block">
                        Elek<span className="text-orange-700">Tra</span>.
                     </div>
                  </div>
               </Link>
            </div>

            <div className="flex items-center gap-3">
               <Link to={"/"}>
                  <MyTooltip title="Home">
                     <HomeIcon className="size-5 transition-transform hover:scale-110" />
                  </MyTooltip>
               </Link>

               <Link to={"search"}>
                  <MyTooltip title="Search">
                     <SearchIcon className="size-5 transition-transform hover:scale-110" />
                  </MyTooltip>
               </Link>

               <Link to={"cart"}>
                  <MyTooltip title="Cart">
                     <ShoppingBagIcon className="size-5 transition-transform hover:scale-110" />
                  </MyTooltip>
               </Link>

               {loading ? (
                  <Loader className="animate-spin" />
               ) : user ? (
                  <DropdownMenu>
                     <DropdownMenuTrigger>
                        <MyTooltip title={user.name}>
                           <Avatar className="size-8 cursor-pointer">
                              <AvatarImage src={user.photo} />
                              <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
                           </Avatar>
                        </MyTooltip>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        {user.role === "admin" && (
                           <DropdownMenuItem>
                              <Link to={"/admin/dashboard"}>Dashboard</Link>
                           </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                           className="cursor-pointer"
                           onClick={() => navigate("myorders")}
                        >
                           <span>Orders</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={logoutHandler}>
                           Logout
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                           onClick={() =>
                              theme === "light" ? setTheme("dark") : setTheme("light")
                           }
                        >
                           <Button variant="outline" size="icon" className="h-8 w-full flex-none">
                              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                              <span className="sr-only">Toggle theme</span>
                           </Button>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               ) : (
                  <div>
                     <MyTooltip title="Login">
                        <Link to={"login"}>
                           <LogInIcon className="size-5 transition-transform hover:scale-110" />
                        </Link>
                     </MyTooltip>
                  </div>
               )}
            </div>
         </nav>
      </header>
   )
}
export default Header
