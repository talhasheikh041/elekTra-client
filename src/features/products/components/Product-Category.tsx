import { Progress } from "@/features/global-components/ui/progress"

const randomColors = ["red", "blue", "green", "orange", "yellow", "cyan", "purple", "pink"]

type ProductCategoryProps = {
   value: number
   category: string
}

const ProductCategory = ({ value, category }: ProductCategoryProps) => {
   const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)]
   const randomColorClass = `*:bg-${randomColor}-500`

   return (
      <div className="flex items-center justify-between gap-4">
         <span className="text-gray-500 text-sm">{category}</span>
         <span className="w-full">
            <Progress className={`h-2 ${randomColorClass}`} value={value} />
         </span>
         <span className="text-sm">{value}%</span>
      </div>
   )
}
export default ProductCategory
