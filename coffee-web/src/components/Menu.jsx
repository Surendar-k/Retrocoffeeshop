import MenuCard from "../layouts/MenuCard";
import cappuccino from "../assets/images/cappuccino.png";
import caramel_latteecoffee from "../assets/images/caramel_latteecoffee.png";
import choclatecoffee from "../assets/images/choclatecoffee.png";
import greentea from "../assets/images/greentea.png";
import masalachai from "../assets/images/masalachai.png";
import mocha from "../assets/images/mocha.png";
import americano from "../assets/images/americano.png";
import kakako from "../assets/images/kakako.png";
import coldbrew from "../assets/images/coldbrew.png";
import { useState } from "react";

const Menu = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.title === item.title && cartItem.isHot === item.isHot);

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

  const totalValue = cart.reduce((sum, item) => {
    const itemValue = parseFloat(item.value.replace('$', ''));
    return sum + itemValue * item.quantity;
  }, 0).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-gradient-to-r from-[#d5bca4] to-[#a4714c] ">
      <h1 className="font-semibold text-center text-4xl mt-25 mb-20 pt-10">Our Menu</h1>
      <div className="flex flex-wrap pb-8 gap-8 justify-center">
        <MenuCard img={americano} title="Americano" value="$5.00" onAddToCart={item => handleAddToCart(item)} />
        <MenuCard img={choclatecoffee} title="Chocolate Coffee" value="$4.50" onAddToCart={item => handleAddToCart(item)} />
        <MenuCard img={cappuccino} title="Cappuccino" value="$4.00" onAddToCart={item => handleAddToCart(item)} />
        <MenuCard img={masalachai} title="Masala Chai" value="$3.00" onAddToCart={item => handleAddToCart(item)} />
        <MenuCard img={greentea} title="Green Tea" value="$3.50" onAddToCart={item => handleAddToCart(item)} />
        <MenuCard img={mocha} title="Mocha" value="$4.50" onAddToCart={item => handleAddToCart(item)} />
        <MenuCard img={caramel_latteecoffee} title="Caramel Latte Coffee" value="$4.50" onAddToCart={item => handleAddToCart(item)} />
        <MenuCard img={kakako} title="Kakako" value="$5.50" onAddToCart={item => handleAddToCart(item)} />
        <MenuCard img={coldbrew} title="Cold Brew" value="$2.50" onAddToCart={item => handleAddToCart(item)} />
      </div>
      <div className="flex flex-col bg-lime-50 w-full rounded-lg p-4">
        <h2 className="font-bold text-center">Here is Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="flex flex-row justify-between p-2 border-b">
                <span>{item.title} ({item.isHot ? 'Hot' : 'Cold'}) - {item.value} x {item.quantity}</span>
              </div>
            ))}
            <div className="flex flex-row justify-between p-2 mt-4 border-t font-bold">
              <span>Total:</span>
              <span>${totalValue}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
