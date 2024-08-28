import { selectUser } from "@/features/customers/reducer/user-reducer"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
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
import { Button } from "@/features/global-components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/global-components/ui/select"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import {
   useDeleteOrderMutation,
   useGetSingleOrderQuery,
   useUpdateOrderMutation,
} from "@/features/transactions/api/order-api"
import OrderItem from "@/features/transactions/components/Order-Item"
import { responseToast } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType, MessageResponseType } from "@/types/api-types"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const TransactionDetails = () => {
   const { user } = useAppSelector(selectUser)
   const params = useParams()

   const {
      data: orderResponse,
      isLoading,
      isError,
      error,
      isSuccess,
   } = useGetSingleOrderQuery({ adminId: user?._id!, orderId: params.id! })

   const order = orderResponse?.order

   let errorMessage: string | null = null
   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   const [status, setStatus] = useState("")

   useEffect(() => {
      if (isSuccess) {
         setStatus(order?.status!)
      }
   }, [isSuccess])

   const [updateOrder] = useUpdateOrderMutation()
   const [deleteOrder] = useDeleteOrderMutation()

   const statusHandler = async (value: string) => {
      try {
         const res = await updateOrder({ orderId: order?._id!, userId: user?._id!, status: value })

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
         const res = await deleteOrder({ userId: user?._id!, orderId: order?._id! })
         responseToast(res)
         // handleOpenChange(false)
      } catch (error) {
         toast.error(error as string)
      }
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">Details</CardTitle>
         </CardHeader>
         <CardContent>
            <>
               {isLoading ? (
                  <SkeletonWrapper className="flex w-full gap-3" quantity={2}>
                     <Skeleton className="h-96 w-full" />
                  </SkeletonWrapper>
               ) : isSuccess && order ? (
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
                                       This action cannot be undone. This will permanently delete
                                       this transaction.
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
                        <p className="text-sm">Name: {order.user.name}</p>
                        <p className="text-sm">
                           Address:{" "}
                           {`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country} ${order.shippingInfo.pinCode}`}
                        </p>

                        <h5 className="mt-4 font-semibold">Amount Info</h5>
                        <p className="text-sm">Subtotal: {order.subtotal}</p>
                        <p className="text-sm">Shipping Charges: {order.shippingCharges}</p>
                        <p className="text-sm">Tax: {order.tax}</p>
                        <p className="text-sm">Discount: {order.discount}</p>
                        <p className="text-sm">Total: {order.total}</p>

                        <h5 className="mt-4 font-bold">Status Info</h5>
                        <div className="text-sm">
                           <Select
                              value={status}
                              defaultValue={status}
                              onValueChange={statusHandler}
                           >
                              <SelectTrigger className="mt-1 w-[150px]">
                                 <SelectValue />
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
               ) : (
                  <p className="grid place-items-center">{errorMessage}</p>
               )}
            </>
         </CardContent>
      </Card>
   )
}
export default TransactionDetails
