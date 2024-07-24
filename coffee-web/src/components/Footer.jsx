import { SiCoffeescript } from 'react-icons/si';

const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-[#FFDCAB] to-[#AB6B2E] text-black rounded-t-3xl mt-8 md:mt-0">
            <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
                <div className="w-full md:w-1/4">
                    <h1 className="font-bold text-xl pb-4">CoffeeSpot <SiCoffeescript size={25} className="inline-block ml-2" /></h1>
                    <p className="text-sm">Welcome to our coffee haven! Explore our aromatic brews, savor artisanal flavors, and discover the perfect roast to elevate your daily ritual.</p>
                </div>
                <div>
                    <h1 className="font-bold text-xl pb-4 pt-5 md:pt-0">Links</h1>
                    <nav className="flex flex-col gap-2 font-semibold">
                        <a className="hover:text-yellow-600 transition-all cursor-pointer" href="/">Menu</a>
                        <a className="hover:text-yellow-600 transition-all cursor-pointer" href="/">About Us</a>
                        <a className="hover:text-yellow-600 transition-all cursor-pointer" href="/">Products</a>
                        <a className="hover:text-yellow-600 transition-all cursor-pointer" href="/">Reviews</a>
                    </nav>
                </div>
                <div>
                    <h1 className="font-bold text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
                    <nav className="flex flex-col gap-2">
                        <a className="hover:text-yellow-600 transition-all cursor-pointer" href="mailto:surendarkumar2k@gmail.com">surendarkumar2k@gmail.com</a>
                        <a className="hover:text-yellow-600 transition-all cursor-pointer" href="tel:+919487769772">+91 9487769772</a>
                    </nav>
                </div>
                <div>
                    <p className="text-center py-4">
                        © {new Date().getFullYear()} Developed by <span className="text-yellow-600">CoffeeSpot.SK</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Footer;
