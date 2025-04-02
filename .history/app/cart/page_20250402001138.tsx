'use client';

import { useCart } from '@/app/context/CartContext';
import { FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Separator } from "@/app/components/ui/Separator";

export default function CartPage() {
  const { cartItems, removeFromCart, getTotal, clearCart } = useCart();
  const total = getTotal().toFixed(2);

  const handleCheckout = () => {
    alert('Checkout not implemented yet, but your total is $' + total);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-10"
        >
          <Link 
            href="/" 
            className="mr-4 p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label="Go back"
          >
            <FiArrowLeft className="text-xl" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center">
              <FiShoppingCart className="mr-3 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Shopping Cart
              </span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Review and manage your items</p>
          </div>
          {cartItems.length > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
            >
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </motion.span>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50"
            >
              <div className="mx-auto w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                <FiShoppingCart className="text-4xl text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-100">Your cart feels light</h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                No items in your cart yet. Start shopping to add products to your cart.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Discover Products
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="cart-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Cart Items List */}
              <Card className="border border-gray-700/50 rounded-xl overflow-hidden shadow-xl bg-gray-800/50 backdrop-blur-sm">
                <ScrollArea className="h-[400px]">
                  <CardContent className="p-0">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-5 hover:bg-gray-700/30 transition-colors duration-200 border-b border-gray-700/30 last:border-b-0"
                      >
                        <div className="flex items-center space-x-5">
                          <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                            ) : (
                              <span className="text-gray-400 text-xl font-medium">{item.name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <h2 className="font-medium text-gray-100">{item.name}</h2>
                            <p className="text-gray-400 text-sm mt-1">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-5">
                          <span className="font-semibold text-gray-100 min-w-[80px] text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200 hover:bg-red-900/20 rounded-full"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="text-lg" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </ScrollArea>
              </Card>

              {/* Summary Section */}
              <Card className="border border-gray-700/50 rounded-xl overflow-hidden shadow-xl bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6 text-gray-100">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-100">${total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-green-400 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax</span>
                      <span className="font-medium text-gray-300">Calculated at checkout</span>
                    </div>
                  </div>

                  <Separator className="bg-gray-700/50 my-4" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-gray-100">Total</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      ${total}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearCart}
                      className="flex-1 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium text-gray-100"
                    >
                      Clear All Items
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}