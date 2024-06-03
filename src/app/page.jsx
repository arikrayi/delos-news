'use client';

import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import Navbar from '@/components/navbar';
import Posts from '@/components/posts';
import useClickOutside from '@/hooks/useClickOutside';

export default function Home() {
  const [filter, setFilter] = useState('emailed');
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = React.useState('');

  useClickOutside(['.filter-buttons', '#toggle-filter-button'], () => setShowFilter(false), showFilter);

  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <Navbar />
      <div className="relative flex items-center gap-2 w-full h-16 px-10 py-10">
        <input
          type="text"
          placeholder="Search Articles"
          className="border border-border rounded-lg px-3 py-1.5 w-80 pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch className="absolute left-12 text-lg text-text-secondary" />
        <h1 className="text-2xl font-bold text-black mx-auto absolute top-[calc(50%-1rem)] left-1/2 transform -translate-x-1/2" id="page-title">
          Article Catalogue
        </h1>
        <button
          type="button"
          className="relative ml-auto flex items-center justify-center gap-1 rounded-lg py-2 px-3 border border-primary"
          onClick={() => setShowFilter(!showFilter)}
          id="toggle-filter-button"
        >
          <p className="px-2 text-primary font-semibold">
            Most
            {' '}
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </p>
          <FaCaretDown className="text-primary" />
          <div className={`filter-buttons ${showFilter ? 'flex' : 'hidden'} absolute flex-col top-full right-0 w-40 h-fit z-30 bg-white mt-1.5 shadow-lg rounded-lg border border-gray overflow-hidden text-sm"`}>
            <button
              type="button"
              className={`p-2 flex items-start transition ${filter === 'emailed' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setFilter('emailed')}
            >
              Most Emailed
            </button>
            <button
              type="button"
              className={`p-2 flex items-start transition ${filter === 'shared' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setFilter('shared')}
            >
              Most Shared
            </button>
            <button
              type="button"
              className={`p-2 flex items-start pb-3 transition ${filter === 'viewed' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setFilter('viewed')}
            >
              Most Viewed
            </button>
          </div>
        </button>
      </div>
      <Posts filter={filter} search={search} />
    </main>
  );
}
