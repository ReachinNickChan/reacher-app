import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Reachin.ai
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/search" className="text-gray-600 hover:text-gray-800">Search</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-800">Pricing</Link>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600">Login</Link>
        </div>
      </nav>
    </header>
  );
}