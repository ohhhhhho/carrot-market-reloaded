import db from "@/lib/db"
import getSession from "@/lib/session"
import { formatToWon } from "@/lib/utilis"
import { UserIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

async function getOwner(userId:number) {
    const session = await getSession()
    if(session.id){
        //session.id(쿠키에 있는 아이디)가 제품을 업로드한 사용자의 userId와 같다면 true
        return session.id === userId
    }
    //아니라면 false
    return false
}

async function getProducts(id:number) {
    const product = await db.product.findUnique({
        where:{
            id
        },
        include:{
            user:{
                select:{
                    username:true,
                    avatar:true
                }
            }
        }
    })
    return product
}

export default async function ProductDetail({params}:{params:{id:string}}){
    //파라미터의 값을 숫자로 바꾼다
    const id = Number(params.id)
    //파라미터의 id값이 숫자가 아니라면 notFound
    if(isNaN(id)){
        return notFound()
    }
    const product = await getProducts(id)
    //db product안에 파라미터 id값이 없다면 notFound
    if(!product){
        return notFound()
    }
    const isOwner = await getOwner(product.userId)
    const DeleteProduct = async () => {
        "use server"
        const product = await db.product.delete({
            where:{
                id
            }
        })
        redirect("/products")
    }
    return(
        <div>
        <div className="relative aspect-square">
          <Image fill src={product.photo} alt={product.title} />
        </div>
        <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
          <div className="size-10 rounded-full">
            {product.user.avatar !== null ? (
              <Image
                src={product.user.avatar}
                width={40}
                height={40}
                alt={product.user.username}
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <div>
            <h3>{product.user.username}</h3>
          </div>
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p>{product.description}</p>
        </div>
        <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
          <span className="font-semibold text-xl">
            {formatToWon(product.price)}원
          </span>
          {isOwner ? (
            <form action={DeleteProduct}>
            <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
              Delete product
            </button>
            </form>
          ) : <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={``}
        >
          채팅하기
        </Link>}
          
        </div>
      </div>
    )
}