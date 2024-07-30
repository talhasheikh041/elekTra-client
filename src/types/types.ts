export type OrderItemType = {
   name: string
   photo: string
   price: number
   quantity: number
   _id: string
}

export type OrderType = {
   name: string
   address: string
   city: string
   country: string
   state: string
   pinCode: number
   status: "Processing" | "Shipped" | "Delivered"
   subtotal: number
   discount: number
   shippingCharges: number
   tax: number
   total: number
   orderItems: OrderItemType[]
   _id: string
}

export type UserType = {
   name: string
   email: string
   gender: string
   role?: string
   photo: string
   dob: string
   _id: string
}

export type ProductType = {
   name: string
   price: number
   stock: number
   category: string
   photo: string
   _id: string
}
