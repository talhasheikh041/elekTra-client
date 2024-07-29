import { RootStateType } from "@/redux/store"
import { UserReducerInitialStateType } from "@/types/reducer-types"
import { UserType } from "@/types/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: UserReducerInitialStateType = {
   user: null,
   loading: true,
}

export const userReducer = createSlice({
   name: "userReducer",
   initialState,
   reducers: {
      userExist: (state, action: PayloadAction<UserType>) => {
         state.user = action.payload
         state.loading = false
      },
      userNotExist: (state) => {
         state.user = null
         state.loading = false
      },
   },
})

export const { userExist, userNotExist } = userReducer.actions

export const selectUser = (state: RootStateType) => state.userReducer
