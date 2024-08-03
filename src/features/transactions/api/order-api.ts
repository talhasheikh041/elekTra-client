import {
   AllOrdersResponseType,
   DeleteOrderRequest,
   MessageResponseType,
   NewOrderRequest,
   UpdateOrderRequest,
} from "@/types/api-types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orderApi = createApi({
   reducerPath: "orderApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api/v1/order/`,
   }),
   tagTypes: ["Order"],
   endpoints: (builder) => ({
      newOrder: builder.mutation<MessageResponseType, NewOrderRequest>({
         query: (order) => ({
            url: "new",
            method: "POST",
            body: order,
         }),
         invalidatesTags: ["Order"],
      }),

      updateOrder: builder.mutation<MessageResponseType, UpdateOrderRequest>({
         query: ({ orderId, userId, status }) => ({
            url: `${orderId}?id=${userId}&status=${status}`,
            method: "PUT",
         }),
         invalidatesTags: ["Order"],
      }),

      deleteOrder: builder.mutation<MessageResponseType, DeleteOrderRequest>({
         query: ({ orderId, userId }) => ({
            url: `${orderId}?id=${userId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Order"],
      }),

      allOrders: builder.query<AllOrdersResponseType, string>({
         query: (id) => ({
            url: `all?id=${id}`,
            method: "GET",
         }),
         providesTags: ["Order"],
      }),

      myOrders: builder.query<AllOrdersResponseType, string>({
         query: (id) => ({
            url: `my?id=${id}`,
            method: "GET",
         }),
         providesTags: ["Order"],
      }),
   }),
})

export const {
   useAllOrdersQuery,
   useDeleteOrderMutation,
   useMyOrdersQuery,
   useUpdateOrderMutation,
   useNewOrderMutation,
} = orderApi
