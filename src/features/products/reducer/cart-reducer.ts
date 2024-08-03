import { CartReducerInitialStateType } from "@/types/reducer-types"
import { CartItemType, ShippingInfoType } from "@/types/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: CartReducerInitialStateType = {
   loading: false,
   cartItems: [],
   subtotal: 0,
   tax: 0,
   shippingCharges: 0,
   discount: 0,
   total: 0,
   shippingInfo: {
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
   },
}

export const cartReducer = createSlice({
   name: "cardReducer",
   initialState,
   reducers: {
      addToCart: (state, action: PayloadAction<CartItemType>) => {
         state.loading = true
         const index = state.cartItems.findIndex(
            (item) => item.productId === action.payload.productId,
         )

         if (index !== -1) {
            state.cartItems[index] = action.payload
         } else {
            state.cartItems.push(action.payload)
         }

         state.loading = false
      },

      removeCartItem: (state, action: PayloadAction<string>) => {
         state.loading = true

         state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload)

         state.loading = false
      },

      calculateBill: (state) => {
         const subtotal = state.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
         )

         state.subtotal = subtotal
         state.shippingCharges = subtotal > 3000 ? 0 : 300
         state.tax = Math.round(subtotal * 0.18)
         state.total = state.subtotal + state.shippingCharges + state.tax - state.discount
      },

      applyDiscount: (state, action: PayloadAction<number>) => {
         state.discount = action.payload
         cartReducer.caseReducers.calculateBill(state)
      },

      saveShippingInfo: (state, action: PayloadAction<ShippingInfoType>) => {
         state.shippingInfo = action.payload
      },
      resetCart: () => initialState,
   },
})

export const {
   addToCart,
   calculateBill,
   removeCartItem,
   applyDiscount,
   saveShippingInfo,
   resetCart,
} = cartReducer.actions
