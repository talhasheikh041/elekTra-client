import { Card, CardContent, CardHeader, CardTitle } from "@/features/components/ui/card"
import headCoin from "@/assets/head_coin.png"
import tailCoin from "@/assets/tail_coin.png"
import { useState } from "react"

const Toss = () => {
   const [angle, setAngle] = useState<number>(0)

   const flipCoin = () => {
      if (Math.random() > 0.5) setAngle((prev) => prev + 180)
      else setAngle((prev) => prev + 360)
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">Toss</CardTitle>
         </CardHeader>
         <CardContent className="flex h-[calc(100vh_-_106px)] flex-col items-center justify-center">
            <section>
               <article
                  onClick={flipCoin}
                  style={{
                     transformStyle: "preserve-3d",
                     transform: `rotateY(${angle}deg)`,
                  }}
                  className="relative grid cursor-pointer place-items-center transition-all duration-500"
               >
                  <div
                     style={{
                        backgroundImage: `url('${headCoin}')`,
                        backgroundSize: "100%",
                        backfaceVisibility: "hidden",
                     }}
                     className={"absolute size-64 rounded-full"}
                  ></div>
                  <div
                     style={{
                        backgroundImage: `url('${tailCoin}')`,
                        backgroundSize: "140%",
                        backgroundPosition: "-49px",
                        backgroundRepeat: "no-repeat",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(-180deg)",
                     }}
                     className={"absolute size-64 rounded-full"}
                  ></div>
               </article>
            </section>
         </CardContent>
      </Card>
   )
}
export default Toss
