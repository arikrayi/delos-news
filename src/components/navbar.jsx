import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 w-full bg-white text-text z-40 flex items-center justify-between py-6 px-10 mx-auto">
      <div className="flex items-center gap-3">
        <Image src="/delos.png" alt="Delos Logo" width={100} height={100} />
        <span className="bg-black w-2 h-2 rounded-full" />
        <p className="text-2xl font-extrabold text-black">NEWS</p>
      </div>
      <ul className="flex gap-4">
        <li>
          {pathname === '/' ? (
            <span className="text-primary font-semibold">Home</span>
          ) : (
            <Link href="/" className="hover:underline">Home</Link>
          )}
        </li>
        <li>
          {pathname === '/my-articles' ? (
            <span className="text-primary font-semibold">My Articles</span>
          ) : (
            <Link href="/my-articles" className="hover:underline">My Articles</Link>
          )}
        </li>
        <li>
          {pathname === '/get-lucky' ? (
            <span className="text-primary font-semibold">Get Lucky</span>
          ) : (
            <Link href="/get-lucky" className="hover:underline">Get Lucky</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
