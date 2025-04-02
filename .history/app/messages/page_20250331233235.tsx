"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Message {
  _id: string;
  senderEmail: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  reply?: string;
  replySubject?: string;
  repliedAt?: string;
}

interface RentRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  days: number;
  total: number;
  productId: string;
  productName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export default function MessagesPage() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'messages' | 'rent'>('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [rentRequests, setRentRequests] = useState<RentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reply, setReply] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }
    fetchMessages();
    fetchRentRequests();
  }, [user, router]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch messages');
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRentRequests = async () => {
    try {
      const res = await fetch('/api/rent', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch rent requests');
      setRentRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rent requests');
    }
  };

  const handleStatusUpdate = async (id: string, status: 'accepted' | 'rejected') => {
    try {
      const res = await fetch(`/api/rentrequests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
  
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || 'Update failed');
  
      // update state
      setRentRequests(prev =>
        prev.map(req => (req._id === id ? { ...req, status: updated.status } : req))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };
  

  const handleReply = async (messageId: string) => {
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ reply, replySubject }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send reply');
      setMessages(messages.map(msg => (msg._id === messageId ? data : msg)));
      setReply('');
      setReplySubject('');
      setSelectedMessageId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reply');
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.isRead;
    if (filter === 'read') return msg.isRead;
    return true;
  });

  if (isLoading) return <div className="p-8 text-gray-200">Loading...</div>;
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-200">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-1 rounded-md font-medium ${
              activeTab === 'messages' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('rent')}
            className={`px-4 py-1 rounded-md font-medium ${
              activeTab === 'rent' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200'
            }`}
          >
            Rent Requests
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-900 text-red-200 rounded">
          {error}
        </div>
      )}

      {activeTab === 'messages' && (
        <>
          <div className="flex space-x-2 mb-6">
            {(['all', 'unread', 'read'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  filter === type ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'
                }`}
              >
                {type[0].toUpperCase() + type.slice(1)} ({messages.filter(m =>
                  type === 'all' ? true :
                  type === 'unread' ? !m.isRead :
                  m.isRead
                ).length})
              </button>
            ))}
          </div>

          {filteredMessages.length === 0 ? (
            <p className="text-gray-400">No messages found.</p>
          ) : (
            <div className="grid gap-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-6 rounded-lg shadow-md ${
                    msg.isRead ? 'bg-gray-800' : 'bg-gray-900 border-l-4 border-blue-500'
                  }`}
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-200">From: {msg.senderEmail}</p>
                      <p className="text-gray-200"><strong>Subject:</strong> {msg.subject}</p>
                      <p className="text-sm text-gray-400">{new Date(msg.createdAt).toLocaleString()}</p>
                    </div>
                    {!msg.isRead && (
                      <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-200 mb-4">{msg.message}</p>

                  {msg.reply ? (
                    <div className="p-4 bg-gray-700 rounded">
                      <p><strong>Reply Subject:</strong> {msg.replySubject}</p>
                      <p><strong>Your Reply:</strong> {msg.reply}</p>
                      <p className="text-sm text-gray-300">
                        Sent: {new Date(msg.repliedAt!).toLocaleString()}
                      </p>
                    </div>
                  ) : selectedMessageId === msg._id ? (
                    <div className="space-y-3 mt-4">
                      <input
                        type="text"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        placeholder="Reply subject"
                        className="w-full p-2 rounded bg-gray-700 text-gray-200"
                      />
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full p-2 rounded bg-gray-700 text-gray-200"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleReply(msg._id)}
                          className="bg-blue-600 px-4 py-2 rounded text-white"
                          disabled={!reply.trim()}
                        >
                          Send Reply
                        </button>
                        <button
                          onClick={() => {
                            setReply('');
                            setReplySubject('');
                            setSelectedMessageId(null);
                          }}
                          className="bg-gray-600 px-4 py-2 rounded text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedMessageId(msg._id)}
                      className="bg-blue-600 px-4 py-2 mt-2 rounded text-white"
                    >
                      Reply
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

{activeTab === 'rent' && (
  <div className="grid gap-4">
    {rentRequests.length === 0 ? (
      <p className="text-gray-400">No rent requests found.</p>
    ) : (
      rentRequests.map((req) => (
        <div key={req._id} className="p-6 bg-gray-800 rounded-lg shadow-md">
          <p><strong>Name:</strong> {req.name}</p>
          <p><strong>Email:</strong> {req.email}</p>
          <p><strong>Phone:</strong> {req.phone}</p>
          <p><strong>Address:</strong> {req.address}</p>
          <p><strong>Product:</strong> {req.productName}</p>
          <p><strong>Days:</strong> {req.days}</p>
          <p><strong>Total:</strong> ${req.total}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={`inline-block px-2 py-1 rounded text-white text-sm ${
                req.status === 'accepted'
                  ? 'bg-green-600'
                  : req.status === 'rejected'
                  ? 'bg-red-600'
                  : 'bg-yellow-600'
              }`}
            >
              {req.status}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            Submitted: {new Date(req.createdAt).toLocaleString()}
          </p>

          {req.status === 'pending' && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleStatusUpdate(req._id, 'accepted')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate(req._id, 'rejected')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))
    )}
  </div>
)}
      {activeTab === 'rent' && (
        <div className="grid gap-4">
          {rentRequests.length === 0 ? (
            <p className="text-gray-400">No rent requests found.</p>
          ) : (
            rentRequests.map((req) => (
              <div key={req._id} className="p-6 bg-gray-800 rounded-lg shadow-md">
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Phone:</strong> {req.phone}</p>
                <p><strong>Address:</strong> {req.address}</p>
                <p><strong>Product:</strong> {req.productName}</p>
                <p><strong>Days:</strong> {req.days}</p>
                <p><strong>Total:</strong> ${req.total}</p>
                <p className="text-sm text-gray-400">
                  Submitted: {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
