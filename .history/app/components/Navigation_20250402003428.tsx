"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
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
          ? "bg-white bg-opacity-60 backdrop-blur-lg shadow-md dark:bg-gray-900 dark:bg-opacity-80"
          : "bg-transparent"
      } text-gray-700 dark:text-gray-200 fixed w-full top-0 left-0 z-50 transition-all ease-in-out duration-300`}
    >
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-lg hover:text-gray-400 dark:hover:text-gray-300 transition hover:scale-105">
            Home
          </Link>
          <Link href="/about" className="text-lg hover:text-gray-400 dark:hover:text-gray-300 transition hover:scale-105">
            About
          </Link>
          <Link href="/products" className="text-lg hover:text-gray-400 dark:hover:text-gray-300 transition hover:scale-105">
            Products
          </Link>

          {/* Regular users */}
          {user?.role !== 'admin' && (
            <>
              <Link href="/contact" className="text-lg hover:text-gray-400 dark:hover:text-gray-300 transition hover:scale-105">
                Contact
              </Link>
              <Link href="/myrequests" className="text-lg hover:text-gray-400 dark:hover:text-gray-300 transition hover:scale-105">
                My Requests
              </Link>
            </>
          )}

          {/* Admin users */}
          {user?.role === 'admin' && (
            <>
              <Link href="/messages" className="text-lg hover:text-gray-400 dark:hover:text-gray-300 transition hover:scale-105">
                Messages
              </Link>
              <Link href="/admin/contact" className="text-lg hover:text-gray-400 dark:hover:text-gray-300 transition hover:scale-105">
                Send Contact
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/cart"
            className="relative flex items-center text-lg hover:text-gray-400 dark:hover:text-gray-300 transition hover:scale-105"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center text-xs font-semibold bg-red-500 text-white w-5 h-5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <span className="text-lg font-medium px-2 py-2 text-gray-700 dark:text-gray-200">
                Welcome, {user.name}
              </span>
              <button 
                onClick={logout}
                className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-md text-lg font-medium text-white transition hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-md text-lg font-medium text-white transition hover:scale-105">
                Login
              </Link>
              <Link href="/signup" className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-md text-lg font-medium text-white transition hover:scale-105">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-700 dark:text-gray-200" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col bg-gray-800 dark:bg-gray-900 p-4 space-y-3 rounded-lg">
          <Link href="/" className="text-white hover:text-gray-300 transition hover:scale-105">Home</Link>
          <Link href="/products" className="text-white hover:text-gray-300 transition hover:scale-105">Products</Link>
          <Link href="/about" className="text-white hover:text-gray-300 transition hover:scale-105">About</Link>

          {user?.role !== 'admin' && (
            <>
              <Link href="/contact" className="text-white hover:text-gray-300 transition hover:scale-105">Contact</Link>
              <Link href="/myrequests" className="text-white hover:text-gray-300 transition hover:scale-105">My Requests</Link>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link href="/messages" className="text-white hover:text-gray-300 transition hover:scale-105">Messages</Link>
              <Link href="/admin/contact" className="text-white hover:text-gray-300 transition hover:scale-105">Send Contact</Link>
            </>
          )}

          <Link href="/cart" className="text-white hover:text-gray-300 transition hover:scale-105">
            🛒 Cart ({cartCount})
          </Link>

          {user ? (
            <>
              <span className="text-white font-medium">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-gray-700 px-6 py-2 rounded-md text-white text-lg hover:bg-gray-600 transition hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-md text-white text-lg transition hover:scale-105">Login</Link>
              <Link href="/signup" className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-md text-white text-lg transition hover:scale-105">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
