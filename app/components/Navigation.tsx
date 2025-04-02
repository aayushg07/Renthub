"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        scrolling
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      } fixed w-full top-0 left-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Main Links */}
            <div className="flex space-x-6">
              <Link 
                href="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-1 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-1 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-1 py-2 text-sm font-medium transition-colors"
              >
                Products
              </Link>

              {/* Regular users */}
              {user?.role !== 'admin' && (
                <>
                  <Link 
                    href="/contact" 
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-1 py-2 text-sm font-medium transition-colors"
                  >
                    Contact
                  </Link>
                  <Link 
                    href="/myrequests" 
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-1 py-2 text-sm font-medium transition-colors"
                  >
                    My Requests
                  </Link>
                </>
              )}

              {/* Admin users */}
              {user?.role === 'admin' && (
                <>
                  <Link 
                    href="/messages" 
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-1 py-2 text-sm font-medium transition-colors"
                  >
                    Messages
                  </Link>
                  <Link 
                    href="/admin/contact" 
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-1 py-2 text-sm font-medium transition-colors"
                  >
                    Send Contact
                  </Link>
                </>
              )}
            </div>

            {/* Auth/Cart Section */}
            <div className="flex items-center space-x-4 ml-6">
              <Link
                href="/cart"
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700">
                      <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.name}
                    </span>
                  </div>
                  <button 
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/login" 
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-md transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/products" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>

            {user?.role !== 'admin' && (
              <>
                <Link 
                  href="/contact" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  href="/myrequests" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  My Requests
                </Link>
              </>
            )}

            {user?.role === 'admin' && (
              <>
                <Link 
                  href="/messages" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link 
                  href="/admin/contact" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Send Contact
                </Link>
              </>
            )}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <div className="px-5 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700">
                      <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Welcome, {user.name}
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-5 space-y-3">
                <Link
                  href="/login"
                  className="w-full block text-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full block text-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-md transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}