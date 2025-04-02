'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaDollarSign, FaLock, FaBoxOpen, FaAngleDoubleDown, FaStar, FaUserFriends, FaMobileAlt, FaChartLine, FaHeadset } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import RecentlyViewed from "./components/RecentlyViewed";
import Testimonials from "./components/Testimonials";

const HomePage = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { value: "10,000+", label: "Happy Customers", icon: <FaUserFriends className="text-3xl" /> },
    { value: "1,200+", label: "Devices Available", icon: <FaMobileAlt className="text-3xl" /> },
    { value: "98%", label: "Satisfaction Rate", icon: <FaChartLine className="text-3xl" /> },
    { value: "24/7", label: "Customer Support", icon: <FaHeadset className="text-3xl" /> }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Banner */}
      <section className="relative py-32 px-6 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-purple-700/90 dark:from-blue-900/90 dark:to-purple-900/90 z-0">
          <img 
            src="./hero.avif"
            alt="Tech gadgets background" 
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Premium Tech Without the Price Tag
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Rent high-end cameras, gaming consoles, laptops and more - flexible plans for every need and budget.
          </p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 mx-auto w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/products"
                className="block w-full text-center px-8 py-4 bg-white text-blue-800 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Browse Gadgets
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <button className="block w-full text-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                How It Works
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium mb-1 text-white/80">Explore More</span>
              <FaAngleDoubleDown className="w-6 h-6 text-white/80" />
            </div>
          </motion.div>
        )}
      </section>

      {/* Rest of your sections remain the same */}
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
        {/* ... existing stats section content ... */}
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        {/* ... existing features section content ... */}
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        {/* ... existing featured products section content ... */}
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        {/* ... existing testimonials section content ... */}
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        {/* ... existing final CTA section content ... */}
      </section>
    </div>
  );
};

export default HomePage;