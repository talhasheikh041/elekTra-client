import { UserType } from "@/types/types"

export type MessageResponseType = {
   success: boolean
   message: string
}

export type UserResponseType = {
   success: true
   user: UserType
}
