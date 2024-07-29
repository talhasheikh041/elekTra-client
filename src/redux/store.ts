import { userApi } from "@/features/customers/api/user-api"
import { userReducer } from "@/features/customers/reducer/user-reducer"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
   reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [userReducer.name]: userReducer.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})

export type RootStateType = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
