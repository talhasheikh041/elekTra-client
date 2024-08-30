import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { Badge } from "@/features/global-components/ui/badge"
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
import { areObjectsEqual, debounce, generatePageNumbers } from "@/lib/utils"
import { CustomErrorType } from "@/types/api-types"
import { Loader, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"

const Search = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   // Extracting filter values from search params
   const sort = searchParams.get("sort") || ""
   const range = Number(searchParams.get("range")) || 1000000
   const category = searchParams.get("category") || ""
   const search = searchParams.get("search") || ""
   const page = Number(searchParams.get("page")) || 1

   const [showFilters, setShowFilters] = useState(false)

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
         isSuccess: searchProductsIsSuccess,
         isFetching: searchProductsisFetching,
      },
      lastPromiseInfo,
   ] = useLazySearchProductsQuery()

   let searchProductsErrorMsg: string | null = null

   if (searchProductsIsError) {
      const err = searchProductsError as CustomErrorType
      searchProductsErrorMsg = err.data.message
   }

   const debouncedSearchQuery = useCallback(
      debounce(
         async (presentArgs: {
            search: string
            category: string
            page: number
            price: number
            sort: string
         }) => {
            await trigger(presentArgs)
         },
         500,
      ),
      [],
   )

   useEffect(() => {
      const lastArgs = lastPromiseInfo.lastArg
      const presentArgs = {
         search,
         category,
         page,
         price: range,
         sort,
      }
      if (areObjectsEqual(lastArgs, presentArgs)) return

      debouncedSearchQuery(presentArgs)

      return () => {
         debouncedSearchQuery.cancel?.()
      }
   }, [searchParams])

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
   }, [page])

   return (
      <div className="container relative flex gap-8 py-8">
         <Badge
            onClick={() => setShowFilters((prev) => !prev)}
            className="absolute -left-6 top-24 rotate-90 cursor-pointer text-base lg:hidden"
         >
            Filters
         </Badge>
         <aside
            className={`absolute left-0 z-50 min-w-64 rounded-lg bg-secondary p-6 shadow-xl lg:static lg:translate-x-0 ${showFilters ? "translate-x-0" : "-translate-x-full"} transition-transform`}
         >
            {showFilters && (
               <Button
                  onClick={() => setShowFilters((prev) => !prev)}
                  variant={"outline"}
                  size={"icon"}
                  className="absolute right-2 top-2 size-6"
               >
                  <X />
               </Button>
            )}
            <h2 className="text-3xl font-light uppercase tracking-widest">Filters</h2>

            <div className="mt-6 flex flex-col gap-5">
               <div>
                  <Label>Sort</Label>
                  <Select
                     onValueChange={(value) =>
                        setSearchParams({
                           ...Object.fromEntries(searchParams),
                           sort: value === "none" ? "" : value,
                        })
                     }
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
                     onValueChange={(value) =>
                        setSearchParams({
                           ...Object.fromEntries(searchParams),
                           range: value[0].toString(),
                        })
                     }
                     defaultValue={[range]}
                     min={100}
                     max={1000000}
                     step={100}
                  />
               </div>

               <div>
                  <Label>Category</Label>
                  <Select
                     onValueChange={(value) =>
                        setSearchParams({
                           ...Object.fromEntries(searchParams),
                           category: value === "all" ? "" : value,
                        })
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
            </div>
         </aside>

         <main className="w-full">
            <h1 className="text-4xl font-light uppercase tracking-widest">
               Products {category && <span className="text-base">({category})</span>}
            </h1>

            <div className="mt-4">
               <Input
                  value={search}
                  onChange={(e) =>
                     setSearchParams({
                        ...Object.fromEntries(searchParams),
                        search: e.target.value,
                     })
                  }
                  className="max-w-md"
                  type="text"
                  placeholder="Search by name"
               />
            </div>

            {searchProductsIsLoading || searchProductsisFetching ? (
               <SkeletonWrapper
                  className="mt-8 grid grid-cols-1 place-items-center gap-2 sm:grid-cols-2 md:grid-cols-3"
                  quantity={8}
               >
                  <Skeleton className="h-64 w-64" />
               </SkeletonWrapper>
            ) : searchProducts?.products.length && searchProductsIsSuccess ? (
               <div className="mt-5 grid grid-cols-1 place-items-center gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {searchProducts.products.map((product) => (
                     <ProductCard key={product._id} product={product} />
                  ))}
               </div>
            ) : (
               <p className="flex h-full items-center justify-center text-xl">
                  {searchProductsErrorMsg}
               </p>
            )}

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
                              setSearchParams({
                                 ...Object.fromEntries(searchParams),
                                 page: (page - 1).toString(),
                              })
                           }
                        />
                     </PaginationItem>
                     <PaginationItem>
                        {generatePageNumbers(page, searchProducts?.totalPages!).map(
                           (pageNumber) => (
                              <PaginationLink
                                 key={pageNumber}
                                 isActive={page === pageNumber}
                                 className="cursor-pointer"
                                 onClick={() =>
                                    setSearchParams({
                                       ...Object.fromEntries(searchParams),
                                       page: pageNumber.toString(),
                                    })
                                 }
                              >
                                 {pageNumber}
                              </PaginationLink>
                           ),
                        )}
                     </PaginationItem>

                     <PaginationItem>
                        <PaginationEllipsis />
                     </PaginationItem>

                     <PaginationItem>
                        <PaginationNext
                           style={{
                              pointerEvents: page === searchProducts?.totalPages ? "none" : "auto",
                              cursor:
                                 page === searchProducts?.totalPages ? "not-allowed" : "pointer",
                           }}
                           className={`${page === searchProducts?.totalPages && "text-muted-foreground"}`}
                           onClick={() =>
                              setSearchParams({
                                 ...Object.fromEntries(searchParams),
                                 page: (page + 1).toString(),
                              })
                           }
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
