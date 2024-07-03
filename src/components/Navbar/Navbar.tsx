import { NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { FaHome, FaBars } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import InputSearch from "./InputSearch";
import './inputSearch.css';
const Navbar = () => {
  const { isLoggedIn, logout, isBusiness } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 p-4  ">
      <div className="max-w-7xl mx-auto flex justify-between items-center font-roboto">
        {/* Brand / Home Link */}
        <div className="flex items-center">
          <NavLink to="/" className="text-white text-xl flex items-center md-hidden">
            <FaHome className="mr-2 font-lobster" />
            Home
          </NavLink>
        </div>
        <InputSearch/>
        {/* Menu Toggle Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex items-center ${isMenuOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
          <div className="flex flex-row md:flex-row md:items-center w-full md:w-auto">
            {!isLoggedIn && (
              <>
                <NavLink to="/register" className="text-white py-2 px-4">
                  Register
                </NavLink>
                <NavLink to="/login" className="text-white py-2 px-4">
                  Login
                </NavLink>
              </>
            )}
            {isLoggedIn && (
              <>
                <NavLink to="/about" className="text-white py-2 px-4">
                  About
                </NavLink>
                {isBusiness && (
                  <>
                    <NavLink to="/createCard" className="text-white py-2 px-4">
                      Create a card
                    </NavLink>
                    <NavLink to="/favoriteCard" className="text-white py-2 px-4">
                      Favorite cards
                    </NavLink>
                  </>
                )}
                <NavLink to="/my-cards" className="text-white py-2 px-4">
                  My cards
                </NavLink>
              
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="text-white py-2 px-4"
                >
                  Logout
                </button>
                <NavLink to="/profile" className="text-white py-2 px-4">
                  <RxAvatar className="inline-block" />
                </NavLink>
              </>
            )}
            <div className="mt-2 md:mt-0">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
