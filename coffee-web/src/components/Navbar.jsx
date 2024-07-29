import { SiCoffeescript } from "react-icons/si";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, username, onLogout }) => {
  const [menu, setMenu] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="w-full h-20 px-4 shadow-md z-10 bg-gradient-to-r from-[#FFDCAB] to-[#AB6B2E] ">
      <div className="flex justify-between items-center h-full w-full max-w-6xl mx-auto">
        <div className="flex items-center">
          <SiCoffeescript size={30} className="text-black mr-2" />
          <h1 className="text-black text-2xl font-bold">CaffeeSpot</h1>
        </div>
        <nav className="hidden md:flex items-center text-lg font-medium gap-8">
          <ScrollLink to="home" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200">
            Home
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>
          <ScrollLink to="menu" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200">
            Menu
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>
          <ScrollLink to="aboutus" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200">
            About Us
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>
          <ScrollLink to="products" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200">
            Products
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>
          <ScrollLink to="reviews" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200">
            Reviews
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>
          {isAuthenticated && (
            <div className="relative flex items-center group relative inline-block cursor-pointer hover:text-yellow-200">
              <img
                src="../assets/images/defaultavatar.png" // Replace with the path to the user's avatar image
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
                onClick={toggleLogout}
              />
              <span>{username}</span>
              {showLogout && (
                <div className="absolute top-full mt-2 bg-white shadow-md rounded p-2">
                  <button onClick={handleLogout} className="text-red-600">Logout</button>
                </div>
              )}
            </div>
          )}
        </nav>
        <div className="md:hidden flex items-center">
          <div onClick={handleChange}>
            {menu ? <AiOutlineClose size={25} /> : <AiOutlineMenuUnfold size={25} />}
          </div>
        </div>
      </div>
      <nav className={menu ? "md:hidden" : "hidden"}>
        <div className="flex flex-col items-center text-lg font-medium gap-8 bg-black">
          <ScrollLink to="home" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer text-white  hover:text-yellow-200" onClick={closeMenu}>
            Home
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform text-white  group-hover:scale-x-100"></span>
          </ScrollLink>
          <ScrollLink to="menu" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer text-white  hover:text-yellow-200">
            Menu
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform text-white  group-hover:scale-x-100"></span>
          </ScrollLink>
          <ScrollLink to="aboutus" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer text-white  hover:text-yellow-200">
            About Us
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform text-white  group-hover:scale-x-100"></span>
          </ScrollLink>
          <ScrollLink to="products" spy={true} smooth={true} duration={500} className="group relative text-white  inline-block cursor-pointer hover:text-yellow-200">
            Products
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left  transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>
          <ScrollLink to="reviews" spy={true} smooth={true} duration={500} className="group relative text-white  inline-block cursor-pointer hover:text-yellow-200">
            Reviews
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>
          {isAuthenticated && (
            <div className="relative flex items-center group text-white  relative inline-block cursor-pointer hover:text-yellow-200">
              <img
                src="../assets/images/defaultavatar.png" // Replace with the path to the user's avatar image
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
                onClick={toggleLogout}
              />
              <span>{username}</span>
              {showLogout && (
                <div className="absolute top-full mt-2 bg-white shadow-md rounded p-2">
                  <button onClick={handleLogout} className="text-red-600">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
