import { SidebarItems } from "../types/video"
import { MouseEvent } from "react";

const sidebarItems: SidebarItems[] = [
  { name: "movie", icon: "🎬"},
  { name: "news", icon: "📰"},
  { name: "music", icon: "🎧"},
  { name: "sports", icon: "🏀"},
  { name: "gaming", icon: "🕹️"}
]

interface SidebarProps {
  isCollapsed: boolean;
}

function Sidebar({isCollapsed}: SidebarProps) {


  const handleItemClick = (e: MouseEvent<HTMLButtonElement>) =>{
    console.log("navbar item clicked", e.target);
  }

  return (
    <aside
      className= {`p-4 transition-all ease-in-out duration-300 overflow-hidden ${
        isCollapsed ? "w-12" : "w-32"
      }`}
    >
      <nav>
        {sidebarItems.map(( item ) => (
          <div 
            key = {item.name}
            className = "flex p-2  rounded-lg  gap-2 items-center mb-4 transform transition-colors hover:cursor-pointer  hover:bg-gray-100 duration-100"
            onClick = {()=> handleItemClick}
            >
            <span>{item.icon}</span>
            { isCollapsed ?  null : <span className = "transition-transform duration-600 ">{item.name}</span>}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
