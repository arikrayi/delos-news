import Image from 'next/image';
import React from 'react';
import ReactPaginate from 'react-paginate';
import useStorage from '@/hooks/useStorage';

export default function PurchasedArticles({ search }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const { purchasedArticles: data } = useStorage();

  React.useEffect(() => {
    if (data) {
      setPageCount(data.length / 5);
    }
  }, [data]);

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected * 5);
  };
  return (
    <div className="flex flex-col items-center gap-2 min-h-[calc(100dvh-181px)] h-fit w-full">
      <div className="flex flex-col w-full items-center gap-3 h-full">
        {data && data.length > 0 ? data
          .slice(currentPage, currentPage + 5 <= data.length
            ? currentPage + 5 : data.length)
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
                <h2 className="text-xl font-semibold truncate w-full">
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
          )) : (
            <p className="h-full text-text-secondary flex items-center">You don&apos;t have any articles</p>
        )}
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
    </div>
  );
}
