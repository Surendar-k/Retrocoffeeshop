import { SiCoffeescript } from "react-icons/si";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ isAuthenticated, username }) => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="w-full h-20 px-4 shadow-md z-10 bg-yellow-300 fixed top-0">
      <div className="flex justify-between items-center h-full w-full max-w-6xl mx-auto">
        <div className="flex items-center">
          <SiCoffeescript size={30} className="text-black mr-2" />
          <h1 className="text-black text-2xl font-bold">CoffeeSpot</h1>
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
          {isAuthenticated ? (
            <div className="flex items-center group relative inline-block cursor-pointer hover:text-yellow-200">
              <img
                src="../assets/images/defaultavatar.png" // Replace with the path to the user's avatar image
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{username}</span>
            </div>
          ) : (
            <RouterLink to="/login" className="group relative inline-block cursor-pointer hover:text-yellow-200">
              Login
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </RouterLink>
          )}
        </nav>
        <div className="md:hidden flex items-center">
          <div onClick={handleChange}>
            {menu ? <AiOutlineClose size={25} /> : <AiOutlineMenuUnfold size={25} />}
          </div>
        </div>
      </div>
      <nav className={menu ? "md:hidden" : "hidden"}>
        <div className="flex flex-col items-center text-lg font-medium gap-8">
          <ScrollLink to="home" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200" onClick={closeMenu}>
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
          {isAuthenticated ? (
            <div className="flex items-center group relative inline-block cursor-pointer hover:text-yellow-200">
              <img
                src="../assets/images/defaultavatar.png" // Replace with the path to the user's avatar image
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{username}</span>
            </div>
          ) : (
            <RouterLink to="/login" className="group relative inline-block cursor-pointer hover:text-yellow-200">
              Login
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </RouterLink>
          )}
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};

export default Navbar;
