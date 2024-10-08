import {
   AllProductsResponseType,
   AllReviewsProductResponse,
   CategoriesResponseType,
   DeleteProductRequestType,
   DeleteReviewRequestType,
   MessageResponseType,
   NewProductRequestType,
   NewReviewRequestType,
   SearchProductsRequestType,
   SearchProductsResponseType,
   SingleProductResponseType,
   UpdateProductRequestType,
} from "@/types/api-types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
   reducerPath: "productApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api/v1/product/`,
   }),
   tagTypes: ["product"],

   endpoints: (builder) => ({
      latestProdcuts: builder.query<AllProductsResponseType, null>({
         query: () => "latest",
         providesTags: ["product"],
      }),
      allProdcucts: builder.query<AllProductsResponseType, string>({
         query: (id) => ({
            url: "admin-products",
            params: { id },
         }),
         providesTags: ["product"],
      }),
      categories: builder.query<CategoriesResponseType, null>({
         query: () => "categories",
         providesTags: ["product"],
      }),
      searchProducts: builder.query<SearchProductsResponseType, SearchProductsRequestType>({
         query: ({ category, page, price, search, sort }) => {
            let base = `all?search=${search}&page=${page}`

            if (price) base += `&price=${price}`
            if (sort) base += `&sort=${sort}`
            if (category) base += `&category=${category}`

            return base
         },
         providesTags: ["product"],
      }),

      newProduct: builder.mutation<MessageResponseType, NewProductRequestType>({
         query: ({ id, formData }) => ({
            url: `new?id=${id}`,
            method: "POST",
            body: formData,
         }),
         invalidatesTags: ["product"],
      }),

      updateProduct: builder.mutation<MessageResponseType, UpdateProductRequestType>({
         query: ({ userId, productId, formData }) => ({
            url: `${productId}?id=${userId}`,
            method: "PUT",
            body: formData,
         }),
         invalidatesTags: ["product"],
      }),

      deleteProduct: builder.mutation<MessageResponseType, DeleteProductRequestType>({
         query: ({ userId, productId }) => ({
            url: `${productId}?id=${userId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["product"],
      }),

      getSingleProduct: builder.query<SingleProductResponseType, string>({
         query: (id) => id,
         providesTags: ["product"],
      }),

      allReviewsOfProduct: builder.query<AllReviewsProductResponse, string>({
         query: (productId) => `review/all/${productId}`,
         providesTags: ["product"],
      }),

      newReview: builder.mutation<MessageResponseType, NewReviewRequestType>({
         query: ({ comment, productId, rating, userId }) => ({
            url: `review/new/${productId}?id=${userId}`,
            body: {
               comment,
               rating,
            },
            method: "POST",
         }),
         invalidatesTags: ["product"],
      }),

      deleteReview: builder.mutation<MessageResponseType, DeleteReviewRequestType>({
         query: ({ reviewId, userId }) => ({
            url: `review/${reviewId}?id=${userId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["product"],
      }),
   }),
})

export const {
   useLatestProdcutsQuery,
   useAllProdcuctsQuery,
   useCategoriesQuery,
   useLazySearchProductsQuery,
   useNewProductMutation,
   useUpdateProductMutation,
   useDeleteProductMutation,
   useGetSingleProductQuery,
   useAllReviewsOfProductQuery,
   useNewReviewMutation,
   useDeleteReviewMutation,
} = productApi
