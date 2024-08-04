import { Progress } from "@/features/global-components/ui/progress"
import { useEffect, useRef, useState } from "react"

const randomColors = ["red", "blue", "green", "orange", "yellow", "cyan", "purple", "pink"]

type ProductCategoryProps = {
   value: number
   category: string
}

const ProductCategory = ({ value, category }: ProductCategoryProps) => {
   const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)]
   const randomColorClass = `*:bg-${randomColor}-500`

   const [myValue, setMyValue] = useState(0)

   useEffect(() => {
      setMyValue(value)
   }, [value])

   return (
      <div className="flex items-center justify-between gap-4">
         <span className="text-sm text-gray-500">{category}</span>
         <span className="w-full">
            <Progress className={`h-2 *:duration-500 ${randomColorClass}`} value={myValue} />
         </span>
         <span className="text-sm">{value}%</span>
      </div>
   )
}
export default ProductCategory
