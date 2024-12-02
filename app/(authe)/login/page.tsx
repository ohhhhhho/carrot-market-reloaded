"use client"
import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { login } from "./action";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
export default function Login() {
    const [state, dispatch] = useActionState(login,null)
    
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login with email</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="email" type="email" placeholder="Email" required errors={state?.fieldErrors.email}/>
        <Input name="password" type="password" placeholder="password" required minLength={PASSWORD_MIN_LENGTH} errors={state?.fieldErrors.password}/>
        <Button text="Login" /> 
        </form>
     <SocialLogin/>
    </div>
  );
}