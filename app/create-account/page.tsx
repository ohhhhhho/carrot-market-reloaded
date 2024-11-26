"use client"
import Input from "@/components/input";
import Button from "../../components/button";
import SocialLogin from "@/components/social-login";
import { useActionState } from "react";
import { createAccount } from "./action";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
export default function CreateAccount() {
    const [state ,dispatch] = useActionState(createAccount,null)
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="username" type="text" placeholder="Username" required errors={state?.fieldErrors.username} minLength={3} maxLength={10}/>
        <Input name="email" type="email" placeholder="Email" required errors={state?.fieldErrors.email}/>
        <Input name="password" type="password" placeholder="password" required minLength={PASSWORD_MIN_LENGTH} errors={state?.fieldErrors.password}/>
        <Input name="passwordConfirm" type="password" placeholder="Confirm password" required minLength={PASSWORD_MIN_LENGTH} errors={state?.fieldErrors.passwordConfirm}/>
        <Button text="create account"/> 
        </form>
     <SocialLogin/>
    </div>
  );
}