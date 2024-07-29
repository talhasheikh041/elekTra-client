import { OrderItemType } from "@/types/types"
import { Link } from "react-router-dom"

const OrderItem = ({ name, photo, _id, price, quantity }: OrderItemType) => {
   return (
      <div className="flex items-center gap-4 mb-3">
         <img className="size-10 object-cover rounded-lg" src={photo} alt={name} />
         <Link to={`/product/${_id}`}>{name}</Link>
         <span className="ms-auto">
            ${price} X {quantity} = ${price * quantity}
         </span>
      </div>
   )
}
export default OrderItem
