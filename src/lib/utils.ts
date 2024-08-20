import { MessageResponseType } from "@/types/api-types"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import moment from "moment"

type ResType =
   | {
        data: MessageResponseType
     }
   | {
        error: FetchBaseQueryError | SerializedError
     }

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export const responseToast = (res: ResType) => {
   if ("data" in res) {
      toast.success(res.data.message)
   } else {
      const error = res.error as FetchBaseQueryError
      const messageResponse = error.data as MessageResponseType
      toast.error(messageResponse.message)
   }
}

export const areObjectsEqual = (obj1: Object, obj2: Object) => {
   // Check if both arguments are the same reference
   if (obj1 === obj2) {
      return true
   }

   // Check if either argument is null or not an object
   if (obj1 == null || typeof obj1 !== "object" || obj2 == null || typeof obj2 !== "object") {
      return false
   }

   // Get the keys of both objects
   const keys1 = Object.keys(obj1)
   const keys2 = Object.keys(obj2)

   // Check if the number of keys is different
   if (keys1.length !== keys2.length) {
      return false
   }

   // Check each key and value recursively
   for (let key of keys1) {
      if (
         !keys2.includes(key) ||
         !areObjectsEqual(obj1[key as keyof Object], obj2[key as keyof Object])
      ) {
         return false
      }
   }

   return true
}

export const getLastMonths = () => {
   const currentDate = moment()
   currentDate.date(1)

   const lastSixMonths: string[] = []
   const lastTwelveMonths: string[] = []

   for (let i = 0; i < 6; i++) {
      const monthDate = currentDate.clone().subtract(i, "months")
      const monthName = monthDate.format("MMMM")
      lastSixMonths.unshift(monthName)
   }

   for (let i = 0; i < 12; i++) {
      const monthDate = currentDate.clone().subtract(i, "months")
      const monthName = monthDate.format("MMMM")
      lastTwelveMonths.unshift(monthName)
   }

   return {
      lastSixMonths,
      lastTwelveMonths,
   }
}

export const currencyFormatter = (currency: number) => {
   return new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
   }).format(currency)
}

export const generatePageNumbers = (currentPage: number, totalPages: number) => {
   const pageNumbers = []
   const maxVisiblePages = 3 // Number of visible page links

   let startPage = Math.max(currentPage - 1, 1)
   let endPage = Math.min(currentPage + 1, totalPages)

   if (currentPage === 1) {
      endPage = Math.min(currentPage + (maxVisiblePages - 1), totalPages)
   } else if (currentPage === totalPages) {
      startPage = Math.max(currentPage - (maxVisiblePages - 1), 1)
   }

   for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
   }

   return pageNumbers
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
   let timeoutId: NodeJS.Timeout
   const debounced = (...args: Parameters<T>) => {
      if (timeoutId) {
         clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
         func(...args)
      }, delay)
   }

   debounced.cancel = () => {
      if (timeoutId) {
         clearTimeout(timeoutId)
      }
   }

   return debounced
}
