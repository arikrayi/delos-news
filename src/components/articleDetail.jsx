import Image from 'next/image';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import { PiCoin } from 'react-icons/pi';
import useClickOutside from '@/hooks/useClickOutside';
import useStorage from '@/hooks/useStorage';

export default function ArticleDetail({ article, setSelectedArticle }) {
  const [price, setPrice] = React.useState(0);
  const [buyable, setBuyable] = React.useState(true);
  const {
    coin,
    setCoinValue,
    purchasedArticles,
    setPurchasedArticlesValue,
    ticket,
    setTicketValue,
  } = useStorage();

  useClickOutside(['.article-detail', '.article'], () => {
    setSelectedArticle(null);
    setBuyable(true);
  }, article);

  React.useEffect(() => {
    if (!article) {
      setPrice(0);
      return;
    }
    const date = new Date(article.published_date);
    const diff = Math.abs(new Date() - date);
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      setPrice(50000);
    } else if (diffDays <= 7) {
      setPrice(20000);
    } else {
      setPrice(0);
    }

    if (purchasedArticles.find((purchasedArticle) => purchasedArticle.id === article.id)) {
      setBuyable(false);
    }
  }, [article, purchasedArticles]);

  const buyArticle = () => {
    if (price === 0) {
      if (purchasedArticles.filter((purchasedArticle) => {
        const d = new Date(purchasedArticle.published_date);
        const df = Math.abs(new Date() - d);
        const dfd = Math.ceil(df / (1000 * 60 * 60 * 24));
        return dfd > 7;
      }).length >= 5) {
        toast.error('You can only purchase 5 free articles!');
        return;
      }
    }
    if (coin < price) {
      toast.error('You do not have enough coins to purchase this article!');
      return;
    }
    if (price >= 50000) {
      setTicketValue(ticket + 3);
    }
    setCoinValue(coin - price);
    setBuyable(true);
    setPurchasedArticlesValue([...purchasedArticles, article]);
    setSelectedArticle(null);
    toast.success('Successfully purchased article!');
  };

  if (!article) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-dvh bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-50">
      <div className="article-detail absolute flex flex-col h-3/5 w-3/4 max-w-[900px] bg-white overflow-hidden rounded-sm">
        <button
          type="button"
          className="absolute top-5 right-5 text-xl p-1.5 cursor-pointer bg-white rounded-full transition hover:scale-[1.1] active:scale-100 active:brightness-90"
          onClick={() => setSelectedArticle(null)}
        >
          <IoMdClose />
          {' '}
        </button>
        <Image src={article.media.length > 0 ? article.media[0]['media-metadata'][2].url : '/no-image-available.png'} alt={article.title} width={300} height={300} className="w-full h-3/5 object-cover" />
        <div className="p-5">
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <div className="flex items-center gap-1.5 mt-0.5 mb-3">
            <p className="text-xs">
              {article.byline}
            </p>
            <span className="bg-text-secondary w-1 h-1 rounded-full" />
            <p className="text-xs text-text-secondary">
              {article.published_date ? new Date(article.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
            </p>
          </div>
          <p className="text-sm">{article.abstract}</p>
        </div>
        <div className="flex p-5 justify-between items-end mt-auto">
          <p className="text-lg font-semibold">
            {price ? (
              <div className="flex items-center gap-2">
                <PiCoin className="inline-block text-2xl text-yellow-500 shrink-0" />
                {price.toLocaleString()}
              </div>
            ) : 'FREE'}
          </p>
          <button
            type="button"
            className="w-40 py-2 bg-primary text-text-primary rounded-full transition hover:scale-[1.01] active:scale-100 active:brightness-90 disabled:bg-text-secondary disabled:text-text-primary disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 disabled:active:brightness-100"
            onClick={buyArticle}
            disabled={!buyable}
          >
            {buyable ? 'Get' : 'Already Owned'}
          </button>
        </div>
      </div>
    </div>
  );
}
