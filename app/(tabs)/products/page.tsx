import ListProduct from "@/components/list-product"
import ProductList from "@/components/product-list"
import db from "@/lib/db"
import { Prisma } from "@prisma/client"

async function getProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true,
          },
          orderBy:{
            //날짜를 내림차순으로 노출
            created_at:'desc'
          }
    })
    return products
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getProducts>

export default async function Product(){
    const InitialProduct = await getProducts()
    return(
        <>
        <div>
            <ProductList InitialProduct={InitialProduct}/>
        </div>
        </>
    )
}