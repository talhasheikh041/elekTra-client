import MyTooltip from "@/features/global-components/shared/My-Tooltip"
import { buttonVariants } from "@/features/global-components/ui/button"
import { addToCart } from "@/features/products/reducer/cart-reducer"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/redux/store"
import { BiCartAdd } from "react-icons/bi"
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
            photo: photoURL,
            price,
            productId,
            stock,
            quantity: 1,
         }),
      )

      toast.success("Added to cart")
   }

   return (
      <div className="relative flex min-h-72 w-80 flex-none cursor-pointer snap-start snap-always flex-col items-center justify-center rounded-lg bg-secondary p-3">
         <div>
            <img src={photoURL} className="h-60 rounded-lg object-contain" alt="product" />
         </div>
         <p className="mt-4 text-sm">{name}</p>
         <p className="mt-1 font-medium">{formattedPrice}</p>

         <div className="absolute grid h-full w-full place-items-center rounded-lg bg-secondary/35 opacity-0 hover:opacity-100">
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
         </div>
      </div>
   )
}
export default ProductCard
