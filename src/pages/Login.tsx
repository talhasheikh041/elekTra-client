import LoginForm from "@/features/auth/Login-Form"

const Login = () => {
   return (
      <div>
         <h1 className="mt-10 flex justify-center text-5xl font-light uppercase tracking-widest">
            Login
         </h1>

         <div className="flex justify-center mt-8">
            <LoginForm />
         </div>
      </div>
   )
}
export default Login
