import {
   AllOrdersResponseType,
   DeleteOrderRequestType,
   MessageResponseType,
   NewOrderRequestType,
   OrderDetailsRequestType,
   OrderDetailsResponseType,
   UpdateOrderRequestType,
} from "@/types/api-types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orderApi = createApi({
   reducerPath: "orderApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api/v1/order/`,
   }),
   tagTypes: ["Order"],
   endpoints: (builder) => ({
      newOrder: builder.mutation<MessageResponseType, NewOrderRequestType>({
         query: (order) => ({
            url: "new",
            method: "POST",
            body: order,
         }),
         invalidatesTags: ["Order"],
      }),

      updateOrder: builder.mutation<MessageResponseType, UpdateOrderRequestType>({
         query: ({ orderId, userId, status }) => ({
            url: `${orderId}?id=${userId}&status=${status}`,
            method: "PUT",
         }),
         invalidatesTags: ["Order"],
      }),

      deleteOrder: builder.mutation<MessageResponseType, DeleteOrderRequestType>({
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

      getSingleOrder: builder.query<OrderDetailsResponseType, OrderDetailsRequestType>({
         query: ({ orderId, adminId }) => ({
            url: `${orderId}?id=${adminId}`,
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
   useGetSingleOrderQuery,
} = orderApi
