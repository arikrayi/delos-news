'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ImSpinner2 } from 'react-icons/im';
import { IoSearch } from 'react-icons/io5';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import Navbar from '@/components/navbar';

async function fetchPosts(filter) {
  const response = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/${filter}/30.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`);
  return response.json();
}

export default function Home() {
  const [search, setSearch] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ['posts', 'emailed'],
    queryFn: () => fetchPosts('emailed'),
  });

  React.useEffect(() => {
    if (data) {
      setPageCount(data.num_results / 5);
    }
  }, [data]);

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected * 5);
  };

  return (
    <main className="relative flex h-screen flex-col items-center">
      <Navbar />
      <div className="relative flex items-center gap-2 w-full h-16 px-10 py-10 border-t border-border">
        <h1 className="text-2xl font-bold text-black mx-auto absolute top-[calc(50%-1rem)] left-1/2 transform -translate-x-1/2">
          Owned Articles
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
      <div className="flex flex-col items-center gap-2 min-h-[calc(100dvh-181px)] h-fit w-full p-5">
        {isLoading ? (
          <ImSpinner2 className="animate-spin text-2xl m-auto h-full text-primary" />
        ) : (
          <div className="flex flex-col w-full items-center gap-3 h-full">
            {data && data.results && data.results
              .slice(currentPage, currentPage + 5 <= data.results.length
                ? currentPage + 5 : data.results.length)
              .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
              .map((post) => (
                <div
                  key={post.id}
                  className="article relative flex flex-col gap-2 md:min-w-[768px] w-full md:w-1/2 h-fit text-left rounded-lg overflow-hidden shrink-0"
                >
                  <Image
                    src={post.media.length > 0 ? post.media[0]['media-metadata'][2].url : '/no-image-available.png'}
                    alt={post.title}
                    width={300}
                    height={300}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="z-10 h-full w-full py-3 px-5 text-text-primary bg-gradient-news flex flex-col items-start justify-end">
                    <h2 className="text-xl font-semibold">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-0.5 mb-3">
                      <p className="text-xs">
                        {post.byline}
                      </p>
                      <span className="bg-text-secondary w-1 h-1 rounded-full" />
                      <p className="text-xs text-text-secondary">
                        {post.published_date ? new Date(post.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                      </p>
                    </div>
                    <p className="text-sm line-clamp-2 h-10">
                      {post.abstract}
                    </p>
                    <button
                      type="button"
                      className="relative ml-auto flex items-center justify-center gap-1 rounded-lg py-1.5 px-10 border border-white text-sm transition hover:border-primary hover:text-primary hover:scale-[1.02] active:scale-100 active:brightness-75"
                      onClick={() => window.open(post.url, '_blank')}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="flex gap-3 font-semibold items-center justify-center pt-3 pb-5"
              pageLinkClassName="w-10 h-10 rounded cursor-pointer transition hover:bg-text-secondary hover:text-white flex items-center justify-center"
              activeLinkClassName="bg-primary text-white"
              disabledLinkClassName="cursor-not-allowed text-text-secondary"
            />
          </div>
        )}

      </div>
    </main>
  );
}
