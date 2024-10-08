import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/features/global-components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
   opts?: CarouselOptions
   plugins?: CarouselPlugin
   orientation?: "horizontal" | "vertical"
   setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
   carouselRef: ReturnType<typeof useEmblaCarousel>[0]
   api: ReturnType<typeof useEmblaCarousel>[1]
   scrollPrev: () => void
   scrollNext: () => void
   canScrollPrev: boolean
   canScrollNext: boolean
   emblaThumbsRef: ReturnType<typeof useEmblaCarousel>[0]
   emblaThumbsApi: ReturnType<typeof useEmblaCarousel>[1]
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
   const context = React.useContext(CarouselContext)

   if (!context) {
      throw new Error("useCarousel must be used within a <Carousel />")
   }

   return context
}

const Carousel = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
   const [carouselRef, api] = useEmblaCarousel(
      {
         ...opts,
         axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
   )

   const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
      containScroll: "keepSnaps",
      dragFree: true,
   })

   const [canScrollPrev, setCanScrollPrev] = React.useState(false)
   const [canScrollNext, setCanScrollNext] = React.useState(false)

   const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
         return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
   }, [])

   const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
   }, [api])

   const scrollNext = React.useCallback(() => {
      api?.scrollNext()
   }, [api])

   const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
         if (event.key === "ArrowLeft") {
            event.preventDefault()
            scrollPrev()
         } else if (event.key === "ArrowRight") {
            event.preventDefault()
            scrollNext()
         }
      },
      [scrollPrev, scrollNext],
   )

   React.useEffect(() => {
      if (!api || !setApi) {
         return
      }

      setApi(api)
   }, [api, setApi])

   React.useEffect(() => {
      if (!api) {
         return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
         api?.off("select", onSelect)
      }
   }, [api, onSelect])

   return (
      <CarouselContext.Provider
         value={{
            carouselRef,
            api: api,
            opts,
            orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext,
            emblaThumbsRef,
            emblaThumbsApi,
         }}
      >
         <div
            ref={ref}
            onKeyDownCapture={handleKeyDown}
            className={cn("relative", className)}
            role="region"
            aria-roledescription="carousel"
            {...props}
         >
            {children}
         </div>
      </CarouselContext.Provider>
   )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
   ({ className, ...props }, ref) => {
      const { carouselRef, orientation } = useCarousel()

      return (
         <div ref={carouselRef} className="overflow-hidden">
            <div
               ref={ref}
               className={cn(
                  "flex",
                  orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
                  className,
               )}
               {...props}
            />
         </div>
      )
   },
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
   ({ className, ...props }, ref) => {
      const { orientation } = useCarousel()

      return (
         <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={cn(
               "min-w-0 shrink-0 grow-0 basis-full",
               orientation === "horizontal" ? "pl-4" : "pt-4",
               className,
            )}
            {...props}
         />
      )
   },
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
   ({ className, variant = "outline", size = "icon", ...props }, ref) => {
      const { orientation, scrollPrev, canScrollPrev } = useCarousel()

      return (
         <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn(
               "absolute  h-8 w-8 rounded-full",
               orientation === "horizontal"
                  ? "-left-12 top-1/2 -translate-y-1/2"
                  : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
               className,
            )}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
         >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
         </Button>
      )
   },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
   ({ className, variant = "outline", size = "icon", ...props }, ref) => {
      const { orientation, scrollNext, canScrollNext } = useCarousel()

      return (
         <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn(
               "absolute h-8 w-8 rounded-full",
               orientation === "horizontal"
                  ? "-right-12 top-1/2 -translate-y-1/2"
                  : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
               className,
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
         >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
         </Button>
      )
   },
)
CarouselNext.displayName = "CarouselNext"

