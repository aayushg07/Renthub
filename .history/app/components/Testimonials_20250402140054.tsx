'use client';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRef } from 'react';

const testimonials = [
  {
    name: 'Aayush G.',
    rating: 5,
    text: 'Renting the Sony A7IV for my vacation was seamless! The camera arrived perfectly calibrated and helped me capture stunning photos.',
    role: 'Travel Photographer'
  },
  {
    name: 'Ronil P.',
    rating: 4,
    text: 'As a content creator, I regularly rent lenses from GadgetRent. Their flexible plans save me thousands in equipment costs.',
    role: 'YouTuber'
  },
  {
    name: 'Oms N.',
    rating: 5,
    text: 'The MacBook Pro M2 was flawless for my video editing project. Way better than buying for short-term needs!',
    role: 'Video Editor'
  },
  {
    name: 'Glen M.',
    rating: 5,
    text: 'DJI Air 3 drone rental helped me win a real estate photography contract. Professional quality without the investment!',
    role: 'Real Estate Agent'
  },
  {
    name: 'Sarah K.',
    rating: 4,
    text: 'PS5 rental made my son\'s birthday unforgettable. Setup was a breeze and the console was like new.',
    role: 'Parent'
  },
  {
    name: 'David T.',
    rating: 5,
    text: 'Rented a RED Komodo for a commercial shoot. Equipment was pristine and support was available 24/7.',
    role: 'Filmmaker'
  },
  {
    name: 'Priya S.',
    rating: 5,
    text: 'Meta Quest 3 was perfect for our VR demo at the tech conference. Will definitely rent again!',
    role: 'Tech Evangelist'
  }
];

const HomePage = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainer.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Loved by Creators & Professionals
          </h2>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            Do not just take our word for it
          </p>
        </div>

        <div className="relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-blue-600" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-blue-600" />
          </button>

          {/* Testimonial Cards */}
          <div 
            ref={scrollContainer}
            className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide"
          >
            <div className="flex space-x-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={18}
                        className={`mr-1 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicators (for mobile) */}
        <div className="flex justify-center space-x-2 mt-4 md:hidden">
          {testimonials.map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-gray-300"
            />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">10K+</div>
            <div className="text-sm md:text-base text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">4.8★</div>
            <div className="text-sm md:text-base text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">500+</div>
            <div className="text-sm md:text-base text-gray-600">Devices</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">24/7</div>
            <div className="text-sm md:text-base text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;