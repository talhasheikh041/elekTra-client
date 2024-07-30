import {
   AllProductsResponseType,
   CategoriesResponseType,
   SearchProductsRequestType,
   SearchProductsResponseType,
} from "@/types/api-types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
   reducerPath: "productApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api/v1/product/`,
   }),
   endpoints: (builder) => ({
      latestProdcuts: builder.query<AllProductsResponseType, null>({
         query: () => "latest",
      }),
      allProdcucts: builder.query<AllProductsResponseType, string>({
         query: (id) => ({
            url: "admin-products",
            params: { id },
         }),
      }),
      categories: builder.query<CategoriesResponseType, null>({
         query: () => "categories",
      }),
      searchProducts: builder.query<SearchProductsResponseType, SearchProductsRequestType>({
         query: ({ category, page, price, search, sort }) => {
            let base = `all?search=${search}&page=${page}`

            if (price) base += `&price=${price}`
            if (sort) base += `&sort=${sort}`
            if (category) base += `&category=${category}`

            return base
         },
      }),
   }),
})

export const {
   useLatestProdcutsQuery,
   useAllProdcuctsQuery,
   useCategoriesQuery,
   useLazySearchProductsQuery,
} = productApi
