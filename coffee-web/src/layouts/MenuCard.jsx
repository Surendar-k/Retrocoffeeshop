import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../layouts/Button'; 

const MenuCard = ({ img, title, value, onAddToCart }) => {
  const [isHot, setIsHot] = useState(true);

  const handleAddToCart = () => {
    onAddToCart({ title, value, isHot });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64">
      <img src={img} alt={title} className="w-full h-40 object-cover mb-4 rounded-lg" />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{value}</p>
      <div className="flex justify-between mb-4">
        <Button
          onClick={() => setIsHot(true)}
          className={`py-1 px-4 rounded-l ${isHot ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Hot
        </Button>
        <Button
          onClick={() => setIsHot(false)}
          className={`py-1 px-4 rounded-r ${!isHot ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Cold
        </Button>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white py-2 px-4 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

MenuCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default MenuCard;
