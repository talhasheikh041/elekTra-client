import { userApi } from "@/features/customers/api/user-api"
import { MessageResponseType } from "@/types/api-types"
import { UserType } from "@/types/types"

const authApi = userApi.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation<MessageResponseType, UserType>({
         query: (user) => ({
            url: "new",
            method: "POST",
            body: user,
         }),
      }),
   }),
})

export const { useLoginMutation } = authApi
