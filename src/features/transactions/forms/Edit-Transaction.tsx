import { selectUser } from "@/features/customers/reducer/user-reducer"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/features/global-components/ui/alert-dialog"
import { Badge } from "@/features/global-components/ui/badge"
import { Button } from "@/features/global-components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/features/global-components/ui/dialog"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/global-components/ui/select"
import {
   useDeleteOrderMutation,
   useUpdateOrderMutation,
} from "@/features/transactions/api/order-api"
import OrderItem from "@/features/transactions/components/Order-Item"
import { responseToast } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { MessageResponseType } from "@/types/api-types"
import { OrderType } from "@/types/types"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { toast } from "sonner"

type EditTransactionProps = {
   order: OrderType
}

const EditTransaction = ({ order }: EditTransactionProps) => {
   const [status, setStatus] = useState(order.status)

   const { user } = useAppSelector(selectUser)

   const {
      shippingInfo: { address, city, country, pinCode, state },
      subtotal,
      shippingCharges,
      tax,
      discount,
      total,
      _id: orderId,
      orderItems,
      user: { name },
   } = order

   const [updateOrder] = useUpdateOrderMutation()
   const [deleteOrder] = useDeleteOrderMutation()

   const statusHandler = async (value: string) => {
      try {
         const res = await updateOrder({ orderId, userId: user?._id!, status: value })

         if ("data" in res) {
            toast.success(res.data?.message)
            setStatus(value)
         } else {
            const error = res.error as FetchBaseQueryError
            const messageResponse = error.data as MessageResponseType
            toast.error(messageResponse.message)
         }
      } catch (error) {
         toast.error(error as string)
      }
   }

   const deleteHandler = async () => {
      try {
         const res = await deleteOrder({ userId: user?._id!, orderId })
         responseToast(res)
         // handleOpenChange(false)
      } catch (error) {
         toast.error(error as string)
      }
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Badge className="cursor-pointer">Manage</Badge>
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

               <article className="relative flex-1 rounded-lg bg-secondary px-4 py-2">
                  <div className="absolute right-2 top-2">
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant={"destructive"} size={"icon"}>
                              <FaTrash size={"18px"} />
                           </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                           <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                 This action cannot be undone. This will permanently delete your
                                 product.
                              </AlertDialogDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={deleteHandler} asChild>
                                 <Button
                                    variant={"destructive"}
                                    className="bg-destructive hover:bg-destructive/90"
                                 >
                                    Delete
                                 </Button>
                              </AlertDialogAction>
                           </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog>
                  </div>

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

                  <h5 className="mt-4 font-bold">Status Info</h5>
                  <div className="text-sm">
                     <Select value={status} defaultValue={status} onValueChange={statusHandler}>
                        <SelectTrigger className="mt-1 w-[150px]">
                           <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Processing">Processing</SelectItem>
                           <SelectItem value="Shipped">Shipped</SelectItem>
                           <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </article>
            </div>
         </DialogContent>
      </Dialog>
   )
}
export default EditTransaction
