import heroImg from "@/assets/cover.jpg"
import LatestProducts from "@/features/products/components/Latest-Products"

const Home = () => {
   return (
      <main>
         <section className="h-96">
            <img className="size-full object-cover" src={heroImg} alt="hero-img" />
         </section>

         <section className="container mt-8">
            <LatestProducts />
         </section>
      </main>
   )
}
export default Home
