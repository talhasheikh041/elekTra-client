import { currencyFormatter } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"

const CartBill = () => {
   let { discount, shippingCharges, subtotal, tax, total } = useAppSelector(
      (state) => state.cartReducer,
   )

   const formattedDiscount = currencyFormatter(discount)
   const formattedShippingCharges = currencyFormatter(shippingCharges)
   const formattedSubtotal = currencyFormatter(subtotal)
   const formattedTax = currencyFormatter(tax)
   const formattedTotal = currencyFormatter(total)

   return (
      <>
         <div className="flex items-center justify-center gap-6 rounded-md border bg-secondary p-4">
            <p>Subtotal</p>
            <strong>{formattedSubtotal}</strong>
         </div>

         <div className="flex items-center justify-center gap-6 rounded-md border bg-secondary p-4">
            <p>Discount</p>
            <strong>{formattedDiscount}</strong>
         </div>

         <div className="flex items-center justify-center gap-6 rounded-md border bg-secondary p-4">
            <p>Delivery</p>
            <strong>{formattedShippingCharges}</strong>
         </div>

         <div className="flex items-center justify-center gap-6 rounded-md border bg-secondary p-4">
            <p>Tax</p>
            <strong>{formattedTax}</strong>
         </div>

         <div className="flex items-center justify-center gap-6 rounded-md border border-primary p-4 sm:col-span-2 md:col-span-1">
            <p>Total</p>
            <strong>{formattedTotal}</strong>
         </div>
      </>
   )
}
export default CartBill
