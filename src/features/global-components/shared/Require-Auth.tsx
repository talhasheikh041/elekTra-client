import { selectUser } from "@/features/customers/reducer/user-reducer"
import BounceLoader from "@/features/global-components/shared/Bounce-Loader"
import { useAppSelector } from "@/redux/store"
import { Navigate, Outlet } from "react-router-dom"

const RequireAuth = ({ isAdmin }: { isAdmin: boolean }) => {
   const { user, loading } = useAppSelector(selectUser)

   if (loading) return <BounceLoader />

   if (!user) return <Navigate to={"/login"} />

   if (isAdmin && user.role !== "admin") return <Navigate to={"/"} />

   return <Outlet />
}
export default RequireAuth
