import {
   AllUsersResponseType,
   DeleteUserRequestType,
   MessageResponseType,
   UpdateUserRequestType,
   UserResponseType,
} from "@/types/api-types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
   reducerPath: "userApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api/v1/user/`,
   }),
   tagTypes: ["User"],
   endpoints: (builder) => ({
      getUser: builder.query<UserResponseType, string>({
         query: (id) => ({
            url: id,
         }),
         providesTags: ["User"],
      }),

      allUsers: builder.query<AllUsersResponseType, string>({
         query: (id) => `all?id=${id}`,
         providesTags: ["User"],
      }),

      updateUser: builder.mutation<MessageResponseType, UpdateUserRequestType>({
         query: ({ role, userId, adminUserId }) => ({
            url: `${userId}?id=${adminUserId}`,
            method: "PUT",
            body: { role },
         }),
         invalidatesTags: ["User"],
      }),

      deleteUser: builder.mutation<MessageResponseType, DeleteUserRequestType>({
         query: ({ adminUserId, userId }) => ({
            url: `${userId}?id=${adminUserId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["User"],
      }),
   }),
})

export const {
   useLazyGetUserQuery,
   useAllUsersQuery,
   useDeleteUserMutation,
   useUpdateUserMutation,
} = userApi
