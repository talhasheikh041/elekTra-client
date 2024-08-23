import {
   BarType,
   CartItemType,
   CouponType,
   LineType,
   OrderType,
   PieType,
   ProductType,
   ReviewType,
   ShippingInfoType,
   StatsType,
   UserType,
} from "@/types/types"

export type CustomErrorType = {
   status: number
   data: {
      success: boolean
      message: string
   }
}

export type MessageResponseType = {
   success: boolean
   message: string
}

export type UserResponseType = {
   success: true
   user: UserType
}

export type AllProductsResponseType = {
   success: true
   products: ProductType[]
}

export type CategoriesResponseType = {
   success: true
   categories: string[]
}

export type SingleProductResponseType = {
   success: true
   product: ProductType
}

export type AllReviewsProductResponse = {
   success: true
   reviews: ReviewType[]
}

export type NewReviewRequestType = {
   rating: number
   comment: string
   userId?: string
   productId: string
}

export type DeleteReviewRequestType = {
   reviewId: string
   userId?: string
}

export type SearchProductsResponseType = AllProductsResponseType & {
   totalPages: number
}

export type SearchProductsRequestType = {
   search: string
   price: number
   category: string
   sort: string
   page: number
}

export type NewProductRequestType = {
   id: string
   formData: FormData
}

export type UpdateProductRequestType = {
   userId: string
   productId: string
   formData: FormData
}

export type DeleteProductRequestType = {
   userId: string
   productId: string
}

export type AllOrdersResponseType = {
   success: boolean
   orders: OrderType[]
   totalOrders: number
}

export type OrderDetailsResponseType = {
   success: boolean
   order: OrderType
}

export type NewOrderRequestType = {
   shippingInfo: ShippingInfoType
   orderItems: CartItemType[]
   subtotal: number
   tax: number
   shippingCharges: number
   discount: number
   total: number
   user: string
}

export type UpdateOrderRequestType = {
   userId: string
   orderId: string
   status: string
}

export type DeleteOrderRequestType = {
   userId: string
   orderId: string
}

export type AllUsersResponseType = {
   success: true
   users: UserType[]
}

export type AllCouponsResponseType = {
   success: true
   allCoupons: CouponType[]
}

export type DeleteUserRequestType = {
   userId: string
   adminUserId: string
}

export type StatsResponseType = {
   success: true
   stats: StatsType
}

export type PieResponseType = {
   success: true
   pieCarts: PieType
}

export type BarResponseType = {
   success: true
   barCarts: BarType
}

export type LineResponseType = {
   success: true
   lineCarts: LineType
}
