import { Button } from "@/features/global-components/ui/button"
import {
   CommandDialog,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/features/global-components/ui/command"
import { cn } from "@/lib/utils"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

type CommandSearchProps = {
   open: boolean
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CommandSearch = ({ open = false, setOpen }: CommandSearchProps) => {
   const navigate = useNavigate()

   useEffect(() => {
      const down = (e: KeyboardEvent) => {
         if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
         }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
   }, [])

   const runCommand = useCallback((command: () => unknown) => {
      setOpen(false)
      command()
   }, [])

   return (
      <>
         <Button
            variant="outline"
            className={cn(
               "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-96",
            )}
            onClick={() => setOpen(true)}
         >
            <span className="hidden lg:inline-flex">Search</span>
            <span className="inline-flex lg:hidden">Search...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
               <span className="text-xs">⌘</span>K
            </kbd>
         </Button>

         <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type to search..." />
            <CommandList>
               <CommandEmpty>No results found.</CommandEmpty>
               <CommandGroup heading="Features">
                  <CommandItem
                     className="cursor-pointer"
                     onSelect={() => runCommand(() => navigate("/admin/products"))}
                  >
                     Products
                  </CommandItem>
                  <CommandItem
                     className="cursor-pointer"
                     onSelect={() => runCommand(() => navigate("/admin/customers"))}
                  >
                     Customers
                  </CommandItem>
                  <CommandItem
                     className="cursor-pointer"
                     onSelect={() => runCommand(() => navigate("/admin/transactions"))}
                  >
                     Transactions
                  </CommandItem>
               </CommandGroup>

               <CommandGroup heading="Charts">
                  <CommandItem
                     className="cursor-pointer"
                     onSelect={() => runCommand(() => navigate("/admin/charts/pie"))}
                  >
                     Pie
                  </CommandItem>
                  <CommandItem
                     className="cursor-pointer"
                     onSelect={() => runCommand(() => navigate("/admin/charts/bar"))}
                  >
                     Bar
                  </CommandItem>
                  <CommandItem
                     className="cursor-pointer"
                     onSelect={() => runCommand(() => navigate("/admin/charts/line"))}
                  >
                     Line
                  </CommandItem>
               </CommandGroup>

               <CommandGroup heading="Apps">
                  <CommandItem
                     className="cursor-pointer"
                     onSelect={() => runCommand(() => navigate("/admin/apps/stopwatch"))}
                  >
                     Stopwatch
                  </CommandItem>
                  <CommandItem
                     className="cursor-pointer"
                     onSelect={() => runCommand(() => navigate("/admin/apps/coupon"))}
                  >
                     Coupon
                  </CommandItem>
                  <CommandItem
                     className="cursor-pointer"
                     onSelect={() => runCommand(() => navigate("/admin/apps/toss"))}
                  >
                     Toss
                  </CommandItem>
               </CommandGroup>
            </CommandList>
         </CommandDialog>
      </>
   )
}
export default CommandSearch
