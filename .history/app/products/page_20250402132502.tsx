'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import RecentlyViewed from '../components/RecentlyViewed';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  rentPerDay?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [rentPerDay, setRentPerDay] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const { user, token } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [search, categoryFilter, products]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setFilteredProducts(data);

    const uniqueCategories: string[] = Array.from(
      new Set(data.map((p: Product) => p.category).filter((c: any): c is string => Boolean(c)))
    );
    setCategories(uniqueCategories);
  };

  const handleFilter = () => {
    let filtered = [...products];
    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }
    setFilteredProducts(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return setError('Only admins can manage products');

    try {
      if (editingId) {
        await updateProduct(editingId);
        setSuccessMessage('Product updated');
      } else {
        await addProduct();
        setSuccessMessage('Product added');
        setIsAddFormVisible(false);
      }
      resetForm();
      fetchProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Failed to save product');
    }
  };

  const addProduct = async () => {
    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
        rentPerDay: rentPerDay ? parseFloat(rentPerDay) : undefined,
      }),
    });
  };

  const updateProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
        rentPerDay: rentPerDay ? parseFloat(rentPerDay) : undefined,
      }),
    });
  };

  const deleteProduct = async (id: string) => {
    if (!isAdmin) return setError('Only admins can delete products');
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchProducts();
  };

  const startEditing = (product: Product) => {
    setEditingId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl || '');
    setCategory(product.category || '');
    setRentPerDay(product.rentPerDay?.toString() || '');
    setIsAddFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setCategory('');
    setRentPerDay('');
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4 mt-12">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {error && (
        <div className="bg-red-200 text-red-800 px-4 py-2 rounded mb-4">{error}</div>
      )}
      {successMessage && (
        <div className="bg-green-200 text-green-800 px-4 py-2 rounded mb-4">{successMessage}</div>
      )}

      {/* Admin Add Button */}
      {isAdmin && (
        <div className="mb-6">
          <button
            onClick={() => {
              setIsAddFormVisible(!isAddFormVisible);
              if (editingId) setEditingId(null);
              resetForm();
            }}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {isAddFormVisible ? 'Cancel' : 'Add New Product'}
          </button>

          {isAddFormVisible && (
            <form
              onSubmit={handleSubmit}
              className="mt-4 p-6 bg-gray-900 rounded-lg border border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                />
                <input
                  type="number"
                  placeholder="Rent Per Day"
                  value={rentPerDay}
                  onChange={(e) => setRentPerDay(e.target.value)}
                  className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 col-span-1 md:col-span-2"
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                  className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 col-span-1 md:col-span-2"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search gadgets..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm text-black"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded shadow-sm text-black"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
<div className="my-4"><RecentlyViewed /></div>
      

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <Link
              href={`/products/${product._id}`}
              onClick={() => {
                const viewedProduct = {
                  id: product._id,
                  name: product.name,
                  image: product.imageUrl || '',
                  price: product.price,
                };
                let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
                viewed = viewed.filter((g: any) => g.id !== viewedProduct.id);
                viewed.unshift(viewedProduct);
                viewed = viewed.slice(0, 8);
                localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
              }}
            >
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const parent = img.parentElement!;
                      parent.innerHTML = `<div class='text-gray-300'>Image Not Available</div>`;
                    }}
                  />
                ) : (
                  <div className="text-gray-300">No Image</div>
                )}
              </div>
            </Link>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="text-green-500 font-bold">${product.price}</span>
              </div>
              {product.category && (
                <span className="inline-block bg-gray-700 text-sm px-2 py-1 rounded mb-2">
                  {product.category}
                </span>
              )}
              <p className="text-gray-400 mb-4">{product.description}</p>
              {product.rentPerDay && (
                <p className="text-yellow-400 text-sm">
                    Rent: ${product.rentPerDay}/day
                </p>
              )}

              {isAdmin && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(product)}
                    className="flex-1 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex-1 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
