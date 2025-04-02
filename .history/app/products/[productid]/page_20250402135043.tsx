'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  rentPerDay?: number;
  imageUrl?: string;
  category?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ProductDetailPage() {
  const { productid } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mode, setMode] = useState<'buy' | 'rent' | null>(null);
  const [days, setDays] = useState(1);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const taxRate = 0.1;

  useEffect(() => {
    if (user) {
      setUserInfo(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!productid) return;
    fetch(`/api/products/${productid}`)
      .then(res => res.json())
      .then(data => {
        if (!data._id) return setProduct(null);
        setProduct(data);
      })
      .catch(() => setProduct(null));
  }, [productid]);

  if (product === null) {
    return <div className="p-8 text-red-400">Product not found or failed to load.</div>;
  }

  const rentTotal = product.rentPerDay ? product.rentPerDay * days : 0;
  const rentTotalWithTax = (rentTotal + rentTotal * taxRate).toFixed(2);
  const buyTotalWithTax = (product.price + product.price * taxRate).toFixed(2);

  const handleRentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const total = Number(rentTotalWithTax);

    const res = await fetch('/api/rent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product._id,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        days,
        total,
      }),
    });

    if (res.ok) {
      alert('Rent request submitted!');
      setUserInfo(prev => ({ ...prev, phone: '', address: '' }));
      setDays(1);
      setMode(null);
    } else {
      alert('Failed to submit rent request. Please try again.');
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl || '',
      quantity: 1,
    };
    addToCart(cartItem);
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg shadow-lg object-cover w-full h-80"
            />
          ) : (
            <div className="bg-gray-700 w-full h-80 flex items-center justify-center rounded-lg">
              No Image
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <p className="mb-2">
            <span className="font-semibold text-green-400">Buy:</span> ${product.price}
          </p>
          {product.rentPerDay && (
            <p className="mb-4">
              <span className="font-semibold text-yellow-400">Rent Per Day:</span> ${product.rentPerDay}
            </p>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setMode('buy')}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Buy
            </button>
            {product.rentPerDay && (
              <button
                onClick={() => setMode('rent')}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Rent
              </button>
            )}
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Buy Summary */}
      {mode === 'buy' && (
        <div className="mt-10 bg-gray-900 border border-gray-700 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Buy Summary</h2>
          <p><strong>Product:</strong> {product.name}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Tax (10%):</strong> ${product.price * taxRate}</p>
          <p className="text-lg mt-2 text-green-400">
            <strong>Total:</strong> ${buyTotalWithTax}
          </p>
          <p className="mt-4 text-sm text-gray-400">
            * This is just a preview. Checkout and payment coming soon.
          </p>
        </div>
      )}

      {/* Rent Form */}
      {mode === 'rent' && (
        !user ? (
          <div className="mt-10 bg-yellow-100 text-yellow-800 p-6 rounded border border-yellow-300">
            Please log in to rent this product.
          </div>
        ) : (
          <form onSubmit={handleRentSubmit} className="mt-10 bg-gray-900 border border-gray-700 rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Rent Form</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={userInfo.name}
                placeholder="Full Name"
                disabled
                className="px-4 py-2 rounded bg-gray-800 border border-gray-600 cursor-not-allowed"
              />
              <input
                type="email"
                value={userInfo.email}
                placeholder="Email"
                disabled
                className="px-4 py-2 rounded bg-gray-800 border border-gray-600 cursor-not-allowed"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
              />
              <input
                type="text"
                placeholder="Address"
                value={userInfo.address}
                onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">How many days?</label>
              <input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-32 px-4 py-2 rounded bg-gray-800 border border-gray-600"
              />
            </div>

            <div className="text-lg text-yellow-400">
              <strong>Total Rent:</strong> ${rentTotalWithTax}
            </div>
            <p className="mt-2 text-sm text-gray-400">
              * 10% tax applied. This is a preview only.
            </p>
            <button type="submit" className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded">
              Submit Rent Request
            </button>
          </form>
        )
      )}
    </div>
  );
}
