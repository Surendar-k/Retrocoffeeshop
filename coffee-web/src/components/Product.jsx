import { useState } from 'react';
import ProductCard from "../layouts/ProductCard";
import nespresso from "../assets/images/nespresso.png";
import chemex from "../assets/images/chemex.png";
import aeropress from "../assets/images/aeropress.png";

const Product = () => {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (item) => {
        console.log('Adding to cart:', item); // Debugging log
        const existingItemIndex = cart.findIndex(cartItem => cartItem.title === item.title);

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
        const itemValue = parseFloat(item.price.replace('$', ''));
        return sum + itemValue * item.quantity;
    }, 0).toFixed(2);

    console.log('Cart contents:', cart); // Debugging log

    return (
        <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-gradient-to-r from-[#d5c6b3] to-[#c38e5a]">
            <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">Our Products</h1>
            <div className="flex flex-col lg:flex-row gap-12 justify-center">
                <ProductCard img={nespresso} title="Nespresso" onAddToCart={handleAddToCart} />
                <ProductCard img={chemex} title="Chemex" onAddToCart={handleAddToCart} />
                <ProductCard img={aeropress} title="Aeropress" onAddToCart={handleAddToCart} />
            </div>
            <div className="flex flex-col bg-lime-50 w-full rounded-lg p-4 mt-8">
                <h2 className="font-bold text-center">Here is Your Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-center">Your cart is empty</p>
                ) : (
                    <>
                        {cart.map((item, index) => (
                            <div key={index} className="flex flex-row justify-between p-2 border-b">
                                <span>{item.title} - {item.price} x {item.quantity}</span>
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

export default Product;
