'use client';

import React from 'react';
import { IoSearch } from 'react-icons/io5';
import Navbar from '@/components/navbar';
import PurchasedArticles from '@/components/purchasedArticles';

export default function Home() {
  const [search, setSearch] = React.useState('');

  return (
    <main className="relative flex h-screen flex-col items-center">
      <Navbar />
      <div className="relative flex items-center gap-2 w-full h-16 px-10 py-10">
        <h1 className="text-2xl font-bold text-black mx-auto absolute top-[calc(50%-1rem)] left-1/2 transform -translate-x-1/2">
          My Articles
        </h1>
        <input
          type="text"
          placeholder="Search Articles"
          className="border border-border rounded-lg px-3 py-1.5 w-80 pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch className="absolute left-12 text-lg text-text-secondary" />
      </div>
      <PurchasedArticles search={search} />
    </main>
  );
}
