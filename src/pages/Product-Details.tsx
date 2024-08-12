import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Button } from "@/features/global-components/ui/button"
import { Progress } from "@/features/global-components/ui/progress"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/global-components/ui/tabs"
import {
   useAllReviewsOfProductQuery,
   useGetSingleProductQuery,
} from "@/features/products/api/product-api"
import DetailsCard from "@/features/products/components/Details-Card"
import DetailsSlider from "@/features/products/components/Details-Slider"
import RatingProgress from "@/features/products/components/Rating-Progress"
import RatingStars from "@/features/products/components/Rating-Stars"
import ReviewCard from "@/features/products/components/Review-Card"
import { CustomErrorType } from "@/types/api-types"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const ProductDetails = () => {
   const params = useParams()

   const { data, isLoading, isError, isSuccess, error } = useGetSingleProductQuery(
      params.productId!,
   )
   let errorMessage: string | null = null

   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   const {
      data: reviewsResponse,
      isLoading: reviewsIsLoading,
      isError: reviewsIsError,
      isSuccess: reviewsIsSuccess,
      error: reviewsError,
   } = useAllReviewsOfProductQuery(params.productId!)

   let reviewsErrorMessage: string | null = null

   if (reviewsIsError) {
      const err = reviewsError as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   return (
      <main className="container py-8">
         {isLoading ? (
            <SkeletonWrapper className="mt-8 flex w-full gap-3" quantity={4}>
               <Skeleton className="h-64 w-80" />
            </SkeletonWrapper>
         ) : isSuccess && data ? (
            <>
               <div className="flex flex-col gap-10 md:flex-row">
                  <section className="md:w-1/2">
                     <DetailsSlider />
                  </section>

                  <section>
                     <DetailsCard product={data.product} />
                  </section>
               </div>

               <section className="mt-16">
                  <div>
                     <Tabs defaultValue="details">
                        <TabsList className="mb-4 w-full justify-normal border-b bg-transparent">
                           <TabsTrigger className="text-lg" value="details">
                              Details
                           </TabsTrigger>
                           <TabsTrigger className="text-lg" value="reviews">
                              Reviews
                           </TabsTrigger>
                        </TabsList>
                        <TabsContent value="details">
                           <p>
                              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
                              blanditiis perspiciatis temporibus voluptate aut delectus, provident
                              deleniti neque dolores ad, nobis eum nesciunt tenetur natus unde
                              cupiditate quos. Obcaecati, nisi! Amet ipsum, aliquid, voluptates a
                              accusantium iste qui dolor iusto beatae, excepturi numquam magni
                              asperiores illum labore inventore consequatur non! Vero odit,
                              perferendis eligendi a ullam in quod earum quasi. Quo quia pariatur
                              neque aliquam dolorem delectus asperiores repudiandae ratione ipsam
                              dolor iusto laboriosam, et cupiditate, consectetur fugit harum omnis
                              veniam illo dolorum suscipit beatae assumenda. Eligendi sequi nam at!
                              Consequatur corrupti nobis repellendus, soluta, dolorem explicabo
                              praesentium voluptates autem ipsum reprehenderit illo nihil similique
                              doloribus pariatur nostrum aliquid aperiam doloremque voluptatem omnis
                              eligendi exercitationem perspiciatis? Fugit doloribus fugiat nemo.
                              Omnis similique ipsam deserunt? Porro, placeat doloribus. Laudantium
                              repellendus consequatur cumque animi. Incidunt dolorum beatae nisi
                              enim repellat totam consequuntur itaque, magnam consequatur eligendi!
                              Magni aperiam id deleniti dolor in!
                           </p>
                        </TabsContent>
                        <TabsContent value="reviews">
                           {reviewsIsLoading ? (
                              <SkeletonWrapper className="mt-8 flex w-full gap-3" quantity={4}>
                                 <Skeleton className="h-64 w-80" />
                              </SkeletonWrapper>
                           ) : reviewsIsSuccess && reviewsResponse ? (
                              <div className="flex flex-col-reverse gap-10 md:flex-row md:gap-20">
                                 <div className="flex flex-col gap-4 md:w-[60%]">
                                    {reviewsResponse.reviews.map((review) => (
                                       <ReviewCard key={review._id} review={review} />
                                    ))}
                                 </div>

                                 <div className="flex-grow">
                                    <div className="flex justify-end">
                                       <Button className="ml-auto inline">Add Review</Button>
                                    </div>

                                    <div className="mt-6 flex w-full justify-between">
                                       <RatingStars rating={data.product.rating} readOnly={true} />
                                       <span className="self-end text-xl font-semibold">
                                          {data.product.rating}
                                       </span>
                                    </div>

                                    <div className="mt-6 space-y-1">
                                       <RatingProgress reviews={reviewsResponse.reviews} />
                                    </div>
                                 </div>
                              </div>
                           ) : (
                              <p className="grid place-items-center">{reviewsErrorMessage}</p>
                           )}
                        </TabsContent>
                     </Tabs>
                  </div>
               </section>
            </>
         ) : (
            <p className="grid place-items-center">{errorMessage}</p>
         )}
      </main>
   )
}
export default ProductDetails
