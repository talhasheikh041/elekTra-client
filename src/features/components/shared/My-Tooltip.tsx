import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/features/components/ui/tooltip"
import { ReactNode } from "react"

type MyTooltipProps = {
   title: string
   className?: string
   children: ReactNode
}

const MyTooltip = ({ title, className, children }: MyTooltipProps) => {
   return (
      <>
         <TooltipProvider delayDuration={0}>
            <Tooltip>
               <TooltipTrigger className={className}>{children}</TooltipTrigger>
               <TooltipContent>
                  <p>{title}</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </>
   )
}
export default MyTooltip
