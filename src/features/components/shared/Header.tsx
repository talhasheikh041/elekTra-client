import MyTooltip from "@/features/components/shared/My-Tooltip"
import { useTheme } from "@/features/components/shared/Theme-Provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/components/ui/avatar"
import { Button } from "@/features/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/features/components/ui/dropdown-menu"
import { HomeIcon, LogInIcon, Moon, SearchIcon, ShoppingBagIcon, Sun } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
   const [user, setUser] = useState(false)
   const isAdmin = true

   const navigate = useNavigate()

   const { theme, setTheme } = useTheme()

   return (
      <nav className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-secondary px-6 py-3 font-light shadow-md">
         <div>
            <Link to="/">
               <p className="select-none text-3xl font-bold">
                  Elek<span className="text-orange-700">Tra</span>.
               </p>
            </Link>
         </div>

         <div className="flex items-center gap-3 self-end">
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

            {user ? (
               <DropdownMenu>
                  <DropdownMenuTrigger>
                     <Avatar className="size-8 cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>MT</AvatarFallback>
                     </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
                     {isAdmin && (
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
                     <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => alert("Logging out!")}
                     >
                        Logout
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
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
               <div onClick={() => setUser(true)}>
                  <MyTooltip title="Login">
                     <LogInIcon className="size-5 transition-transform hover:scale-110" />
                  </MyTooltip>
               </div>
            )}
         </div>
      </nav>
   )
}
export default Header
