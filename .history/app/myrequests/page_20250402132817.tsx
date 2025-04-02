"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

interface RentRequest {
  _id: string;
  productName: string;
  days: number;
  total: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export default function MyRequestsPage() {
  const { user, token } = useAuth();
  const [requests, setRequests] = useState<RentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`/api/rent?email=${encodeURIComponent(user.email)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRequests(data);
        else throw new Error("Unexpected response");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading your requests...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!user?.email) return <div className="p-8 text-center text-gray-500">Please log in to see your requests</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">My Rental Requests</h1>
        <p className="text-gray-400">View the status of your rental applications</p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
          <p className="text-gray-400">You haven&apos;t made any rental requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div 
              key={req._id} 
              className="bg-gray-800/70 hover:bg-gray-800/90 transition-all rounded-xl p-6 shadow-lg border border-gray-700/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{req.productName}</h3>
                  <p className="text-sm text-gray-400">Product</p>
                </div>
                
                <div>
                  <p className="text-lg font-medium text-white">
                    {req.days} day{req.days !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-400">Duration</p>
                </div>
                
                <div>
                  <p className="text-lg font-medium text-white">${req.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">Total cost</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-700/50">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    req.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                    req.status === "accepted" ? "bg-green-500/20 text-green-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-xs text-gray-500">
                  Submitted: {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}