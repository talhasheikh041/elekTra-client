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
   photos: {
      public_id: string
      url: string
   }[]
   shortDescription: string
   detail: string
   rating: number
   totalReviews: number
   _id: string
}

export type CouponType = {
   _id: string
   coupon: string
   discount: number
}

export type ReviewType = {
   _id: string
   product: string
   user: {
      _id: string
      name: string
      photo: string
   }
   rating: number
   comment: string
   updatedAt?: Date
   createdAt?: Date
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

export type StatsType = {
   percentage: {
      products: number
      orders: number
      users: number
      revenue: number
   }
   count: {
      product: number
      orders: number
      users: number
      totalRevenue: number
   }
   barChart: {
      order: number[]
      revenue: number[]
   }
   categories: {
      band: number
      phone: number
   }
   userRatio: {
      male: number
      female: number
   }
   latestTransactions: {
      _id: string
      discount: number
      status: string
      quantity: number
      user: {
         _id: string
         name: string
      }
      amount: number
   }[]
}

export type PieType = {
   orderFulfillmentRatio: {
      processing: number
      shipped: number
      delivered: number
   }
   productCategoriesRatio: {
      band: number
      phone: number
   }
   stockAvailability: {
      inStock: number
      outOfStock: number
   }
   revenueDistribution: {
      marketingCost: number
      discount: number
      burnt: number
      productionCost: number
      netMargin: number
   }
   userAgeGroup: {
      teen: number
      adult: number
      old: number
   }
   userCount: {
      admin: number
      customer: number
   }
}

export type BarType = {
   products: number[]
   users: number[]
   orders: number[]
}

export type LineType = {
   users: number[]
   products: number[]
   discount: number[]
   revenue: number[]
}
