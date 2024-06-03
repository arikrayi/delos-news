import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { PiCoin } from 'react-icons/pi';
import { IoTicketSharp } from 'react-icons/io5';
import useStorage from '@/hooks/useStorage';

export default function Navbar() {
  const pathname = usePathname();
  const { coin, ticket } = useStorage();
  return (
    <nav className="sticky top-0 w-full bg-[#F7FAFE] text-text z-40 flex items-center gap-5 py-6 px-10 mx-auto shadow-sm">
      <div className="flex items-center gap-3 mr-auto">
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
      <div className="h-8 w-0.5 bg-border" />
      <p className="flex items-center gap-2">
        <PiCoin className="inline-block text-2xl text-yellow-500 shrink-0" />
        {coin.toLocaleString()}
        <IoTicketSharp className="inline-block text-xl text-primary shrink-0 ml-2" />
        {ticket.toLocaleString()}
      </p>
    </nav>
  );
}
