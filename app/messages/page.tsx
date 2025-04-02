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

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
          
          {/* Tab Navigation */}
          <div className="flex space-x-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'messages' 
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('rent')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'rent' 
                  ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Rent Requests
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {/* Filter Controls */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
              {(['all', 'unread', 'read'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filter === type 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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

            {/* Messages List */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No messages found.
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-6 transition-colors ${msg.isRead ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-700'}`}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-800 dark:text-gray-100">
                            {msg.senderEmail}
                          </p>
                          {!msg.isRead && (
                            <span className="px-2 py-0.5 text-xs font-medium text-white bg-blue-500 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                          {msg.subject}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {msg.message}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Reply Section */}
                      <div className="md:w-1/3">
                        {msg.reply ? (
                          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                              {msg.replySubject}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              {msg.reply}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Replied: {new Date(msg.repliedAt!).toLocaleString()}
                            </p>
                          </div>
                        ) : selectedMessageId === msg._id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={replySubject}
                              onChange={(e) => setReplySubject(e.target.value)}
                              placeholder="Reply subject"
                              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <textarea
                              value={reply}
                              onChange={(e) => setReply(e.target.value)}
                              placeholder="Type your reply..."
                              rows={4}
                              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleReply(msg._id)}
                                disabled={!reply.trim()}
                                className={`px-3 py-1.5 rounded text-sm font-medium ${
                                  reply.trim()
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                Send
                              </button>
                              <button
                                onClick={() => {
                                  setReply('');
                                  setReplySubject('');
                                  setSelectedMessageId(null);
                                }}
                                className="px-3 py-1.5 rounded text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedMessageId(msg._id)}
                            className="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                          >
                            Reply
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Rent Requests Tab */}
        {activeTab === 'rent' && (
          <div className="grid gap-6">
            {rentRequests.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md text-gray-500 dark:text-gray-400">
                No rent requests found.
              </div>
            ) : (
              rentRequests.map((req) => (
                <div key={req._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                          Request for {req.productName}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">From:</span> {req.name}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Email:</span> {req.email}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Phone:</span> {req.phone}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Address:</span> {req.address}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Duration:</span> {req.days} days
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Total:</span> ${req.total.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Status:</span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                req.status === 'accepted'
                                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                  : req.status === 'rejected'
                                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                              }`}
                            >
                              {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Submitted: {new Date(req.createdAt).toLocaleString()}
                      </p>

                      {req.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(req._id, 'accepted')}
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(req._id, 'rejected')}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}