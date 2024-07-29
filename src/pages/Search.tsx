import { Input } from "@/features/global-components/ui/input"
import { Label } from "@/features/global-components/ui/label"
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/features/global-components/ui/pagination"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/global-components/ui/select"
import { Slider } from "@/features/global-components/ui/slider"
import ProductCard from "@/features/products/components/Product-Card"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const Search = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const [sort, setSort] = useState<string>("")
   const [range, setRange] = useState<number>(10000)
   const [category, setCategory] = useState<string>("all")
   const [search, setSearch] = useState<string>("")

   const page = Number(searchParams.get("page")) ?? 1

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
   }, [page])

   return (
      <div className="container flex gap-8 py-8">
         <aside className="h-screen min-w-64 bg-secondary p-6 shadow-xl rounded-lg">
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
                           className={`${page === 1 && "text-muted-foreground"}`}
                           onClick={() =>
                              page > 1 && setSearchParams({ page: JSON.stringify(page - 1) })
                           }
                        />
                     </PaginationItem>
                     <PaginationItem>
                        <PaginationLink href="/search?page=2">2</PaginationLink>
                        <PaginationLink href="/search?page=3">3</PaginationLink>
                     </PaginationItem>

                     <PaginationItem>
                        <PaginationEllipsis />
                     </PaginationItem>

                     <PaginationItem>
                        <PaginationNext
                           style={{
                              pointerEvents: page === 4 ? "none" : "auto",
                              cursor: page === 4 ? "not-allowed" : "pointer",
                           }}
                           className={`${page === 4 && "text-muted-foreground"}`}
                           onClick={() => setSearchParams({ page: JSON.stringify(page + 1) })}
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
