import heroImg from "@/assets/cover.jpg"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/features/global-components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const BannerSlider = () => {
   return (
      <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]}>
         <CarouselContent>
            <CarouselItem>
               <div className="h-[300px] rounded-bl-2xl rounded-br-2xl md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img
                     className="size-full rounded-bl-2xl rounded-br-2xl object-cover"
                     src={heroImg}
                     alt="hero-img"
                  />
               </div>
            </CarouselItem>
            <CarouselItem>
               <div className="h-[300px] rounded-bl-2xl rounded-br-2xl md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img
                     className="size-full rounded-bl-2xl rounded-br-2xl object-cover"
                     src={heroImg}
                     alt="hero-img"
                  />
               </div>
            </CarouselItem>
            <CarouselItem>
               <div className="h-[300px] rounded-bl-2xl rounded-br-2xl md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img
                     className="size-full rounded-bl-2xl rounded-br-2xl object-cover"
                     src={heroImg}
                     alt="hero-img"
                  />
               </div>
            </CarouselItem>
            <CarouselItem>
               <div className="h-[300px] rounded-bl-2xl rounded-br-2xl md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img
                     className="size-full rounded-bl-2xl rounded-br-2xl object-cover"
                     src={heroImg}
                     alt="hero-img"
                  />
               </div>
            </CarouselItem>
            <CarouselItem>
               <div className="h-[300px] rounded-bl-2xl rounded-br-2xl md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img
                     className="size-full rounded-bl-2xl rounded-br-2xl object-cover"
                     src={heroImg}
                     alt="hero-img"
                  />
               </div>
            </CarouselItem>
         </CarouselContent>
         <CarouselPrevious className="bottom-8 left-auto right-16 top-auto hidden h-6  w-6 translate-y-0 sm:inline-flex" />
         <CarouselNext className="bottom-8 right-8 top-auto hidden h-6 w-6 translate-y-0 sm:inline-flex" />
      </Carousel>
   )
}
export default BannerSlider
