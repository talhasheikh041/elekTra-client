import { CartItemType, ShippingInfoType, UserType } from "@/types/types"

export type UserReducerInitialStateType = {
   user: UserType | null
   loading: boolean
}

export type CartReducerInitialStateType = {
   loading: boolean
   cartItems: CartItemType[]
   subtotal: number
   tax: number
   shippingCharges: number
   discount: number
   total: number
   shippingInfo: ShippingInfoType
}
