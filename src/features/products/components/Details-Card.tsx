import { Badge } from "@/features/global-components/ui/badge"
import { Button } from "@/features/global-components/ui/button"
import RatingStars from "@/features/products/components/Rating-Stars"
import { addToCart } from "@/features/products/reducer/cart-reducer"
import { currencyFormatter } from "@/lib/utils"
import { useAppDispatch } from "@/redux/store"
import { ProductType } from "@/types/types"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Minus, Plus, ShoppingBagIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type DetailsCardProps = {
   product: ProductType
}

const DetailsCard = ({ product }: DetailsCardProps) => {
   const { _id, category, name, photos, price, rating, stock, totalReviews, shortDescription } =
      product
   const [quantity, setQuantity] = useState<number>(1)

   const dispatch = useAppDispatch()

   const incrementHandler = () => {
      if (quantity >= stock) return toast.error("Maximum quantity reached")
      setQuantity((prev) => prev + 1)
   }

   const decrementHandler = () => {
      if (quantity <= 1) return toast.error("Minimum quantity reached")
      setQuantity((prev) => prev - 1)
   }

   const addToCartHandler = () => {
      if (stock < 1) return toast.error("Product out of stock")

      dispatch(
         addToCart({
            name,
            photo: photos[0].url,
            price,
            productId: _id,
            stock,
            quantity,
         }),
      )

      toast.success("Added to cart")
   }

   return (
      <div>
         <div>
            <Badge className="cursor-default bg-blue-500 hover:bg-blue-500">{category}</Badge>
         </div>
         <h1 className="mt-2 scroll-m-20 pb-2 text-3xl sm:text-4xl font-light tracking-widest first:mt-0">
            {name}
         </h1>
         <div className="mt-1 flex items-center gap-3">
            <RatingStars rating={rating} readOnly={true} />
            <span className="text-sm font-medium leading-none">
               ({totalReviews} Review{totalReviews === 1 ? "" : "s"})
            </span>
         </div>

         <p className="mt-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {currencyFormatter(price)}
         </p>

         <div className="mt-4">
            <p className="max-w-lg font-extralight leading-7 [&:not(:first-child)]:mt-6">
               {shortDescription}
            </p>
         </div>

         <div className="mt-4 flex items-center gap-2">
            <Button
               onClick={decrementHandler}
               disabled={quantity <= 1}
               variant={"outline"}
               size={"icon"}
            >
               <Minus size={"20px"} />
            </Button>
            <span>{quantity}</span>
            <Button
               onClick={incrementHandler}
               disabled={quantity >= stock}
               variant={"outline"}
               size={"icon"}
            >
               <Plus size={"20px"} />
            </Button>
         </div>

         <div className="mt-4">
            {stock > 0 ? (
               <Button onClick={addToCartHandler} className="space-x-3">
                  <span>
                     <ShoppingBagIcon size={"20px"} />
                  </span>
                  <span>Add to cart</span>
               </Button>
            ) : (
               <Button variant={"outline"} className="space-x-3">
                  <span>
                     <ExclamationTriangleIcon fontSize={"20px"} />
                  </span>
                  <span>Out of Stock</span>
               </Button>
            )}
         </div>
      </div>
   )
}
export default DetailsCard
