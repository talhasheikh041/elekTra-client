import { MessageResponseType } from "@/types/api-types"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

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
