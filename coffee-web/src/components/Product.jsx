import { useState } from 'react';
import ProductCard from "../layouts/ProductCard";
import nespresso from "../assets/images/nespresso.png";
import chemex from "../assets/images/chemex.png";
import aeropress from "../assets/images/aeropress.png";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './Login/firebase'; // Ensure your Firebase setup is correctly imported

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

    const handlePlaceOrder = async () => {
        try {
            const ordersCollectionRef = collection(db, 'products');
            for (const item of cart) {
                await addDoc(ordersCollectionRef, {
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    timestamp: serverTimestamp(),
                });
            }
            alert('Order placed successfully! Redirecting to the payment gateway...');
            window.location.href = 'https://www.cashfree.com/payment-gateway-india/?utm_campaign=cf_searchads_pg_core_highintent_roi&utm_source=googleads&utm_medium=cpc&utm_content=697345046857&utm_term=payment%20gateway&utm_adgroup=&device=c&utm_matchtype=e&gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqN3en5A0z20rH3qmFQoi4b5qDcjgsq_g51YI6PGjlnDL5BOIv3RDCRoCUAoQAvD_BwE';
            setCart([]); // Clear the cart after placing the order
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order, please try again.');
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
                <ProductCard img={nespresso} title="Nespresso" price="$14.00" onAddToCart={() => handleAddToCart({ title: 'Nespresso', price: '$14.00', img: nespresso })} />
                <ProductCard img={chemex} title="Chemex" price="$10.50" onAddToCart={() => handleAddToCart({ title: 'Chemex', price: '$10.50', img: chemex })} />
                <ProductCard img={aeropress} title="Aeropress" price="$15.00" onAddToCart={() => handleAddToCart({ title: 'Aeropress', price: '$15.00', img: aeropress })} />
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
                {cart.length > 0 && (
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-green-500 text-white py-2 px-4 rounded mt-4 self-center"
                    >
                        Place Order
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product;
