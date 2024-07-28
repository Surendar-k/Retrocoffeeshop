import PropTypes from 'prop-types';
import { BsStarHalf, BsStarFill } from 'react-icons/bs';
import Button from './Button';

const ProductCard = ({ img, title, price, onAddToCart }) => {
    const handleClick = () => {
        onAddToCart({ title, price });
    };

    return (
        <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg shadow-md">
            <img src={img} alt={title} className="rounded-lg w-full h-64 object-cover" />
            <div className="flex flex-col items-center mt-5 gap-3">
                <h2 className="font-semibold text-xl">{title}</h2>
                <div className="flex">
                    <BsStarFill className="text-brightColor" />
                    <BsStarFill className="text-brightColor" />
                    <BsStarFill className="text-brightColor" />
                    <BsStarFill className="text-brightColor" />
                    <BsStarHalf className="text-brightColor" />
                </div>
                <h3>{price}</h3>
                <Button title="ADD TO CART" onClick={handleClick} />
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
