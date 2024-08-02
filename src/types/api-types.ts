import { CartItemType, OrderType, ProductType, ShippingInfoType, UserType } from "@/types/types"

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

export type NewOrderRequest = {
   shippingInfo: ShippingInfoType
   orderItems: CartItemType[]
   subtotal: number
   tax: number
   shippingCharges: number
   discount: number
   total: number
   user: string
}

export type UpdateOrderRequest = {
   userId: string
   orderId: string
   status: string
}

export type DeleteOrderRequest = {
   userId: string
   orderId: string
}
