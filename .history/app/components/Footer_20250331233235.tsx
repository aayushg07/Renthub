import Link from 'next/link';

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2025 GadgetRental. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400">Terms & Conditions</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-400">Facebook</Link>
            <Link href="#" className="hover:text-blue-500">Twitter</Link>
            <Link href="#" className="hover:text-red-400">Instagram</Link>
          </div>
        </div>
      </footer>
    );
}
