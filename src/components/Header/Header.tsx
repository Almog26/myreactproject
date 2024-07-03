import { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { ThemeContext } from "../../context/ThemeContext";
import "./Header.scss";
import Search from "../../sreach/Search";


function Header() {
  
  const {theme, toggle} = useContext(ThemeContext)


  return (
    <div className="header-container">
      <header className="site-header navbar-header">
        
      <Navbar />
    </header>
    </div>
  );
}

export default Header