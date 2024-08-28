import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCard from '../layouts/MenuCard';
import { db } from './Login/firebase';
import americano from '../assets/images/americano.png';
import choclatecoffee from '../assets/images/choclatecoffee.png';
import cappuccino from '../assets/images/cappuccino.png';
import masalachai from '../assets/images/masalachai.png';
import greentea from '../assets/images/greentea.png';
import mocha from '../assets/images/mocha.png';
import caramel_latteecoffee from '../assets/images/caramel_latteecoffee.png';
import kakako from '../assets/images/kakako.png';
import coldbrew from '../assets/images/coldbrew.png';
import { doc, getDoc } from 'firebase/firestore';

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [userId] = useState("Surendar");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.title === item.title && cartItem.isHot === item.isHot
    );

    if (existingItemIndex >= 0) {
      const updatedCart = cart.map((cartItem, index) =>
        index === existingItemIndex
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleViewCart = () => {
    console.log('Navigating to OrderEntry with cart:', cart); // Debugging line
    navigate('/orderentry', { state: { cart } });
  };

  const totalValue = cart
    .reduce((total, item) => total + parseFloat(item.value.slice(1)) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-gradient-to-r from-[#d5bca4] to-[#a4714c]">
      <h1 className="font-semibold text-center text-4xl mt-25 mb-20 pt-10">Our Menu</h1>
      {user && (
        <div className="text-center mb-8">
          <p className="font-semibold">Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <div className="flex flex-wrap pb-8 gap-8 justify-center">
        <MenuCard img={americano} title="Americano" value="$5.00" onAddToCart={handleAddToCart} />
        <MenuCard img={choclatecoffee} title="Chocolate Coffee" value="$4.50" onAddToCart={handleAddToCart} />
        <MenuCard img={cappuccino} title="Cappuccino" value="$4.00" onAddToCart={handleAddToCart} />
        <MenuCard img={masalachai} title="Masala Chai" value="$3.00" onAddToCart={handleAddToCart} />
        <MenuCard img={greentea} title="Green Tea" value="$3.50" onAddToCart={handleAddToCart} />
        <MenuCard img={mocha} title="Mocha" value="$4.50" onAddToCart={handleAddToCart} />
        <MenuCard img={caramel_latteecoffee} title="Caramel Latte Coffee" value="$4.50" onAddToCart={handleAddToCart} />
        <MenuCard img={kakako} title="Kakako" value="$5.50" onAddToCart={handleAddToCart} />
        <MenuCard img={coldbrew} title="Cold Brew" value="$2.50" onAddToCart={handleAddToCart} />
      </div>
      <div className="flex flex-col bg-lime-50 w-full rounded-lg p-4">
        {cart.length > 0 && (
          <>
            <div className="flex flex-row justify-between p-2 mt-4 border-t font-bold">
              <span>Total:</span>
              <span>${totalValue}</span>
            </div>
            <button
              onClick={handleViewCart}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              View Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
