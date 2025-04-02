
'use client';

import { useEffect, useState } from 'react';

type Gadget = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export default function RecentlyViewed() {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);

  useEffect(() => {
    const viewed = localStorage.getItem('recentlyViewed');
    if (viewed) {
      setGadgets(JSON.parse(viewed));
    }
  }, []);

  if (gadgets.length === 0) return null;

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gadgets.map((gadget) => (
          <div key={gadget.id} className="border p-2 rounded hover:shadow-lg transition">
            <img src={gadget.image} alt={gadget.name} className="w-full h-32 object-cover rounded" />
            <h3 className="text-sm font-semibold mt-2 text-gray-800">{gadget.name}</h3>
            <p className="text-sm text-gray-600">${gadget.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
