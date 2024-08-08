import { useState, useEffect } from 'react';
import MenuCard from '../layouts/MenuCard';
import { db } from './Login/firebase'; // Import the Firestore instance
import americano from '../assets/images/americano.png';
import choclatecoffee from '../assets/images/choclatecoffee.png';
import cappuccino from '../assets/images/cappuccino.png';
import masalachai from '../assets/images/masalachai.png';
import greentea from '../assets/images/greentea.png';
import mocha from '../assets/images/mocha.png';
import caramel_latteecoffee from '../assets/images/caramel_latteecoffee.png';
import kakako from '../assets/images/kakako.png';
import coldbrew from '../assets/images/coldbrew.png';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore'; // Import these functions

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [userId] = useState("Surendar"); // Replace with actual user ID logic
  const [user, setUser] = useState(null); // State for user data

  useEffect(() => {
    // Fetch user data from Firestore
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

  const handleOrder = async () => {
    try {
      // Reference to the user's orders subcollection
      const ordersCollectionRef = collection(db, 'users', userId, 'orders');

      // Use a loop to add each item in the cart as a separate document in the orders subcollection
      for (const item of cart) {
        await addDoc(ordersCollectionRef, {
          title: item.title,
          value: item.value,
          quantity: item.quantity,
          isHot: item.isHot,
          timestamp: serverTimestamp(), // Add timestamp
        });
      }

      // Alert with a message and mock link to the payment gateway
      alert('Order placed successfully! Redirecting to the payment gateway...');
      
      // Redirect to a mock payment gateway URL (Replace with actual payment gateway URL)
      window.location.href = 'https://www.cashfree.com/payment-gateway-india/?utm_campaign=cf_searchads_pg_core_highintent_roi&utm_source=googleads&utm_medium=cpc&utm_content=697345046857&utm_term=payment%20gateway&utm_adgroup=&device=c&utm_matchtype=e&gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqN3en5A0z20rH3qmFQoi4b5qDcjgsq_g51YI6PGjlnDL5BOIv3RDCRoCUAoQAvD_BwE';

      setCart([]); // Clear the cart after placing the order
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order, please try again.');
    }
  };

  const totalValue = cart
    .reduce((sum, item) => {
      const itemValue = parseFloat(item.value.replace('$', ''));
      return sum + itemValue * item.quantity;
    }, 0)
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
        <MenuCard img={americano} title="Americano" value="$5.00" onAddToCart={(item) => handleAddToCart(item)} />
        <MenuCard img={choclatecoffee} title="Chocolate Coffee" value="$4.50" onAddToCart={(item) => handleAddToCart(item)} />
        <MenuCard img={cappuccino} title="Cappuccino" value="$4.00" onAddToCart={(item) => handleAddToCart(item)} />
        <MenuCard img={masalachai} title="Masala Chai" value="$3.00" onAddToCart={(item) => handleAddToCart(item)} />
        <MenuCard img={greentea} title="Green Tea" value="$3.50" onAddToCart={(item) => handleAddToCart(item)} />
        <MenuCard img={mocha} title="Mocha" value="$4.50" onAddToCart={(item) => handleAddToCart(item)} />
        <MenuCard img={caramel_latteecoffee} title="Caramel Latte Coffee" value="$4.50" onAddToCart={(item) => handleAddToCart(item)} />
        <MenuCard img={kakako} title="Kakako" value="$5.50" onAddToCart={(item) => handleAddToCart(item)} />
        <MenuCard img={coldbrew} title="Cold Brew" value="$2.50" onAddToCart={(item) => handleAddToCart(item)} />
      </div>
      <div className="flex flex-col bg-lime-50 w-full rounded-lg p-4">
        <h2 className="font-bold text-center">Here is Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="flex flex-row justify-between p-2 border-b">
                <span>
                  {item.title} ({item.isHot ? 'Hot' : 'Cold'}) - {item.value} x {item.quantity}
                </span>
              </div>
            ))}
            <div className="flex flex-row justify-between p-2 mt-4 border-t font-bold">
              <span>Total:</span>
              <span>${totalValue}</span>
            </div>
            <button
              onClick={handleOrder}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
