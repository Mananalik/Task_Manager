"use client";
import {useUserContext} from "@/context/userContext.js";
import {useState} from "react";
export default function Home() {
  const{
       logoutUser,
       user , 
       handleUserInput,
       userState,
       updateUser,
       emailVerification,
       allUsers,
       deleteUser} = useUserContext();
  const { name, photo, isVerified, bio } = user;

  // state
  const [isOpen,setIsOpen] = useState(false);

  // function
  const myToggle=()=>{
    setIsOpen(!isOpen);
  }
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
            onClick={emailVerification}>
              Verify Account
            </button>
          )} 
          <button
             onClick={logoutUser}
             className="px-4 py-2 bg-red-600 text-white rounded-md"
             >
              Logout
             </button>
      </div>
    </header>
    <section>
      <p  className="text-[#999] text-[2rem]">{bio}</p>
      <h1>
        <button 
        onClick={myToggle}></button>
      </h1>
    </section>
  </main>
}
