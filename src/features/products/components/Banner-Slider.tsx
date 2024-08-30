import banner1 from "@/assets/banner1.webp"
import banner2 from "@/assets/banner2.webp"
import banner3 from "@/assets/banner3.webp"
import banner4 from "@/assets/banner4.webp"
import banner5 from "@/assets/banner5.webp"
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
               <div className="h-[300px] md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img className="size-full object-cover" src={banner1} alt="hero-img" />
               </div>
            </CarouselItem>
            <CarouselItem>
               <div className="h-[300px] md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img className="size-full object-cover" src={banner2} alt="hero-img" />
               </div>
            </CarouselItem>
            <CarouselItem>
               <div className="h-[300px] md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img className="size-full object-cover" src={banner3} alt="hero-img" />
               </div>
            </CarouselItem>
            <CarouselItem>
               <div className="h-[300px] md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img className="size-full object-cover" src={banner4} alt="hero-img" />
               </div>
            </CarouselItem>
            <CarouselItem>
               <div className="h-[300px] md:h-[500px] lg:h-[500px] xl:h-[550px]">
                  <img className="size-full object-cover" src={banner5} alt="hero-img" />
               </div>
            </CarouselItem>
         </CarouselContent>
         <CarouselPrevious className="bottom-8 left-auto right-16 top-auto hidden h-6  w-6 translate-y-0 sm:inline-flex" />
         <CarouselNext className="bottom-8 right-8 top-auto hidden h-6 w-6 translate-y-0 sm:inline-flex" />
      </Carousel>
   )
}
export default BannerSlider
