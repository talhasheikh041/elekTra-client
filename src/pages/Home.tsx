import heroImg from "@/assets/cover.jpg"
import ProductCard from "@/features/products/components/Product-Card"
import { Link } from "react-router-dom"

const Home = () => {
   return (
      <main>
         <section className="h-96">
            <img className="size-full object-cover" src={heroImg} alt="hero-img" />
         </section>

         <section className="container mt-8">
            <div className="flex items-center justify-between font-light uppercase tracking-widest">
               <h1 className="text-2xl">Latest Products</h1>
               <Link className="hover:font-normal" to={"search"}>More</Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
               <ProductCard />
               <ProductCard />
               <ProductCard />
               <ProductCard />
               <ProductCard />
               <ProductCard />
               <ProductCard />
               <ProductCard />
               <ProductCard />
               <ProductCard />
            </div>
         </section>
      </main>
   )
}
export default Home
