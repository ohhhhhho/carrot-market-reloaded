"use client"
import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { pre } from "framer-motion/client";
import { useState } from "react";
import { uploadProduct } from "./action";

const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;  // 5MB

export default function AddProduct(){
  const [preview, setPreview] = useState("")
  const onImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.files)
      const {files} = e.target;
      if(!files || files.length === 0){
        return
      }
      const file = files[0]

      //파일을 소문자로 변환
      const fileExtension = file.name.split('').pop()?.toLowerCase()
      //
      if(!fileExtension || !ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)){
        e.target.value = "";
        alert('허용된 이미지 형식은 jpg, jpeg, png, gif, webp만 가능합니다.')
        return
      }
      //파일 크기 확인
      if(file.size > FILE_SIZE_MAX_LIMIT){
        e.target.value = "";
        alert('파일 최대 5mb까지 가능합니다.')
        return
      }
      //파일의 url을 생성함
      const url = URL.createObjectURL(file)
      setPreview(url)
  }
    return (
        <div>
        <form action={uploadProduct} className="p-5 flex flex-col gap-5">
          <label
            htmlFor="photo"
            className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
            style={{
              backgroundImage:`url(${preview})`
            }}
          >
            {preview === "" ?
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
            </>
            :null}
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="hidden"
          />
          <Input name="title" required placeholder="제목" type="text" />
          <Input name="price" type="number" required placeholder="가격" />
          <Input
            name="description"
            type="text"
            required
            placeholder="자세한 설명"
          />
          <Button text="작성 완료" />
        </form>
      </div>
    );
}