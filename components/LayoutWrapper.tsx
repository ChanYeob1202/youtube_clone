"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode; 
}

function LayoutWrapper({children}: LayoutWrapperProps) {

  const [ isSidebarCollapsed, setIsSidebarCollapsed ] = useState<boolean>(false);

  useEffect(() => {
    console.log(`sidebarCollapsed? ${isSidebarCollapsed}`)
  }, [isSidebarCollapsed])

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }

  return (
    <div className ="flex flex-col h-screen">
      <Header onToggleSidebar = {toggleSidebar}/>

      <div className = "flex flex-1 overflow-hidden" >
        <Sidebar isCollapsed = {isSidebarCollapsed}/>
        <main className = "flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      
    </div>
  )
}

export default LayoutWrapper
