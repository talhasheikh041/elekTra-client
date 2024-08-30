import LoginForm from "@/features/auth/forms/Login-Form"
import { selectUser } from "@/features/customers/reducer/user-reducer"
import { useAppSelector } from "@/redux/store"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Login = () => {
   const { user } = useAppSelector(selectUser)
   const location = useLocation()
   const navigate = useNavigate()

   useEffect(() => {
      if (user) {
         navigate(location.state?.from || "/")
      }
   }, [user])

   return (
      <div className="container">
         <h1 className="mt-10 flex justify-center text-5xl font-light uppercase tracking-widest">
            Login
         </h1>

         <div className="mt-8 flex justify-center w-full">
            <LoginForm />
         </div>
      </div>
   )
}
export default Login
