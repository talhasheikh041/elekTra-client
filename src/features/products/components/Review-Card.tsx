import { Avatar, AvatarFallback, AvatarImage } from "@/features/global-components/ui/avatar"
import RatingStars from "@/features/products/components/Rating-Stars"
import { ReviewType } from "@/types/types"
import moment from "moment"

type ReviewCardProps = {
   review: ReviewType
}

const ReviewCard = ({ review }: ReviewCardProps) => {
   const { comment, rating, user, updatedAt } = review

   const relativeTime = moment(updatedAt).fromNow()

   return (
      <div className="flex gap-4 rounded-xl bg-secondary px-4 py-4">
         <div>
            <Avatar>
               <AvatarImage src={user.photo} />
               <AvatarFallback className="cursor-default select-none border bg-background">
                  {user.name[0]}
               </AvatarFallback>
            </Avatar>
         </div>

         <div>
            <div className="flex items-center gap-2">
               <span className="font-semibold">{user.name}</span>
               <span className="text-xs text-muted-foreground">{relativeTime}</span>
            </div>
            <RatingStars size="18px" rating={rating} readOnly={true} />
            <p className="text-xs sm:text-sm font-light">{comment}</p>
         </div>
      </div>
   )
}
export default ReviewCard
