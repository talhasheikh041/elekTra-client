import MyTooltip from "@/features/global-components/shared/My-Tooltip"
import { buttonVariants } from "@/features/global-components/ui/button"
import { addToCart } from "@/features/products/reducer/cart-reducer"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/redux/store"
import { Eye } from "lucide-react"
import { BiCartAdd } from "react-icons/bi"
import { Link } from "react-router-dom"
import { toast } from "sonner"

type ProductCardProps = {
   name: string
   price: number
   photo: string
   stock: number
   productId: string
}

const ProductCard = ({ name, photo, price, productId, stock }: ProductCardProps) => {
   const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
   }).format(price)

   const photoURL = `${import.meta.env.VITE_SERVER_LINK}/uploads/${photo}`

   const dispatch = useAppDispatch()

   const addToCartHandler = () => {
      if (stock < 1) return toast.error("Product out of stock")

      dispatch(
         addToCart({
            name,
            photo,
            price,
            productId,
            stock,
            quantity: 1,
         }),
      )

      toast.success("Added to cart")
   }

   return (
      <div className="relative flex min-h-72 flex-none cursor-pointer flex-col items-center justify-center rounded-lg bg-secondary p-3">
         <div>
            <img src={photoURL} className="h-60 rounded-lg object-contain" alt="product" />
         </div>
         <p className="mt-4 text-sm">{name}</p>
         <p className="mt-1 font-medium">{formattedPrice}</p>

         <div className="absolute flex h-full w-full items-center justify-center gap-2 rounded-lg bg-secondary/35 opacity-0 hover:opacity-100">
            <MyTooltip title="Add to Cart">
               <span
                  onClick={addToCartHandler}
                  className={cn(
                     buttonVariants({ variant: "default" }),
                     "m-0 size-12 rounded-full p-0",
                  )}
               >
                  <BiCartAdd size="25px" />
               </span>
            </MyTooltip>

            <MyTooltip title="Details">
               <Link to={`/product/${productId}`}>
                  <span
                     className={cn(
                        buttonVariants({ variant: "default" }),
                        "m-0 size-12 rounded-full p-0",
                     )}
                  >
                     <Eye size="25px" />
                  </span>
               </Link>
            </MyTooltip>
         </div>
      </div>
   )
}
export default ProductCard
