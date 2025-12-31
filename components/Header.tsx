import Logo from "./Logo";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onToggleSidebar: () => void
}


function Header({onToggleSidebar}: HeaderProps) {
  


  return (
    <div className = "p-4 flex items-center justify-between">
      <Logo onToggleSidebar = {onToggleSidebar}/>
      <SearchBar />
    </div>
  )
}

export default Header
