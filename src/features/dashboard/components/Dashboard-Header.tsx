import { selectUser } from "@/features/customers/reducer/user-reducer"
import MyTooltip from "@/features/global-components/shared/My-Tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/global-components/ui/avatar"
import { Button } from "@/features/global-components/ui/button"
import { useAppSelector } from "@/redux/store"
import { AlignRight, Bell, HomeIcon, Loader, LogInIcon, Moon, Search, Sun } from "lucide-react"

import { useTheme } from "@/features/global-components/shared/Theme-Provider"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/features/global-components/ui/dropdown-menu"
import { auth } from "@/firebase"
import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import CommandSearch from "@/features/dashboard/components/Command-Search"
import { useState } from "react"

type DashboardHeaderProps = {
   isSideBarActive: boolean
   setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>
}

const DashboardHeader = ({ isSideBarActive, setIsSidebarActive }: DashboardHeaderProps) => {
   const { user, loading } = useAppSelector(selectUser)
   const { theme, setTheme } = useTheme()
   const navigate = useNavigate()

   const [open, setOpen] = useState(false)

   const logoutHandler = async () => {
      try {
         await signOut(auth)
         toast.success("Logged out successfully")
      } catch (error) {
         toast.error(error as string)
      }
   }

   return (
      <div className="flex items-center justify-between gap-3 px-4 py-3">
         <Button
            onClick={() => setIsSidebarActive(!isSideBarActive)}
            className="sm:hidden"
            variant="ghost"
         >
            <AlignRight className="size-5 transition-transform hover:scale-110" />
         </Button>

         <div className="hidden sm:block">
            <CommandSearch open={open} setOpen={setOpen} />
         </div>

         <div className="flex items-center gap-3">
            <Link to={"/"}>
               <MyTooltip title="Home">
                  <HomeIcon className="size-5 transition-transform hover:scale-110" />
               </MyTooltip>
            </Link>

            <div className="sm:hidden">
               <MyTooltip title="Search">
                  <Search
                     onClick={() => setOpen(true)}
                     className="size-5 cursor-pointer transition-transform hover:scale-110"
                  />
               </MyTooltip>
            </div>

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
                     <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => navigate("/myorders", { relative: "path" })}
                     >
                        <span>Orders</span>
                     </DropdownMenuItem>
                     <DropdownMenuItem className="cursor-pointer" onClick={logoutHandler}>
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
               <div>
                  <MyTooltip title="Login">
                     <Link to={"login"}>
                        <LogInIcon className="size-5 transition-transform hover:scale-110" />
                     </Link>
                  </MyTooltip>
               </div>
            )}
         </div>
      </div>
   )
}
export default DashboardHeader
