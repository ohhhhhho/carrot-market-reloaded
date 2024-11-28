import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"

async function getUser() {
    //세션에 저장되어 있는 정보를 가져오기 위해 getSession함수 호출
    const session = await getSession()
    //세션이 있다면
    if(session){
        //세션에 저장되어 있는 id값을 db에서 찾는다
        const user = await db.user.findUnique({
            where:{
                id:session.id
            }
        })
        //유저 정보가 있다면 user의 데이터를 리턴함
        if(user){
            return user
        }
    }
    //없다면 404 페이지 호출
    notFound()
}

export default async function Profile(){
    const user = await getUser();
    //server action에서 사용하는 함수 안에는 "use server가 들어가야함"
    const logOut = async () => {
        "use server";
        const session = await getSession();
        session.destroy()
        redirect('/')
    }
    return (
        <>
            <h1>Welcome {user?.username} </h1>
            {/* onClick이벤트를 사용하면 "use client"를 사용해야 하기에 form action사용 */}
            <form action={logOut}>
                <button>LogOut</button>
            </form>
        </>
)
}