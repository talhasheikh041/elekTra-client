import { Badge } from "@/features/components/ui/badge"
import { Button, buttonVariants } from "@/features/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/features/components/ui/dialog"
import OrderItem from "@/features/transactions/Order-Item"
import { cn } from "@/lib/utils"
import { OrderItemType, OrderType } from "@/types"
import { useState } from "react"

const img =
   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804"

const orderItems: OrderItemType[] = [
   {
      name: "Puma Shoes",
      photo: img,
      _id: "1",
      quantity: 4,
      price: 2000,
   },
   {
      name: "Puma Shoes",
      photo: img,
      _id: "2",
      quantity: 4,
      price: 2000,
   },
   {
      name: "Puma Shoes",
      photo: img,
      _id: "3",
      quantity: 4,
      price: 2000,
   },
   {
      name: "Puma Shoes",
      photo: img,
      _id: "4",
      quantity: 4,
      price: 2000,
   },
]

const EditTransaction = () => {
   const [order, setOrder] = useState<OrderType>({
      name: "Abhishek Singh",
      address: "77 Black Street",
      city: "Neyword",
      state: "Nevada",
      country: "India",
      pinCode: 2434341,
      status: "Processing",
      subtotal: 4000,
      discount: 1200,
      shippingCharges: 0,
      tax: 200,
      total: 4000 + 200 + 0 - 1200,
      orderItems,
      _id: "asdnasjdhbn",
   })

   const {
      name,
      address,
      city,
      country,
      state,
      pinCode,
      subtotal,
      shippingCharges,
      tax,
      discount,
      total,
      status,
   } = order

   const statusHandler = () => {
      setOrder((prev) => ({
         ...prev,
         status: prev.status === "Processing" ? "Shipped" : "Delivered",
      }))
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <span
               className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-5 cursor-pointer rounded-full px-3",
               )}
            >
               Manage
            </span>
         </DialogTrigger>
         <DialogContent className="max-h-screen max-w-4xl gap-10 overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="mx-auto text-2xl font-light uppercase tracking-widest">
                  Edit Transaction
               </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-12">
               <section className="flex-1">
                  <h2 className="mx-auto mb-2 w-fit text-lg font-light uppercase tracking-widest">
                     Order Items
                  </h2>

                  {order.orderItems.map((i) => (
                     <OrderItem
                        name={i.name}
                        photo={i.photo}
                        _id={i._id}
                        quantity={i.quantity}
                        price={i.price}
                        key={i._id}
                     />
                  ))}
               </section>

               <article className="flex-1 rounded-lg bg-secondary px-4 py-2">
                  <h1 className="mx-auto mb-2 w-fit text-lg font-light uppercase tracking-widest">
                     Order Info
                  </h1>
                  <h5 className="font-semibold">User Info</h5>
                  <p>Name: {name}</p>
                  <p>Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}</p>

                  <h5 className="mt-4 font-semibold">Amount Info</h5>
                  <p>Subtotal: {subtotal}</p>
                  <p>Shipping Charges: {shippingCharges}</p>
                  <p>Tax: {tax}</p>
                  <p>Discount: {discount}</p>
                  <p>Total: {total}</p>

                  <h5 className="mt-4 font-bold">Status Info</h5>
                  <div>
                     Status:{" "}
                     {status === "Delivered" ? (
                        <Badge className="bg-purple-500">{status}</Badge>
                     ) : status === "Shipped" ? (
                        <Badge className="bg-green-500">{status}</Badge>
                     ) : (
                        <Badge className="bg-red-500">{status}</Badge>
                     )}
                  </div>

                  <Button className="mx-auto mt-6 block" onClick={statusHandler}>
                     Process Status
                  </Button>
               </article>
            </div>
         </DialogContent>
      </Dialog>
   )
}
export default EditTransaction
