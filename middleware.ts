import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes{
    [key:string]:boolean
}
const publicOnlyUrls:Routes = {
    '/':true,
    'login':true,
    'sms':true,
    'create-account':true
}

export async function middleware(request:NextRequest){
    const session = await getSession()
    //유저가 이동하려는 pathname이 publicOnlyUrls안에 있는지 확인
    const exist = publicOnlyUrls[request.nextUrl.pathname]
    //로그아웃 상태일때
    if(!session.id){
        //exist에 없는 페이지로 이동하려할때 '/'로 이동시켜버린다.
        //로그아웃 상태에서 profile페이지로 이동시 '/'로 이동
        if(!exist){
            return NextResponse.redirect(new URL('/',request.url))
        }
    }else{

    }
}

//특정 url에서만 실행되도록 설정
export const config = {
    //해당 파일 제외 실행
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
}