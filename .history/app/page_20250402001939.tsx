"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./components/Logo";
import Featured from "./components/RecentlyViewed"
import {
  FaDollarSign,
  FaLock,
  FaBoxOpen,
  FaAngleDoubleDown,
} from "react-icons/fa";
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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center py-20 px-6 min-h-screen text-white bg-gradient-to-br from-blue-700 to-blue-900">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img 
      src="./hero.avif"
      alt="Background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40"></div>
  </div>

  {/* Content */}
  <div className="max-w-4xl mx-auto space-y-6 relative z-10">
  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 flex flex-wrap items-center justify-center gap-4 text-center">
  Welcome to 
  <span className="inline-block transform scale-150 pl-6"> 
    <Logo />
  </span>
</h1>

    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
      Rent high-end gadgets like cameras, gaming consoles, laptops, and more, without the hefty price tag. Your next adventure starts here.
    </p>

    <blockquote className="text-lg italic text-blue-100/90 max-w-3xl mx-auto my-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
      &quot;RentHub made it so easy to access top-tier gadgets for my work and leisure. Affordable, reliable, and hassle-free.&quot;
      <footer className="mt-3 text-base font-semibold text-blue-200">
        - John Doe, Freelancer
      </footer>
    </blockquote>

    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
        Get Started
      </button>
      <button className="px-8 py-4 border-2 border-blue-300 hover:border-white text-white font-semibold rounded-lg hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
        Learn More
      </button>
    </div>
  </div>

  {showScrollIndicator && (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium mb-1">Scroll Down</span>
        <FaAngleDoubleDown className="w-5 h-5" />
      </div>
    </div>
  )}
</header>


      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose <span className="text-blue-600">RentHub</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaDollarSign size={30} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Affordable</h3>
              <p className="text-gray-600 text-center">
                Rent premium gadgets at prices that won't break the bank. Our flexible plans fit any budget.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLock size={30} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Secure</h3>
              <p className="text-gray-600 text-center">
                All transactions are protected with advanced security measures and verified users.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBoxOpen size={30} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Wide Selection</h3>
              <p className="text-gray-600 text-center">
                From the latest cameras to high-end gaming rigs, we've got all your tech needs covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            About <span className="text-blue-600">RentHub</span>
          </h2>
          <div className="space-y-6 text-lg text-gray-600">
            <p>
              Founded in 2023, RentHub was born from a simple idea: technology should be accessible to everyone.
            </p>
            <p>
              We believe you shouldn't have to pay premium prices for temporary access to the gadgets you need.
            </p>
            <p>
              Our platform connects tech enthusiasts with quality equipment, creating a community built on trust and convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Simple, <span className="text-blue-600">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            No hidden fees. Rent what you need, when you need it.
          </p>
          
          {/* Pricing cards would go here */}
          <div className="bg-blue-50 rounded-xl p-8 max-w-2xl mx-auto">
            <p className="text-gray-600">Pricing cards coming soon!</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            What Our <span className="text-blue-600">Customers</span> Say
          </h2>
          <Testimonials />
        </div>
      </section>
<div className="my-4">
  <Featured/>
  </div>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Rent Your Next Gadget?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying hassle-free tech rentals today.
          </p>
          <Link href="/signup">
  <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
    Sign Up Now - It's Free
  </button>
</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;