import { Progress } from "@/features/global-components/ui/progress"
import { ReviewType } from "@/types/types"

type RatingProgressProps = {
   reviews: ReviewType[]
}

const RatingProgress = ({ reviews }: RatingProgressProps) => {
   const counts = [0, 0, 0, 0, 0]

   reviews.forEach((review) => {
      if (review.rating > 4.5) counts[0]++
      if (review.rating > 3.5 && review.rating < 4.5) counts[1]++
      if (review.rating > 2.5 && review.rating < 3.5) counts[2]++
      if (review.rating > 1.5 && review.rating < 2.5) counts[3]++
      if (review.rating > 0.5 && review.rating < 1.5) counts[4]++
   })

   return (
      <div>
         {counts.map((count, index, arr) => (
            <div key={index} className="flex items-center gap-5">
               <span>{arr.length - index}</span>
               <Progress className="*:bg-[#fdd835]" value={count > 100 ? 100 : count} />
               <span>{count}</span>
            </div>
         ))}
      </div>
   )
}
export default RatingProgress
