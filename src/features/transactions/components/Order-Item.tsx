import { OrderItemType } from "@/types/types"
import { Link } from "react-router-dom"

const OrderItem = ({ name, photo, _id, price, quantity }: OrderItemType) => {
   return (
      <div className="mb-3 flex items-center gap-4">
         <div>
            <img
               className="size-8 rounded-lg object-contain"
               src={`${import.meta.env.VITE_SERVER_LINK}/uploads/${photo}`}
               alt={name}
            />
         </div>
         <Link className="text-xs underline hover:text-primary" to={`/product/${_id}`}>
            {name}
         </Link>
         <span className="ms-auto text-xs">
            ${price} X {quantity} = ${price * quantity}
         </span>
      </div>
   )
}
export default OrderItem
