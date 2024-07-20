import { Input } from "@/features/components/ui/input"
import { Label } from "@/features/components/ui/label"
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/features/components/ui/pagination"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/components/ui/select"
import { Slider } from "@/features/components/ui/slider"
import ProductCard from "@/features/products/Product-Card"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const Search = () => {
   const [searchParams] = useSearchParams()

   const [sort, setSort] = useState<string>("")
   const [range, setRange] = useState<number>(10000)
   const [category, setCategory] = useState<string>("all")
   const [search, setSearch] = useState<string>("")
   const [page] = useState<number>(searchParams.size < 1 ? 1 : Number(searchParams.get("page")))

   return (
      <div className="container flex gap-8 py-8">
         <aside className="h-screen min-w-64 bg-secondary p-6 shadow-xl">
            <h2 className="text-3xl font-light uppercase tracking-widest">Filters</h2>

            <div className="mt-6 flex flex-col gap-5">
               <div>
                  <Label>Sort</Label>
                  <Select
                     onValueChange={(value) => (value === "none" ? setSort("") : setSort(value))}
                     defaultValue={sort}
                  >
                     <SelectTrigger>
                        <SelectValue placeholder="None" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="asc">Price (Low to High)</SelectItem>
                        <SelectItem value="dsc">Price (High to Low)</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div>
                  <Label>Max Price: {range.toLocaleString()}</Label>
                  <Slider
                     className="mt-3"
                     onValueChange={(value) => setRange(value[0])}
                     defaultValue={[range]}
                     min={100}
                     max={100000}
                     step={500}
                  />
               </div>

               <div>
                  <Label>Category</Label>
                  <Select onValueChange={(value) => setCategory(value)} defaultValue={category}>
                     <SelectTrigger>
                        <SelectValue placeholder="None" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </div>
         </aside>

         <main className="w-full">
            <h1 className="text-4xl font-light uppercase tracking-widest">Products</h1>

            <div className="mt-4">
               <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-md"
                  type="text"
                  placeholder="Search by name"
               />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
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
               <ProductCard />
            </div>

            <div className="mt-6">
               <Pagination>
                  <PaginationContent>
                     <PaginationItem>
                        <PaginationPrevious
                           style={{
                              pointerEvents: page === 1 ? "none" : "auto",
                              cursor: page === 1 ? "not-allowed" : "pointer",
                           }}
                           href={`/search?page=${page - 1}`}
                           className={`${page === 1 && "text-muted-foreground"}`}
                        />
                     </PaginationItem>
                     <PaginationItem>
                        <PaginationLink href="/search?page=2">2</PaginationLink>
                        <PaginationLink href="/search?page=3">3</PaginationLink>
                     </PaginationItem>

                     <PaginationItem>
                        <PaginationNext
                           style={{
                              pointerEvents: page === 4 ? "none" : "auto",
                              cursor: page === 4 ? "not-allowed" : "pointer",
                           }}
                           href={`/search?page=${page + 1}`}
                           className={`${page === 4 && "text-muted-foreground"}`}
                        />
                     </PaginationItem>
                  </PaginationContent>
               </Pagination>
            </div>
         </main>
      </div>
   )
}
export default Search
