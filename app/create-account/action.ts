"use server"
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants'
import {z} from 'zod'
import db from '@/lib/db'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import getSession from '@/lib/session'

const formSchema = z.object({
    username:z.string({
        invalid_type_error:"user name must be a string",
        required_error:"Where is my username?"
    }).min(5,"Way too short").max(10,"That is too long")
    .refine(username => !username.includes('hi'),"No hi allowed"),
    email:z.string().email(),
    password:z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR),
    passwordConfirm:z.string().min(PASSWORD_MIN_LENGTH)
}).refine(({password,passwordConfirm}) => password === passwordConfirm,{
    message:"Both passwords should be the same",
    path:["passwordConfirm"]
}).superRefine(async ({username},ctx) => {
    const user = await db.user.findUnique({
        where:{
            username
        },
        select:{
            id:true
        }
    })
    if(user){
        //zod에서 유효성 검사 후 에러메시지 쓸때 만드는 코드
        ctx.addIssue({
            code:'custom',
            message:'This username is already taken',
            path:['username'],
            //위의 유효성 검사가 완료 되기전까지 다른것들의 유효성 검사를 진행하지 않는다
            //superRefine을 다른 refine보다 앞에 놔야 검사 진행하지 않음
            fatal:true
        })
        //반환값은 사용되지는 않지만 타입을 위해서 반환한다
        return z.NEVER
    }
}).superRefine(async ({email},ctx) => {
    const user = await db.user.findUnique({
        where:{
            email
        },
        select:{
            id:true
        }
    })
    if(user){
        ctx.addIssue({
            code:'custom',
            message:'This email is already taken',
            path:['email'],
            fatal:true
        })
        return z.NEVER
    }
})


export async function createAccount(prev:any,data:FormData) {
    const formData = {
        username:data.get("username"),
        email:data.get('email'),
        password:data.get('password'),
        passwordConfirm:data.get('passwordConfirm')
    }
    //데이터를 검증
    //safeParse을 통해 formSchema의 형식에 맞는지 formData를 데이터 검증한다
    const result = await formSchema.spa(formData)
    if(!result.success){
        console.log(result.error.flatten())
        return result.error.flatten()
    }else{
        //password를 보안을 위해 bcrypt의 hash를 사용하여 암호화 시킨다
        const hashedPassword = await bcrypt.hash(result.data.password,12)
        console.log('hashedPassword',hashedPassword)
        //db에 새로운 user data저장
        const user = await db.user.create({
            data:{
                username:result.data.username,
                email:result.data.email,
                //보안을 위해 password에는 hash로 암호화된 비밀번호를 넣는다
                password:hashedPassword
            },
            select:{
                id:true
            }
        })
        const session = await getSession()
        session.id = user.id
        await session.save()
        redirect('/profile')
    }
}