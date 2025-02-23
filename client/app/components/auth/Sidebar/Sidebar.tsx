import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";
import { useUserContext } from "@/context/userContext";
import { div } from "motion/react-client";

function Sidebar() {
  const { logoutUser } = useUserContext();

  return (
    
    <div className="w-[20rem] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 bg-[#f9f9f9] flex flex-col overflow-y-auto shadow-lg">
      {/* Profile Section */}
      <div className="px-6 pt-6">
        <Profile />
      </div>

      {/* Radial Chart Section */}
      <div className="mt-4 px-6">
        <RadialChart />
      </div>

      {/* Sign Out Button (Kept at the bottom) */}
      <div className="mt-auto px-6 pb-6">
        <button
          className="w-full py-4 px-6 bg-[#EB4E31] text-white rounded-full hover:bg-[#3aafae] transition duration-200 ease-in-out"
          onClick={logoutUser}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
