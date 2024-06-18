const RadialProgress = ({ progress, color }: { progress: number; color: string }) => {
   const circumference = ((2 * 22) / 7) * 25

   return (
      <div className="flex items-center justify-center">
         <svg className="h-20 w-20 -rotate-90 transform">
            <circle
               cx="40"
               cy="40"
               r="25"
               stroke="currentColor"
               strokeWidth="6"
               fill="transparent"
               className="text-secondary"
            />
            <circle
               cx="40"
               cy="40"
               r="25"
               stroke="currentColor"
               strokeWidth="6"
               fill="transparent"
               strokeDasharray={circumference}
               strokeDashoffset={circumference - (progress / 100) * circumference}
               className={progress > 0 ? color : "text-red-500"}
            />
         </svg>
         <span className={`absolute text-sm font-normal ${progress > 0 ? color : "text-red-500"}`}>{progress}%</span>
      </div>
   )
}
export default RadialProgress
