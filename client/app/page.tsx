"use client";
import {useTasks} from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import { useState } from "react";
import ChangePasswordForm from "./components/auth/changePasswordForm/ChangePasswordForm";
import Filters from "./components/auth/Filters/Filters";
import {Task} from "@/utils/types";
export default function Home() {
  useRedirect("/login");
  const {tasks, openModalForAdd, priority, setPriority} = useTasks();
  return (
   
    <main className="m-6 h-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">
              All Tasks
          </h1>
          <Filters/>
        </div>
    </main>
  );
}

