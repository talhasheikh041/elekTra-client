import { cn } from "@/lib/utils"
import { ReactElement } from "react"

type SkeletonWrapperProps = {
   children: ReactElement
   quantity: number
   className?: string
}

const SkeletonWrapper = ({ children, quantity, className }: SkeletonWrapperProps) => {
   const skeletons = Array.from({ length: quantity }).fill(children) as ReactElement[]

   return <div className={cn(className)}>{skeletons}</div>
}
export default SkeletonWrapper
