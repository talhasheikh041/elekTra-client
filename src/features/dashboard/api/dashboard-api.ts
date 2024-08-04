import {
   BarResponseType,
   LineResponseType,
   PieResponseType,
   StatsResponseType,
} from "@/types/api-types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const dashboardApi = createApi({
   reducerPath: "dashboardApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api/v1/dashboard/`,
   }),
   endpoints: (builder) => ({
      stats: builder.query<StatsResponseType, string>({
         query: (id) => `stats?id=${id}`,
         keepUnusedDataFor: 0,
      }),
      pieChart: builder.query<PieResponseType, string>({
         query: (id) => `pie?id=${id}`,
         keepUnusedDataFor: 0,
      }),
      lineChart: builder.query<LineResponseType, string>({
         query: (id) => `line?id=${id}`,
         keepUnusedDataFor: 0,
      }),
      barChart: builder.query<BarResponseType, string>({
         query: (id) => `bar?id=${id}`,
         keepUnusedDataFor: 0,
      }),
   }),
})

export const { useStatsQuery, usePieChartQuery, useLineChartQuery, useBarChartQuery } = dashboardApi
