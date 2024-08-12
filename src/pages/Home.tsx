import LatestProducts from "@/features/products/components/Latest-Products"
import BannerSlider from "@/features/products/components/Banner-Slider"
import FeaturedProduct from "@/features/products/components/Featured-Product"
import HomeCategories from "@/features/products/components/Home-Categories"
import PointCards from "@/features/products/components/Point-Cards"

const Home = () => {
   return (
      <main className="3xl:container">
         <section>
            <BannerSlider />
         </section>

         <div className="container">
            <section className="mt-16 md:mt-20 ">
               <PointCards />
            </section>

            <section className="mt-16 md:mt-20">
               <LatestProducts />
            </section>

            <section className="mt-16 md:mt-20 ">
               <FeaturedProduct />
            </section>

            <section className="mt-16 md:mt-20 ">
               <LatestProducts />
            </section>

            <section className="mt-16 md:mt-20">
               <HomeCategories />
            </section>
         </div>
      </main>
   )
}

export default Home
