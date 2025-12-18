import { FaYoutube } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";


interface HeaderProps {
  onToggleSidebar: () => void
}


function Header({onToggleSidebar}: HeaderProps) {

  return (
    <div className = "p-4 flex">
      <div className = "flex flex-flow items-center gap-2">
        <GiHamburgerMenu 
          className = "hover:cursor-pointer"
          onClick = {onToggleSidebar}
        />
        <FaYoutube className = "text-2xl text-red-600"/>
        <span className ="font-bold text-2xl">Youtube</span>
      </div>
      <div className = "mx-auto">
        <input  className = "w-96 border rounded-2xl"/>
      </div>
      
    </div>
  )
}

export default Header
