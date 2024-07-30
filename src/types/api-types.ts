import { ProductType, UserType } from "@/types/types"

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
