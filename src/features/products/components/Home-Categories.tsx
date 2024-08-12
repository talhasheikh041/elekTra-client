import { Button } from "@/features/global-components/ui/button"

import budsCategoryPhoto from "@/assets/category-buds.webp"
import phoneCategoryPhoto from "@/assets/category-phone.webp"
import watchCategoryPhoto from "@/assets/category-watch.webp"

const HomeCategories = () => {
   return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
         <div
            className="before:content[''] relative flex aspect-square flex-col justify-end rounded-3xl bg-cover bg-center bg-no-repeat before:absolute before:size-full before:rounded-3xl before:bg-black/40"
            style={{ backgroundImage: `url(${phoneCategoryPhoto})` }}
         >
            <div className="relative z-10 space-y-6 p-8">
               <h1 className="scroll-m-20 text-4xl font-light tracking-widest text-white lg:text-4xl">
                  Phones
               </h1>

               <Button variant={"default"}>Shop now</Button>
            </div>
         </div>

         <div
            className="before:content[''] relative flex aspect-square flex-col justify-end rounded-3xl bg-cover bg-center bg-no-repeat before:absolute before:size-full before:rounded-3xl before:bg-black/40"
            style={{ backgroundImage: `url(${watchCategoryPhoto})` }}
         >
            <div className="relative z-10 space-y-6 p-8">
               <h1 className="scroll-m-20 text-4xl font-light tracking-widest text-white lg:text-4xl">
                  Watches
               </h1>

               <Button variant={"default"}>Shop now</Button>
            </div>
         </div>

         <div
            className="before:content[''] relative flex aspect-square flex-col justify-end rounded-3xl bg-cover bg-center bg-no-repeat before:absolute before:size-full before:rounded-3xl before:bg-black/40 sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:mx-0 lg:w-full"
            style={{ backgroundImage: `url(${budsCategoryPhoto})` }}
         >
            <div className="relative z-10 space-y-6 p-8">
               <h1 className="scroll-m-20 text-4xl font-light tracking-widest text-white lg:text-4xl">
                  Ear Buds
               </h1>

               <Button variant={"default"}>Shop now</Button>
            </div>
         </div>
      </div>
   )
}
export default HomeCategories
