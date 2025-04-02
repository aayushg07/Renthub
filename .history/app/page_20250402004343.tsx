'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./components/Logo";
import RecentlyViewed from "./components/RecentlyViewed";
import { FaDollarSign, FaLock, FaBoxOpen, FaAngleDoubleDown, FaStar } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
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
      {/* Modern Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center py-20 md:py-32 px-6 min-h-screen text-white bg-gradient-to-br from-blue-800 to-blue-900 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-800/30 z-10"></div>
          <img
            src="./hero.avif"
            alt="Tech gadgets background"
            className="w-full h-full object-cover object-center animate-fade-in"
            loading="eager"
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto  relative z-10 px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Premium Tech</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100 animate-text-gradient">
                Without the Price Tag
              </span>
            </h1>
            
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Rent high-end cameras, gaming consoles, laptops and more - 
                flexible plans for every need and budget.
              </p>
            </div>
          </div>

          {/* Testimonial Badge */}
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-full px-4 py-2 md:px-6 md:py-3 border border-white/20 animate-fade-in-up">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-3 h-3 md:w-4 md:h-4" />
                ))}
              </div>
              <span className="text-xs md:text-sm font-medium">Trusted by 10,000+ customers</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-8">
            <Link 
              href="/products"
              className="px-6 py-3 md:px-8 md:py-4 bg-white text-blue-800 font-bold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Browse Gadgets
            </Link>
            <button className="px-6 py-3 md:px-8 md:py-4 border-2 border-white text-white font-semibold rounded-lg md:rounded-xl hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95">
              How It Works
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-xs md:text-sm font-medium mb-1 text-white/80">Explore More</span>
              <FaAngleDoubleDown className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
            </div>
          </div>
        )}
      </header>

      {/* Features Section - Card Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 text-xs md:text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 md:mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              The <span className="text-blue-600">RentHub</span> Advantage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <FaDollarSign className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />,
                title: "Affordable Pricing",
                description: "Access premium tech at a fraction of retail prices with our flexible rental plans."
              },
              {
                icon: <FaLock className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />,
                title: "Secure Transactions",
                description: "Bank-level encryption and verified users ensure your rentals are always safe."
              },
              {
                icon: <FaBoxOpen className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />,
                title: "Massive Selection",
                description: "From DSLRs to VR headsets, we've got all the tech you need in one place."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block px-3 py-1 text-xs md:text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 md:mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              More Than Just <span className="text-blue-600">Rentals</span>
            </h2>
            <div className="space-y-4 md:space-y-5 text-gray-600 text-base md:text-lg">
              <p>
                Founded by tech enthusiasts frustrated with expensive ownership models, 
                RentHub makes premium technology accessible to everyone.
              </p>
              <p>
                We've helped over 10,000 customers create, play and work with gear they 
                couldn't otherwise afford.
              </p>
              <p>
                Our mission is simple: remove financial barriers to technology access.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-video bg-gray-200 shadow-lg md:shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                <div className="text-center p-6 text-white">
                  <IoPaperPlane className="w-12 h-12 mx-auto mb-4 text-white/80" />
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Our Team</h3>
                  <p className="text-white/90">Meet the people behind RentHub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 text-xs md:text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 md:mb-4">
              Hot Picks
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Featured <span className="text-blue-600">Gadgets</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Most popular rentals this month
            </p>
          </div>
          <RecentlyViewed />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 text-xs md:text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 md:mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Loved by <span className="text-blue-600">Creators</span>
            </h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <IoPaperPlane className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-blue-300 animate-float" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Ready for Your Next Tech Adventure?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-10 max-w-2xl mx-auto">
            Join thousands of creators, gamers and professionals who rent smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link 
              href="/signup"
              className="px-6 py-3 md:px-8 md:py-4 bg-white text-blue-800 font-bold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Get Started - It's Free
            </Link>
            <Link 
              href="/products"
              className="px-6 py-3 md:px-8 md:py-4 border-2 border-white text-white font-semibold rounded-lg md:rounded-xl hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Browse Gadgets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;