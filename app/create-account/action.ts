"use server"
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants'
import {z} from 'zod'


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
    const result = formSchema.safeParse(formData)
    if(!result.success){
        console.log(result.error.flatten())
        return result.error.flatten()
    }else{
        console.log(result.data)
    }
}