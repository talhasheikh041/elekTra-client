import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselThumbButtons,
} from "@/features/global-components/ui/carousel"

const slides = [
   "http://localhost:3000/uploads/fd1e521b-72ba-4e8b-b44c-ff9544c2d158.webp",
   "http://localhost:3000/uploads/529033b4-2380-40b8-b310-8da21af00ed5.jpg",
   "http://localhost:3000/uploads/1f927118-2909-4744-8bc0-948c34c6f416.jpg",
   "http://localhost:3000/uploads/783cd722-ebfc-4730-a798-f717cf51a52f.webp",
   "http://localhost:3000/uploads/50fe745a-2f4a-4e40-a5a9-637d508c33a7.jpg",
   "http://localhost:3000/uploads/88151361-6cc1-4824-831b-cc1a904ddb10.jpg",
]

const DetailsSlider = () => {
   return (
      <Carousel>
         <CarouselContent>
            {slides.map((slide, index) => (
               <CarouselItem className="flex items-center justify-center" key={index}>
                  <div className="">
                     <img
                        className="aspect-square object-contain md:size-64 xl:size-96"
                        src={slide}
                        alt="slide"
                     />
                  </div>
               </CarouselItem>
            ))}
         </CarouselContent>
         <CarouselThumbButtons slides={slides} />
      </Carousel>
   )
}
export default DetailsSlider
