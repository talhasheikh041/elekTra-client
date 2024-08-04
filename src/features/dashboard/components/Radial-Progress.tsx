import { useEffect, useState } from "react"

const RadialProgress = ({ progress, color }: { progress: number; color: string }) => {
   const [offset, setOffset] = useState(0)
   const radius = 25
   const circumference = 2 * Math.PI * radius

   useEffect(() => {
      const strokeDashoffset =
         progress <= 100
            ? circumference - (progress / 100) * circumference
            : circumference - (100 / 100) * circumference
      setOffset(strokeDashoffset)
   }, [progress, circumference])

   return (
      <div className="relative flex items-center justify-center">
         <svg className="h-20 w-20 -rotate-90 transform">
            <circle
               cx="40"
               cy="40"
               r={radius}
               stroke="currentColor"
               strokeWidth="6"
               fill="transparent"
               className="text-secondary"
            />
            <circle
               cx="40"
               cy="40"
               r={radius}
               stroke="currentColor"
               strokeWidth="6"
               fill="transparent"
               strokeDasharray={circumference}
               strokeDashoffset={offset}
               className={color}
               style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
         </svg>
         <span className={`absolute text-xs font-normal ${color}`}>
            {progress >= 1000 ? 999 : progress}%
         </span>
      </div>
   )
}

export default RadialProgress
