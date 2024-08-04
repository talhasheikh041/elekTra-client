import useAuthChanged from "@/features/auth/hooks/use-auth-changed"
import { Outlet } from "react-router-dom"

const PersistAuth = () => {
   useAuthChanged()

   return <Outlet />
}
export default PersistAuth
