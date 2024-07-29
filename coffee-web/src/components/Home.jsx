
import { Link as ScrollLink } from 'react-scroll';
import Button from '../layouts/Button';
import img from '../assets/images/cupcoffee.png';
import { MdFreeBreakfast } from 'react-icons/md';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 gap-10 bg-gradient-to-r from-[#d5c6b3] to-[#4c372e]">
            <div className="w-full lg:w-2/4 space-y-4 mt-14 lg:mt-0 text-center lg:text-start ">
                <h1 className="font-semibold text-5xl leading-tight">
                    Experience the Magic of Every Sip...
                    <MdFreeBreakfast className="flex flex-row" />
                </h1>
                <p className="mt-4">Awaken your senses with every sip of our expertly crafted coffee.</p>
                <div className="flex flex-row gap-10 mt-6">
                    <ScrollLink to="menu" smooth={true} duration={500}>
                        <Button title="MENU" />
                    </ScrollLink>
                    <ScrollLink to="footer" smooth={true} duration={500}>
                        <Button title="CONTACT" />
                    </ScrollLink>
                </div>
            </div>
            <div className="w-full lg:w-2/4 flex justify-center items-center">
                <img src={img} alt="Cup of coffee" className="w-full h-auto object-cover" />
            </div>
        </div>
    );
};

export default Home;
