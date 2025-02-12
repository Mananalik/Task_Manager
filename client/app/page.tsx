"use client";
import {useUserContext} from "@/context/userContext.js"
export default function Home() {
  const{user , emailVerification} = useUserContext();
  const { name, photo, isVerified, bio } = user;
  return<main className="py-[2rem] mx-[10rem]">
    <header className="flex justify-between">
      <h1 className="text-[2rem] font-bold">
          Welcome <span className="text-red-600">{name}</span>
      </h1>
      <div className="flex items-center gap-4">
         <img
           src={photo}
           alt={name}
           className="w-[40px] h-[40px] rounded-full"
           />
          {!isVerified && (
            <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={emailVerification}></button>
          )} 
      </div>
    </header>
  </main>
}
