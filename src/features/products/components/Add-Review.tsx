import { selectUser } from "@/features/customers/reducer/user-reducer"
import { Button } from "@/features/global-components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/features/global-components/ui/dialog"
import { Label } from "@/features/global-components/ui/label"
import { Textarea } from "@/features/global-components/ui/textarea"
import { useNewReviewMutation } from "@/features/products/api/product-api"
import RatingStars from "@/features/products/components/Rating-Stars"
import { responseToast } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { Loader } from "lucide-react"
import { useState } from "react"

type AddReviewProps = {
   productId: string
}

const AddReview = ({ productId }: AddReviewProps) => {
   const [open, setOpen] = useState(false)

   const [rating, setRating] = useState<number>(-1)
   const [comment, setComment] = useState("")
   const [errors, setErrors] = useState<{ rating?: string; comment?: string }>({})

   const { user } = useAppSelector(selectUser)

   const [newReview, { isLoading }] = useNewReviewMutation()

   // Handlers to clear error messages
   const handleRatingChange = (newRating: number) => {
      setRating(newRating)
      if (errors.rating) {
         setErrors((prevErrors) => ({ ...prevErrors, rating: undefined }))
      }
   }

   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value)
      if (errors.comment) {
         setErrors((prevErrors) => ({ ...prevErrors, comment: undefined }))
      }
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      setErrors({})

      let hasErrors = false
      const newErrors: { rating?: string; comment?: string } = {}

      if (rating <= 0) {
         newErrors.rating = "Rating should be greater than 0."
         hasErrors = true
      }

      if (comment.trim() === "") {
         newErrors.comment = "Comment cannot be empty."
         hasErrors = true
      }

      if (hasErrors) {
         setErrors(newErrors)
         return
      }

      try {
         const res = await newReview({ comment, productId, rating, userId: user?._id })
         responseToast(res)
         handleOpenChange(false)
      } catch (error) {
         console.error("Error submitting review:", error)
      }
   }

   const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen)
   }

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>
            <Button>Add Review</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader className="flex items-center">
               <DialogTitle className="text-2xl font-light uppercase tracking-widest">
                  Rating
               </DialogTitle>
               <DialogDescription className="font-light">
                  Give this product a review
               </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                     <Label>What do you think of this product?</Label>
                     <div className="flex items-center gap-3">
                        <div>
                           <RatingStars rating={rating} setRating={handleRatingChange} />
                        </div>
                        {rating > 0 && <span className="text-lg font-light">({rating})</span>}
                     </div>
                     {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
                  </div>

                  <div className="space-y-2">
                     <Label>Please leave some comments about this product</Label>
                     <Textarea value={comment} onChange={handleCommentChange} />
                     {errors.comment && <p className="text-sm text-red-500">{errors.comment}</p>}
                  </div>

                  <div className="flex justify-center">
                     <Button disabled={isLoading} type="submit">
                        {isLoading ? (
                           <span className="flex items-center gap-2">
                              Submitting <Loader className="animate-spin" />
                           </span>
                        ) : (
                           "Submit"
                        )}
                     </Button>
                  </div>
               </form>
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default AddReview
