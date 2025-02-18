"use client"
import React from 'react'
import Sidebar from '@/app/components/auth/Sidebar/Sidebar';
import { useUserContext } from '@/context/userContext'
function SideBarProvider() {
  const userId = useUserContext().user._id;
  return (
    <div>{userId && <Sidebar/>}</div>
  )
}

export default SideBarProvider