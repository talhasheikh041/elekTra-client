import { useRef, useState } from "react"
import { FaRegStar } from "react-icons/fa"
import { FaStar } from "react-icons/fa"

type RatingStarsProps = {
   readOnly?: boolean
   rating: number
   size?: string
   setRating?: (rating: number) => void // Add this prop
}

const RatingStars = ({
   readOnly = false,
   rating = -1,
   size = "25px",
   setRating,
}: RatingStarsProps) => {
   const [hoverActiveStar, setHoverActiveStar] = useState(-1)
   const [isHovered, setIsHovered] = useState(false)

   const ratingContainerRef = useRef<HTMLDivElement | null>(null)

   const totalStars = 5
   const precision = 0.5

   const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsHovered(false)
      const newRating = calculateRating(e)
      setRating!(newRating)
   }

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsHovered(true)
      setHoverActiveStar(calculateRating(e))
   }

   const handleMouseLeave = () => {
      setHoverActiveStar(-1) // Reset to default state
      setIsHovered(false)
   }

   const calculateRating = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): number => {
      if (!ratingContainerRef.current) return -1

      const { width, left } = ratingContainerRef.current.getBoundingClientRect()
      let percent = (e.clientX - left) / width
      const numberInStars = percent * totalStars
      const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision

      return Number(nearestNumber.toFixed(precision.toString().split(".")[1]?.length || 0))
   }

   return (
      <div
         {...(!readOnly && {
            onClick: handleClick,
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
         })}
         className={`relative inline-flex ${readOnly ? "cursor-default" : "cursor-pointer"} text-left`}
         ref={ratingContainerRef}
      >
         {[...new Array(totalStars)].map((_, index) => {
            const activeState = isHovered ? hoverActiveStar : rating

            const showEmptyIcon = activeState === -1 || activeState < index + 1

            const isActiveRating = activeState !== 1
            const isRatingWithPrecision = activeState % 1 !== 0
            const isRatingEqualToIndex = Math.ceil(activeState) === index + 1
            const showRatingWithPrecision =
               isActiveRating && isRatingWithPrecision && isRatingEqualToIndex

            return (
               <div
                  className={`relative ${readOnly ? "cursor-default" : "cursor-pointer"}`}
                  key={index}
               >
                  <div
                     style={{
                        width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : "0%",
                     }}
                     className="absolute overflow-hidden"
                  >
                     <FaStar color="#fdd835" size={size} />
                  </div>

                  <div>
                     {showEmptyIcon ? (
                        <FaRegStar color="#fdd835" size={size} />
                     ) : (
                        <FaStar color="#fdd835" size={size} />
                     )}
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default RatingStars
