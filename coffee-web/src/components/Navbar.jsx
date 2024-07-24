import { SiCoffeescript } from "react-icons/si";
import { Link } from "react-scroll"; // Ensure this import is correct
import Button from "../layouts/Button";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";

const Navbar = () => {
    const [menu, setMenu] = useState(false);

    const handleChange = () => {
        setMenu(!menu);
    };

    const closeMenu = () => {
        setMenu(false);
    };

    return (
        <div>
            <div className="flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-[#ebc7b1] to-[#562d20]">
                <div className="flex flex-row items-center cursor-pointer gap-2">
                    <span>
                        <SiCoffeescript size={25} />
                    </span>
                    <h1 className="text-xl font-semibold">CafeeSpot</h1>
                </div>
                <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
                    <Link to="home" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200" onClick={closeMenu}>
                        Home
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </Link>
                    <Link to="menu" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200">
                        Menu
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </Link>
                    <Link to="aboutus" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200">
                        About Us
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </Link>
                    <Link to="products" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200">
                        Products
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </Link>
                    <Link to="reviews" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-yellow-200">
                        Reviews
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </Link>
                </nav>
                <div className="hidden lg:flex items-center">
                    <Button title="Login" />
                </div>
                <div className="md:hidden flex items-center">
                    {
                        menu ? (
                            <AiOutlineClose size={25} onClick={handleChange} />
                        ) : (
                            <AiOutlineMenuUnfold size={25} onClick={handleChange} />
                        )
                    }
                </div>
            </div>
            <div className={`lg:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}>
                <Link to="home" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-brightColor" onClick={closeMenu}>
                    Home
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </Link>
                <Link to="menu" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-brightColor" onClick={closeMenu}>
                    Menu
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </Link>
                <Link to="aboutus" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-brightColor" onClick={closeMenu}>
                    About Us
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </Link>
                <Link to="products" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-brightColor" onClick={closeMenu}>
                    Products
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </Link>
                <Link to="reviews" spy={true} smooth={true} duration={500} className="group relative inline-block cursor-pointer hover:text-brightColor" onClick={closeMenu}>
                    Reviews
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </Link>
                <Button title="Login" />
            </div>
        </div>
    );
};

export default Navbar;