const CarouselDotButtons = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
   // @ts-ignore: TS6133
   ({ className, variant = "outline", size = "icon", ...props }, ref) => {
      const { api: emblaApi } = useCarousel()

      const [selectedIndex, setSelectedIndex] = React.useState(0)
      const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

      const onDotButtonClick = React.useCallback(
         (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
         },
         [emblaApi],
      )

      const onInit = React.useCallback((emblaApi: ReturnType<typeof useEmblaCarousel>[1]) => {
         setScrollSnaps(emblaApi!.scrollSnapList())
      }, [])

      const onSelect = React.useCallback((emblaApi: ReturnType<typeof useEmblaCarousel>[1]) => {
         setSelectedIndex(emblaApi!.selectedScrollSnap())
      }, [])

      React.useEffect(() => {
         if (!emblaApi) return

         onInit(emblaApi)
         onSelect(emblaApi)
         emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect)
      }, [emblaApi, onInit, onSelect])

      return (
         <>
            {scrollSnaps.map((_, index) => (
               <button
                  // className={"embla__dot".concat(
                  //    index === selectedIndex ? " embla__dot--selected" : "",
                  // )}
                  className={`m-0 inline-flex h-6 w-6 cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 no-underline after:flex after:h-4 after:w-4 after:items-center after:rounded-full ${index === selectedIndex ? "after:shadow-[inset_0_0_0_0.13rem_hsl(var(--primary))]" : "after:shadow-[inset_0_0_0_0.13rem_hsl(var(--foreground))]"} after:content-['']`}
                  style={{ WebkitTapHighlightColor: "rgba(hsl(var(--foreground)), 0.5)" }}
                  key={index}
                  onClick={() => onDotButtonClick(index)}
               ></button>
            ))}
         </>
      )
   },
)
CarouselDotButtons.displayName = "CarouselDotButtons"

const CarouselThumbButtons = React.forwardRef<
   HTMLButtonElement,
   React.ComponentProps<typeof Button> & { slides: string[] }
   // @ts-ignore: TS6133
>(({ className, variant = "outline", size = "icon", slides, ...props }, ref) => {
   const { api: emblaMainApi, emblaThumbsApi, emblaThumbsRef } = useCarousel()

   const [selectedIndex, setSelectedIndex] = React.useState(0)

   const onThumbClick = React.useCallback(
      (index: number) => {
         if (!emblaMainApi || !emblaThumbsApi) return

         emblaMainApi.scrollTo(index)
      },
      [emblaMainApi, emblaThumbsApi],
   )

   const onSelect = React.useCallback(() => {
      if (!emblaMainApi || !emblaThumbsApi) return
      setSelectedIndex(emblaMainApi.selectedScrollSnap())
      emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
   }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

   React.useEffect(() => {
      if (!emblaMainApi) return
      onSelect()

      emblaMainApi.on("select", onSelect).on("reInit", onSelect)
   }, [emblaMainApi, onSelect])

   return (
      <div className="mt-4 md:mt-8">
         <div className="overflow-hidden" ref={emblaThumbsRef}>
            <div className="ml-0 flex md:ml-[calc(1rem*1)]">
               {slides.map((slide, index) => (
                  <div
                     key={index}
                     className={`ml-4 min-w-0 flex-shrink-0 flex-grow-0 rounded-lg border  ${index === selectedIndex ? "border-primary" : "border-black"}`}
                  >
                     <button
                        onClick={() => onThumbClick(index)}
                        type="button"
                        className="m-0 inline-flex w-16 cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-3xl border-0 bg-transparent p-0 no-underline lg:w-20"
                        style={{ WebkitTapHighlightColor: "rgba(hsl(var(--foreground)), 0.5)" }}
                     >
                        <img
                           src={slide}
                           className="aspect-square object-contain p-1"
                           alt="product-thumbnail"
                        />
                     </button>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
})
CarouselThumbButtons.displayName = "CarouselThumbButtons"

export {
   type CarouselApi,
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselPrevious,
   CarouselNext,
   CarouselDotButtons,
   CarouselThumbButtons,
}
