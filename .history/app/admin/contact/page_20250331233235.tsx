"use client";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import AdminContactForm from '@/app/components/AdminContactForm';
import { useEffect } from 'react';

export default function AdminContactPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminContactForm />
    </div>
  );
}