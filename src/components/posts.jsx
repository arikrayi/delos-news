'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { ImSpinner2 } from 'react-icons/im';
import ArticleDetail from './articleDetail';

async function fetchPosts(filter) {
  const response = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/${filter}/30.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`);
  return response.json();
}

export default function Posts({ filter, search }) {
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ['posts', filter],
    queryFn: () => fetchPosts(filter),
  });

  return (
    <div className="h-full w-full">
      <ArticleDetail
        article={selectedArticle}
        setSelectedArticle={setSelectedArticle}
      />
      {isLoading ? (
        <ImSpinner2 className="animate-spin text-2xl m-auto h-[calc(100dvh-161px)] text-primary" />
      ) : (
        <ul className="flex flex-wrap h-full w-full">
          {data && data.results && data.results
            .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
            .map((post) => (
              <button
                type="button"
                key={post.id}
                className="article relative flex flex-col gap-2 w-1/3 xl:w-1/4 h-96 transition cursor-pointer hover:scale-[1.02] hover:z-20 active:brightness-50 text-left"
                onClick={() => setSelectedArticle(post)}
              >
                <Image
                  src={post.media.length > 0 ? post.media[0]['media-metadata'][2].url : '/no-image-available.png'}
                  alt={post.title}
                  width={300}
                  height={300}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="z-10 h-full w-full p-5 text-text-primary bg-gradient-news flex flex-col items-start justify-end">
                  <h2 className="text-xl font-semibold">
                    {post.title}
                  </h2>
                  <p className="text-xs mb-2 text-text-secondary">
                    {post.published_date ? new Date(post.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  </p>
                  <p className="text-sm line-clamp-2 h-10">
                    {post.abstract}
                  </p>
                </div>
              </button>
            ))}
        </ul>
      )}
    </div>
  );
}
