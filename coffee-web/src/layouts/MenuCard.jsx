import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";

const MenuCard = ({ img, title, value, onAddToCart }) => {
  const [isHot, setIsHot] = useState(true);

  const handleAddToMenu = async () => {
    try {
      const response = await fetch('http://localhost:5000/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          value,
          isHot,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Menu item added:', data);
      } else {
        console.error('Error adding menu item:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg shadow-md">
      <div className="flex justify-center">
        <img className="w-full h-48 object-cover rounded-xl" src={img} alt={title} />
      </div>
      <div className="p-2 mt-5">
        <div className="flex flex-row justify-between items-center">
          <h3 className="font-semibold text-xl">{title}</h3>
          <h3 className="font-semibold text-xl">{value}</h3>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <div className="flex gap-2">
            <button 
              onClick={() => setIsHot(true)}
              className={`px-3 text-sm hover:bg-black border-2 border-[#AB6B2E] bg-[#FFDCAB] hover:text-[#AB6B2E] transition-all rounded-lg ${isHot ? 'text-[#AB6B2E]' : 'text-gray-600 '}`}
            >
              Hot
            </button>
            <button
              onClick={() => setIsHot(false)}
              className={`px-3 text-sm hover:bg-black border-2 border-[#AB6B2E] bg-[#FFDCAB] hover:text-[#AB6B2E] transition-all rounded-lg ${!isHot ? 'text-[#AB6B2E]' : 'text-gray-600'}`}
            >
              Cold
            </button>
          </div>
          <span
            onClick={() => { 
              onAddToCart({ title, value, isHot });
              handleAddToMenu(); // Add item to menu
            }}
            className="flex items-center bg-[#FFDCAB] px-3 py-2 rounded-full cursor-pointer"
          >
            <FaShoppingCart size={20} />
          </span>
        </div>
      </div>
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
