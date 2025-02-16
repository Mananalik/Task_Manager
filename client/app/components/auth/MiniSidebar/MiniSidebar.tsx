"use client";
import IconCheck from '@/public/icons/IconCheck';
import IconFileCheck from '@/public/icons/IconFileCheck';
import IconGrid from '@/public/icons/IconGrid';
import IconStopwatch from '@/public/icons/IconStopWatch';
import { usePathname } from 'next/navigation';
import React from 'react'
import {link} from "fs";
function MiniSidebar() {
    const pathname = usePathname();
    const getStrokeColor = (link: string)=>{
        return pathname===link ? "#3aafae":"#71717a";
    };
    const navItems=[
        {
            icon: <IconGrid/>,
            tittle: "All",
            link: "/" ,
        },
        {
            icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
            title: "Completed",
            link: "/completed",
          },
          {
            icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
            title: "Pending",
            link: "/pending",
          },
          {
            icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
            title: "Overdue",
            link: "/overdue",
          },
        ];
  return (
    <div>MiniSidebar</div>
  )
}

export default MiniSidebar