import { Button } from "@/features/global-components/ui/button"
import { TableCell, TableRow } from "@/features/global-components/ui/table"
import { addToCart, removeCartItem } from "@/features/products/reducer/cart-reducer"
import { useAppDispatch } from "@/redux/store"
import { Minus, Plus } from "lucide-react"
import { FaTrash } from "react-icons/fa"
import { toast } from "sonner"

type CartItemProps = {
   name: string
   photo: string
   quantity: number
   price: number
   productId: string
   stock: number
}

const CartItem = ({ name, photo, price, productId, quantity, stock }: CartItemProps) => {
   const dispatch = useAppDispatch()

   const removeItemHandler = () => {
      dispatch(removeCartItem(productId))
   }

   const incrementHandler = () => {
      if (quantity >= stock) return toast.error("Maximum quantity reached")
      dispatch(
         addToCart({
            name,
            photo,
            price,
            productId,
            quantity: quantity + 1,
            stock,
         }),
      )
   }

   const decrementHandler = () => {
      if (quantity <= 1) return toast.error("Minimum quantity reached")
      dispatch(
         addToCart({
            name,
            photo,
            price,
            productId,
            quantity: quantity - 1,
            stock,
         }),
      )
   }

   return (
      <TableRow>
         <TableCell>
            <div className="flex items-center gap-4">
               <div className="w-11">
                  <img className="h-12 w-12 rounded-md object-contain" src={photo} alt="" />
               </div>
               <p>{name}</p>
            </div>
         </TableCell>
         <TableCell>
            <div className="flex items-center gap-2">
               <Button
                  onClick={decrementHandler}
                  variant="outline"
                  className="flex size-8 cursor-pointer items-center justify-center text-lg"
                  size="icon"
                  disabled={quantity <= 1}
               >
                  <Minus size={"20px"} />
               </Button>
               <p>{quantity}</p>
               <Button
                  onClick={incrementHandler}
                  variant="outline"
                  className="flex size-8 cursor-pointer items-center justify-center text-lg"
                  size="icon"
                  disabled={quantity >= stock}
               >
                  <Plus size={"20px"} />
               </Button>
            </div>
         </TableCell>
         <TableCell>{price}</TableCell>
         <TableCell className="text-right">
            <Button
               onClick={removeItemHandler}
               className="size-8"
               size="icon"
               variant="destructive"
            >
               <FaTrash />
            </Button>
         </TableCell>
      </TableRow>
   )
}
export default CartItem
