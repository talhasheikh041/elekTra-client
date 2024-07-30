import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Button } from "@/features/global-components/ui/button"
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
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { Slider } from "@/features/global-components/ui/slider"
import { useCategoriesQuery, useLazySearchProductsQuery } from "@/features/products/api/product-api"
import ProductCard from "@/features/products/components/Product-Card"
import { CustomErrorType } from "@/types/api-types"
import { Loader } from "lucide-react"
import { useEffect, useLayoutEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"

const Search = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const [sort, setSort] = useState<string>("")
   const [range, setRange] = useState<number>(1000000)
   const [category, setCategory] = useState<string>("")
   const [search, setSearch] = useState<string>("")
   const [applyFilters, setApplyFilters] = useState<boolean>(false)

   const page = Number(searchParams.get("page")) || 1

   const {
      data: productCategories,
      isLoading: productCategoriesLoading,
      isError: productCategoriesIsError,
      error: productCategoriesError,
   } = useCategoriesQuery(null)

   let productCategoriesErrorMsg: string | null = null

   if (productCategoriesIsError) {
      const err = productCategoriesError as CustomErrorType
      productCategoriesErrorMsg = err.data.message
      toast.error(productCategoriesErrorMsg)
   }

   const [
      trigger,
      {
         data: searchProducts,
         isLoading: searchProductsIsLoading,
         isError: searchProductsIsError,
         error: searchProductsError,
      },
   ] = useLazySearchProductsQuery()

   const [searchProductsErrorMsg, setSearchProductsErrorMsg] = useState<string>("")

   useLayoutEffect(() => {
      if (searchProductsIsError) {
         const err = searchProductsError as CustomErrorType
         setSearchProductsErrorMsg(err.data.message)
         toast.error(err.data.message)
      }
   }, [searchProductsIsError])

   useEffect(() => {
      const fetchProducts = async () => {
         await trigger({
            search,
            category,
            page,
            price: range,
            sort,
         })
      }
      fetchProducts()
   }, [applyFilters])

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
   }, [page])

   return (
      <div className="container flex gap-8 py-8">
         <aside className="h-screen min-w-64 rounded-lg bg-secondary p-6 shadow-xl">
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
                     max={1000000}
                     step={500}
                  />
               </div>

               <div>
                  <Label>Category</Label>
                  <Select
                     onValueChange={(value) =>
                        value === "all" ? setCategory("") : setCategory(value)
                     }
                     defaultValue={category}
                  >
                     <SelectTrigger>
                        <SelectValue placeholder="All" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All</SelectItem>

                        {productCategoriesLoading ? (
                           <Loader className="animate-spin" />
                        ) : productCategories?.categories.length ? (
                           <>
                              {productCategories.categories.map((category) => (
                                 <SelectItem key={category} value={category}>
                                    {category}
                                 </SelectItem>
                              ))}
                           </>
                        ) : (
                           <span>{productCategoriesErrorMsg}</span>
                        )}
                     </SelectContent>
                  </Select>
               </div>

               <Button onClick={() => setApplyFilters((prev) => !prev)}>Apply Filters</Button>
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

            {searchProductsIsLoading ? (
               <SkeletonWrapper className="mt-8 grid w-full grid-cols-3 gap-y-6" quantity={8}>
                  <Skeleton className="h-64 w-64" />
               </SkeletonWrapper>
            ) : searchProducts?.products.length && !searchProductsIsError ? (
               <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {searchProducts.products.map((product) => (
                     <ProductCard
                        name={product.name}
                        photo={product.photo}
                        price={product.price}
                        key={product._id}
                     />
                  ))}
               </div>
            ) : (
               <p className="mt-5 flex justify-center">{searchProductsErrorMsg}</p>
            )}

            {searchProducts?.totalPages! > 1 && (
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
            )}
         </main>
      </div>
   )
}
export default Search
