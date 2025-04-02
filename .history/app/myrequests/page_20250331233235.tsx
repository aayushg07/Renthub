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

  if (isLoading) return <div className="p-8 text-gray-300">Please log in to see your requests</div>;
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">My Rental Requests</h1>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-gray-800 p-5 rounded-md shadow">
              <p><strong>Product:</strong> {req.productName}</p>
              <p><strong>Days:</strong> {req.days}</p>
              <p><strong>Total:</strong> ${req.total}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  req.status === "pending" ? "bg-yellow-600" :
                  req.status === "accepted" ? "bg-green-600" :
                  "bg-red-600"
                }`}>
                  {req.status}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Submitted: {new Date(req.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
