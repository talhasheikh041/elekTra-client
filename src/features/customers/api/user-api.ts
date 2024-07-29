import { UserResponseType } from "@/types/api-types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
   reducerPath: "userApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api/v1/user/`,
   }),
   endpoints: (builder) => ({
      getUser: builder.query<UserResponseType, string>({
         query: (id) => ({
            url: id,
         }),
      }),
   }),
})

export const { useGetUserQuery } = userApi
