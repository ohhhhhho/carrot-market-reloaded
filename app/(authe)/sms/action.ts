"use server"
import { z } from "zod"
import validator from "validator"
import { redirect } from "next/navigation";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone,"Wrong phone format")
const tokenSchema = z.coerce.number().min(100000).max(999999)
export async function smsLogin(prev:any,formData:FormData) {
     const phone = formData.get("phone")
     const token = formData.get('token')
     if(!prev.token){
        const result = phoneSchema.safeParse(phone)
        if(!result.success){
            return{
                token:false,
                error:result.error.flatten()
            }
        }else{
            return{
                token:true
            }
         }
     }else{
       const result = tokenSchema.safeParse(token) 
       if(!result.success){
        return{
            token:true,
            error:result.error.flatten()
        }
       }else{
        redirect("/")
       }
     }
}