'use client';

import { useCart } from '@/app/context/CartContext';
import { FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function CartPage() {
  // EXISTING FUNCTIONALITY - NO CHANGES
  const { cartItems, removeFromCart, getTotal, clearCart } = useCart();
  const total = getTotal().toFixed(2);

  const handleCheckout = () => {
    alert('Checkout not implemented yet, but your total is $' + total);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Improved Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4 p-2 rounded-full hover:bg-gray-200 transition">
            <FiArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-3xl font-bold flex items-center">
            <FiShoppingCart className="mr-3 text-blue-600" />
            Your Cart
          </h1>
          {cartItems.length > 0 && (
            <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {/* Cart Content - Same Logic, Better UI */}
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">You haven't added any items yet</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items List */}
            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-lg">{item.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h2 className="font-medium">{item.name}</h2>
                      <p className="text-gray-500 text-sm">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-blue-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition"
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4 mb-6">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg text-blue-600">${total}</span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={clearCart}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}