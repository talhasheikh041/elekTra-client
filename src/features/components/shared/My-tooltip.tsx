import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/features/components/ui/tooltip"
import { ReactNode } from "react"

type MyTooltipProps = {
   title: string
   children: ReactNode
}

const Mytooltip = ({ title, children }: MyTooltipProps) => {
   return (
      <>
         <TooltipProvider delayDuration={0}>
            <Tooltip>
               <TooltipTrigger>{children}</TooltipTrigger>
               <TooltipContent>
                  <p>{title}</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </>
   )
}
export default Mytooltip
