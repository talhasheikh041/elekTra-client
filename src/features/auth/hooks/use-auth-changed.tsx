import { userApi } from "@/features/customers/api/user-api"
import { userExist, userNotExist } from "@/features/customers/reducer/user-reducer"
import { auth } from "@/firebase"
import { useAppDispatch } from "@/redux/store"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"

const useAuthChanged = () => {
   const [trigger] = userApi.useLazyGetUserQuery()
   const dispatch = useAppDispatch()

   useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
         try {
            if (user) {
               const data = await trigger(user.uid).unwrap()
               dispatch(userExist(data.user))
            } else {
               dispatch(userNotExist())
            }
         } catch (error) {
            console.log(error)
         }
      })
   }, [])
}
export default useAuthChanged
