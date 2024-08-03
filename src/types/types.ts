export type UserType = {
   name: string
   email: string
   gender: string
   role: string
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

export type ShippingInfoType = {
   address: string
   city: string
   state: string
   country: string
   pinCode: string
}

export type CartItemType = {
   productId: string
   photo: string
   name: string
   price: number
   quantity: number
   stock: number
}

export type OrderItemType = Omit<CartItemType, "stock"> & { _id: string }

export type OrderType = {
   orderItems: OrderItemType[]
   shippingInfo: ShippingInfoType
   subtotal: number
   tax: number
   shippingCharges: number
   discount: number
   total: number
   status: string
   user: {
      name: string
      _id: string
   }
   _id: string
}
