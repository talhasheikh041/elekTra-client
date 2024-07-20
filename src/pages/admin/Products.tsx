import MyTooltip from "@/features/components/shared/My-Tooltip"
import { DataTable } from "@/features/components/shared/data-table/Data-Table"
import { buttonVariants } from "@/features/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/components/ui/card"
import { ProductsType, productColumns } from "@/features/products/table/Product-Columns"
import AddProductCard from "@/features/products/forms/Add-Product-Card"
import EditProductCard from "@/features/products/forms/Edit-Product-Card"
import { cn } from "@/lib/utils"
import { useId, useState } from "react"
import { Link } from "react-router-dom"

const img =
   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804"

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg"

const arr: ProductsType[] = [
   {
      photo: <img src={img} alt="Shoes" />,
      name: "Puma Shoes Air Jordan Cook Nigga 2023",
      price: 690,
      stock: 3,
      action: (
         <EditProductCard
            product={{
               photo: img,
               name: "Puma Shoes Air Jordan Cook Nigga 2023",
               price: 690,
               stock: 3,
            }}
         />
      ),
   },

   {
      photo: <img src={img2} alt="Shoes" />,
      name: "Macbook",
      price: 232223,
      stock: 213,
      action: (
         <Link
            className={cn(buttonVariants({ variant: "default" }), "h-5 rounded-full px-3")}
            to="/admin/product/sajknaskd"
         >
            Manage
         </Link>
      ),
   },
   {
      photo: <img src={img} alt="Shoes" />,
      name: "Puma Shoes Air Jordan Cook Nigga 2023",
      price: 690,
      stock: 3,
      action: (
         <Link
            className={cn(buttonVariants({ variant: "default" }), "h-5 rounded-full px-3")}
            to="/admin/product/sajknaskd"
         >
            Manage
         </Link>
      ),
   },

   {
      photo: <img src={img2} alt="Shoes" />,
      name: "Macbook",
      price: 232223,
      stock: 213,
      action: (
         <Link
            className={cn(buttonVariants({ variant: "default" }), "h-5 rounded-full px-3")}
            to="/admin/product/sajknaskd"
         >
            Manage
         </Link>
      ),
   },
   {
      photo: <img src={img} alt="Shoes" />,
      name: "Puma Shoes Air Jordan Cook Nigga 2023",
      price: 690,
      stock: 3,
      action: (
         <Link
            className={cn(buttonVariants({ variant: "default" }), "h-5 rounded-full px-3")}
            to="/admin/product/sajknaskd"
         >
            Manage
         </Link>
      ),
   },

   {
      photo: <img src={img2} alt="Shoes" />,
      name: "Macbook",
      price: 232223,
      stock: 213,
      action: (
         <Link
            className={cn(buttonVariants({ variant: "default" }), "h-5 rounded-full px-3")}
            to="/admin/product/sajknaskd"
         >
            Manage
         </Link>
      ),
   },
   {
      photo: <img src={img2} alt="Shoes" />,
      name: "Macbook",
      price: 232223,
      stock: 213,
      action: (
         <Link
            className={cn(buttonVariants({ variant: "default" }), "h-5 rounded-full px-3")}
            to="/admin/product/sajknaskd"
         >
            Manage
         </Link>
      ),
   },
]

const Products = () => {
   const addNewProductId = useId()

   const [data] = useState<ProductsType[]>(arr)

   return (
      <Card>
         <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-light uppercase tracking-widest">Products</CardTitle>
            <MyTooltip title="Add new Product">
               <AddProductCard key={addNewProductId} />
            </MyTooltip>
         </CardHeader>
         <CardContent>
            <DataTable columns={productColumns} data={data} isPagination={true} />
         </CardContent>
      </Card>
   )
}
export default Products
