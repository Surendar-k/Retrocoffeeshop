import PropTypes from 'prop-types';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { FaQuoteRight } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close (x) icon

const Reviewscard = ({ id, img, title, review, rating, onDelete }) => {
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        return (
            <>
                {[...Array(fullStars)].map((_, i) => <BsStarFill key={i} className="text-yellow-400" />)}
                {halfStar && <BsStarHalf className="text-yellow-400" />}
                {[...Array(emptyStars)].map((_, i) => <BsStar key={i} className="text-yellow-400" />)}
            </>
        );
    };

    return (
        <div className="relative flex flex-col w-full lg:w-2/6 bg-white p-7 rounded-lg shadow-lg gap-5">
            <button
                className="absolute top-2 right-2 p-2 cursor-pointer text-gray-800 hover:text-red-600"
                onClick={() => onDelete(id)} // Call onDelete with id
            >
                <AiOutlineClose size={24} />
            </button>
            <div className="flex flex-row items-center lg:justify-start justify-center">
                <div className="w-24 h-24">
                    <img src={img} alt="reviewimg" className="rounded-full w-full h-full object-cover" />
                </div>
                <div className="ml-5">
                    <h2 className="font-semibold text-xl">{title}</h2>
                    <div className="flex">
                        {renderStars(rating)}
                    </div>
                </div>
                <span className="ml-auto">
                    <FaQuoteRight className="text-gray-300" size={42} />
                </span>
            </div>
            <p className="mt-5 text-gray-600">{review}</p>
        </div>
    );
};

// PropTypes definition
Reviewscard.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired, // Add onDelete prop
};

export default Reviewscard;
