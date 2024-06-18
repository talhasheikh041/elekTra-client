import { ModeToggle } from "@/features/components/shared/Mode-Toggle"
import MyTooltip from "@/features/components/shared/My-Tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/components/ui/avatar"
import { Button } from "@/features/components/ui/button"
import { Input } from "@/features/components/ui/input"
import { AlignRight, Bell, Search } from "lucide-react"

const DashboardHeader = ({
   isSideBarActive,
   setIsSidebarActive,
}: {
   isSideBarActive: boolean
   setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {
   return (
      <div className="relative mb-6 flex items-center gap-3 border-b border-b-secondary-foreground pb-2">
         <Button
            onClick={() => setIsSidebarActive(!isSideBarActive)}
            className="h-0 p-0"
            variant="ghost"
         >
            <AlignRight
               size="30px"
               className="text-gray-400 hover:scale-110 hover:text-black dark:hover:text-white sm:hidden"
            />
         </Button>
         <Input
            className="border-0 bg-transparent px-8 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search for docs, data, users"
         />
         <Search className="absolute left-11 text-secondary-foreground  sm:left-0 sm:top-2 " />

         <MyTooltip title="Notifications">
            <Bell
               size="28px"
               className="cursor-pointer text-secondary-foreground hover:scale-110 dark:hover:text-white"
            />
         </MyTooltip>

         <MyTooltip title="Profile">
            <Avatar className="size-8 cursor-pointer">
               <AvatarImage src="https://github.com/shadcn.png" />
               <AvatarFallback>MT</AvatarFallback>
            </Avatar>
         </MyTooltip>

         <ModeToggle />
      </div>
   )
}
export default DashboardHeader
