import { InputHTMLAttributes } from "react";

interface IInput{
    errors?:string[];
    name:string
}   

export default function Input({errors,name, ...extraProps}:IInput & InputHTMLAttributes<HTMLInputElement>){
    return(
        <div className="flex flex-col gap-2">
          <input
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
            name={name}
            {...extraProps}
          />
          {errors?.map((i,idx) => 
            <span key={idx} className="text-red-500 font-medium">{i}</span>
          )}
        </div>
    )
}