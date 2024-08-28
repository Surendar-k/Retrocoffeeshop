import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OrderEntry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCart = location.state?.cart || [];
  const [cart, setCart] = useState(initialCart);
  const [isFinalized, setIsFinalized] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleBackToHome = () => {
    // Save cart to local storage before navigating
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/');
  };
  

  const handleRemoveItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index, delta) => {
    setCart(cart.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item
    ));
  };

  const handleProceedToCheckout = () => {
    setIsFinalized(true);
    setShowPayment(true);
  };

  const handleEditOrder = () => {
    setIsFinalized(false);
    setShowPayment(false);
  };

  const handlePayment = () => {
    // Placeholder function for payment processing
    console.log('Processing payment...');
  };

  const totalValue = cart
    .reduce((total, item) => total + parseFloat(item.value.slice(1)) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#d5bca4] to-[#a4714c] p-5">
      <button
        onClick={handleBackToHome}
        className="mb-4 bg-gray-700 text-white py-2 px-4 rounded"
      >
        Back to Home
      </button>
      <h1 className="text-center text-4xl font-semibold my-8">Order Entry</h1>
      {cart.length > 0 ? (
        <div className="flex flex-col max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Item</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Total</th>
                  {!isFinalized && (
                    <th className="border border-gray-300 p-2">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-2">{item.title} - {item.isHot ? 'Hot' : 'Cold'}</td>
                    <td className="border border-gray-300 p-2">${item.value}</td>
                    <td className="border border-gray-300 p-2 flex items-center justify-center space-x-2">
                      {!isFinalized && (
                        <>
                          <button
                            onClick={() => handleQuantityChange(index, -1)}
                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            readOnly
                            className="w-12 text-center border border-gray-300 rounded"
                          />
                          <button
                            onClick={() => handleQuantityChange(index, 1)}
                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                          >
                            +
                          </button>
                        </>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${(parseFloat(item.value.slice(1)) * item.quantity).toFixed(2)}
                    </td>
                    {!isFinalized && (
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="bg-red-500 text-white px-4 py-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between font-bold mt-4">
            <span>Total:</span>
            <span>${totalValue}</span>
          </div>
          {!isFinalized ? (
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleProceedToCheckout}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <button
                onClick={handleEditOrder}
                className="bg-green-500 text-white py-2 px-4 rounded mb-4"
              >
                Edit Order
              </button>
              {showPayment && (
                <div className="p-4 bg-white rounded shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Payment</h2>
                  <p className="mb-4">Total Bill: ${totalValue}</p>
                  <div className="mb-4">
                    <label className="block mb-2">Payment Method:</label>
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option value="credit-card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank-transfer">Bank Transfer</option>
                    </select>
                  </div>
                  <button
                    onClick={handlePayment}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-lg">No items in the cart.</p>
      )}
    </div>
  );
};

export default OrderEntry;
