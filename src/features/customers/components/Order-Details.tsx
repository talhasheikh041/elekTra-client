import { Badge } from "@/features/global-components/ui/badge"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/features/global-components/ui/dialog"
import OrderItem from "@/features/transactions/components/Order-Item"
import { OrderType } from "@/types/types"

const OrderDetails = ({ order }: { order: OrderType }) => {
   const {
      discount,
      orderItems,
      shippingCharges,
      shippingInfo: { address, city, country, pinCode, state },
      status,
      subtotal,
      tax,
      total,
      user: { name },
   } = order

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Badge className="cursor-pointer">Details</Badge>
         </DialogTrigger>
         <DialogContent className="max-h-screen max-w-4xl gap-10 overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="mx-auto text-2xl font-light uppercase tracking-widest">
                  Order Details
               </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-12">
               <section className="flex-1">
                  <h2 className="mx-auto mb-2 w-fit text-lg font-light uppercase tracking-widest">
                     Order Items
                  </h2>

                  {orderItems.map((i) => (
                     <OrderItem
                        name={i.name}
                        photo={i.photo}
                        _id={i._id}
                        quantity={i.quantity}
                        price={i.price}
                        key={i._id}
                        productId={i.productId}
                     />
                  ))}
               </section>

               <article className="flex-1 rounded-lg bg-secondary px-4 py-2">
                  <h1 className="mx-auto mb-2 w-fit text-lg font-light uppercase tracking-widest">
                     Order Info
                  </h1>
                  <h5 className="font-semibold">User Info</h5>
                  <p className="text-sm">Name: {name}</p>
                  <p className="text-sm">
                     Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
                  </p>

                  <h5 className="mt-4 font-semibold">Amount Info</h5>
                  <p className="text-sm">Subtotal: {subtotal}</p>
                  <p className="text-sm">Shipping Charges: {shippingCharges}</p>
                  <p className="text-sm">Tax: {tax}</p>
                  <p className="text-sm">Discount: {discount}</p>
                  <p className="text-sm">Total: {total}</p>

                  <div className="mt-4 flex items-center gap-2">
                     <h5 className="font-bold">Status</h5>
                     <div className="text-sm">
                        {status === "Delivered" ? (
                           <Badge className="cursor-default bg-purple-500 hover:bg-purple-500">
                              {status}
                           </Badge>
                        ) : status === "Shipped" ? (
                           <Badge className="cursor-default bg-green-500 hover:bg-green-500">
                              {status}
                           </Badge>
                        ) : (
                           <Badge className="cursor-default bg-red-500 hover:bg-red-500">
                              {status}
                           </Badge>
                        )}
                     </div>
                  </div>
               </article>
            </div>
         </DialogContent>
      </Dialog>
   )
}
export default OrderDetails
