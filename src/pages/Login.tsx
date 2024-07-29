import LoginForm from "@/features/auth/forms/Login-Form"
import { selectUser } from "@/features/customers/reducer/user-reducer"
import { useAppSelector } from "@/redux/store"
import { Navigate } from "react-router-dom"

const Login = () => {
   const { user } = useAppSelector(selectUser)

   if (user) return <Navigate to={"/"} />

   return (
      <div>
         <h1 className="mt-10 flex justify-center text-5xl font-light uppercase tracking-widest">
            Login
         </h1>

         <div className="mt-8 flex justify-center">
            <LoginForm />
         </div>
      </div>
   )
}
export default Login
