"use server"
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants"
import db from "@/lib/db"
import {z} from "zod"
import bcrypt from 'bcrypt'
import getSession from "@/lib/session"
import { redirect } from "next/navigation"

const checkEmailExists = async (email:string) => {
    //find a user with the email
    const user = await db.user.findUnique({
        where:{
            email
        },
        select:{
            id:true
        }
    })
    return Boolean(user)
}
const formSchema = z.object({
    email:z.string().email().toLowerCase().refine(checkEmailExists,'An account with this email does not exists'),
    password:z.string({
        required_error:"Password is required"
    })
    // .min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR)
})
export const login = async (prev:any,formData:FormData) => {
    const data = {
        email:formData.get("email"),
        password:formData.get("password")
    }
    const result = await formSchema.spa(data)
    if(!result.success){
        return result.error.flatten()
    } else{
        //if the user is found, check password hash
        const user = await db.user.findUnique({
            where:{
                email:result.data.email
            },
            select:{
                id:true,
                password:true
            }
        })
        //compare는 사용자가 입력한 password값을 받아서 데이터베이스의 해시값과 비교한다
       const ok = await bcrypt.compare(result.data.password,user!.password ?? "")
        console.log('ok',ok)
        //log the user in
        if(ok){
            const session = await getSession();
            session.id = user!.id
            redirect('/profile')
        }else{
            return {
                //zod에서 사용하는 오류를 사용하기 위해 똑같은 객체 추가
                fieldErrors:{
                    password:['Wrong password'],
                    email:[]
                }
            }
        }
    }

}