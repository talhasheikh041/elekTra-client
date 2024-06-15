import { Button } from "@/features/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/components/ui/card"
import { useEffect, useState } from "react"

const formatTime = (timeInSeconds: number) => {
   const hours = Math.floor(timeInSeconds / 3600)
   const minutes = Math.floor((timeInSeconds % 3600) / 60)
   const seconds = timeInSeconds % 60

   const hoursInString = hours.toString().padStart(2, "0")
   const minutesInString = minutes.toString().padStart(2, "0")
   const secondsInString = seconds.toString().padStart(2, "0")

   return `${hoursInString}:${minutesInString}:${secondsInString}`
}

const Stopwatch = () => {
   const [time, setTime] = useState<number>(0)
   const [isRunning, setisRunning] = useState<boolean>(false)

   const resetTimer = () => {
      setTime(0)
      setisRunning(false)
   }

   useEffect(() => {
      let interval: ReturnType<typeof setInterval>
      if (isRunning) {
         interval = setInterval(() => {
            setTime((prev) => prev + 1)
         }, 1000)
      }

      return () => clearInterval(interval)
   }, [isRunning])

   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">StopWatch</CardTitle>
         </CardHeader>
         <CardContent className="flex h-[calc(100vh_-_106px)] flex-col items-center justify-center">
            <h1 className="rounded-lg border bg-gray-100 p-4 font-mono text-3xl font-semibold tracking-widest sm:text-5xl">
               {formatTime(time)}
            </h1>
            <div className="mt-8 flex gap-8">
               <Button
                  onClick={() => setisRunning((prev) => !prev)}
                  variant="default"
                  className="bg-green-500"
               >
                  {isRunning ? "Stop" : "Start"}
               </Button>
               <Button onClick={resetTimer} variant="destructive">
                  Reset
               </Button>
            </div>
         </CardContent>
      </Card>
   )
}
export default Stopwatch
