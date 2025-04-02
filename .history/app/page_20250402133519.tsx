'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaDollarSign, FaLock, FaBoxOpen, FaAngleDoubleDown, FaStar, FaUserFriends, FaMobileAlt, FaChartLine, FaHeadset } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import RecentlyViewed from "./components/RecentlyViewed";
import Testimonials from "./components/Testimonials";
import Image from 'next/image';

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
          <Image 
            src="/hero.avif"
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-16"
        >
          The <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">RentHub</span> Advantage
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaDollarSign className="text-blue-600 dark:text-blue-400 text-4xl mb-4" />,
              title: "Affordable Pricing",
              content: "Access premium tech at a fraction of retail prices with our flexible rental plans."
            },
            {
              icon: <FaLock className="text-purple-600 dark:text-purple-400 text-4xl mb-4" />,
              title: "Secure Transactions",
              content: "Bank-level encryption and verified users ensure your rentals are always safe."
            },
            {
              icon: <FaBoxOpen className="text-green-600 dark:text-green-400 text-4xl mb-4" />,
              title: "Massive Selection",
              content: "From DSLRs to VR headsets, we've got all the tech you need in one place."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
              Hot Picks
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Gadgets</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Most popular rentals this month
            </p>
          </motion.div>
          <RecentlyViewed />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Loved by <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Creators</span>
          </h2>
        </motion.div>
        <Testimonials />
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white p-8"
        >
          <IoPaperPlane className="w-12 h-12 mx-auto mb-6 text-blue-300" />
          <h2 className="text-3xl font-bold mb-6">
            Ready for Your Next Tech Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of creators, gamers and professionals who rent smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/signup"
                className="px-8 py-4 bg-white text-blue-800 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Started - It&apos;s Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/products"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Browse Gadgets
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;