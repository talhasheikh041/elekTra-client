import { userApi } from "@/features/customers/api/user-api"
import { userReducer } from "@/features/customers/reducer/user-reducer"
import { dashboardApi } from "@/features/dashboard/api/dashboard-api"
import { productApi } from "@/features/products/api/product-api"
import { cartReducer } from "@/features/products/reducer/cart-reducer"
import { orderApi } from "@/features/transactions/api/order-api"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
   reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [orderApi.reducerPath]: orderApi.reducer,
      [dashboardApi.reducerPath]: dashboardApi.reducer,
      [userReducer.name]: userReducer.reducer,
      [cartReducer.name]: cartReducer.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
         userApi.middleware,
         productApi.middleware,
         orderApi.middleware,
         dashboardApi.middleware,
      ),
})

export type RootStateType = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
