const BounceLoader = () => {
   return (
      <div className="flex items-center justify-center space-x-2 h-screen">
         <div className="h-5 w-5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></div>
         <div className="h-5 w-5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.13s]"></div>
         <div className="h-5 w-5 animate-bounce rounded-full bg-blue-500"></div>
      </div>
   )
}
export default BounceLoader
