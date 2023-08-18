'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';


export default function Header() {
  const pathname = usePathname();

  const handleActiveLink = (path) => {
    return path === pathname ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
  }

  return (
    <header className="flex flex-col items-center mb-4">
      <h1 className="text-3xl">Filmitchos 🍿</h1>

      <nav>
        <ul className="flex space-x-4 mt-4">
          <Link href="/" className={handleActiveLink('/')}>
            Todos os filmes
          </Link>

          <Link href="/favoritos" className={handleActiveLink('/favoritos')}>
            Favoritos
          </Link>
        </ul>
      </nav>
    </header>
  )
}
