import { selectUser } from "@/features/customers/reducer/user-reducer"
import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
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
import { Skeleton } from "@/features/global-components/ui/skeleton"
import NewCoupon from "@/features/transactions/forms/New-Coupon"
import { couponColumns } from "@/features/transactions/table/Coupon-Columns"
import { useAppSelector } from "@/redux/store"
import { AllCouponsResponseType, MessageResponseType } from "@/types/api-types"
import { CouponType } from "@/types/types"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { toast } from "sonner"

const Coupons = () => {
   const { user } = useAppSelector(selectUser)

   const [coupons, setCoupons] = useState<CouponType[]>([])
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState("")
   const [revalidate, setRevalidate] = useState(false)

   useEffect(() => {
      ;(async () => {
         setIsLoading(true)
         try {
            const res = await axios.get<AllCouponsResponseType>(
               `${import.meta.env.VITE_SERVER_LINK}/api/v1/payment/coupon/all?id=${user?._id}`,
            )
            setCoupons(res.data.allCoupons)
         } catch (error) {
            setError((error as AxiosError<MessageResponseType>).response?.data.message!)
            setCoupons([])
         } finally {
            setIsLoading(false)
         }
      })()
   }, [revalidate])

   const deleteCouponHandler = async (couponId: string) => {
      try {
         const res = await axios.delete<MessageResponseType>(
            `${import.meta.env.VITE_SERVER_LINK}/api/v1/payment/coupon/${couponId}?id=${user?._id}`,
         )

         toast.success(res.data.message)
         setRevalidate((prev) => !prev)
      } catch (error) {
         toast.error((error as AxiosError<MessageResponseType>).response?.data.message!)
         setError((error as AxiosError<MessageResponseType>).response?.data.message!)
      } finally {
         setIsLoading(false)
      }
   }

   const transformedCoupons =
      coupons.length > 0
         ? coupons.map((coupon) => ({
              coupon: coupon.coupon,
              discount: coupon.discount,
              action: (
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button
                          size={"icon"}
                          variant={"destructive"}
                          className="size-8 cursor-pointer"
                       >
                          <FaTrash className="size-4" />
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
                          <AlertDialogAction
                             onClick={() => deleteCouponHandler(coupon._id)}
                             asChild
                          >
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
              ),
           }))
         : null

   return (
      <Card>
         <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-light uppercase tracking-widest">Coupons</CardTitle>
            <NewCoupon setRevalidate={setRevalidate} />
         </CardHeader>
         <CardContent>
            {isLoading ? (
               <SkeletonWrapper className="space-y-3" quantity={8}>
                  <Skeleton className="h-16 w-full" />
               </SkeletonWrapper>
            ) : transformedCoupons ? (
               <DataTable columns={couponColumns} data={transformedCoupons!} isPagination={true} />
            ) : (
               <p className="text-center">{error}</p>
            )}
         </CardContent>
      </Card>
   )
}
export default Coupons
