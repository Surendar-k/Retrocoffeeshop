/* eslint-disable react/no-unescaped-entities */
import aboutus from "../assets/images/aboutus.png";
const Aboutus = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 bg-gradient-to-r from-[#bb9d75] to-[#ca8f5b]">
            <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8 pt-2">About Us</h1>
            <div className="flex flex-col lg:flex-row items-center gap-5">
                <div className="w-full lg:w-2/4 pt-10">
                    <img src={aboutus} alt="About Us" className="rounded-lg shadow-lg" />
                </div>
                <div className="w-full lg:w-2/4 p-4 space-y-3">
                    <h2 className="font-semibold text-3xl">What Makes Our Coffee Special ?</h2>
                    <p>
                        Welcome to CoffeeSpot, where passion meets perfection in every cup. From our meticulously sourced beans to our expertly crafted brews, we promise a coffee experience that delights the senses. Join us and discover why CoffeeSpot is more than just a coffee shop—it's your go-to spot for exceptional coffee and community warmth.
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Aboutus;
