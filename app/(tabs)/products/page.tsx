import ListProduct from "@/components/list-product"
import ProductList from "@/components/product-list"
import db from "@/lib/db"
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid"
import { Prisma } from "@prisma/client"
import Link from "next/link"

async function getProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true,
          },
          take:1,
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
            <Link
                href="/products/add"
                className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
            >
                <PlusIcon className="size-10" />
            </Link>
        </div>
        </>
    )
}