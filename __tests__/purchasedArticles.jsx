import React from 'react';
import { render, screen } from '@testing-library/react';
import PurchasedArticles from '@/components/purchasedArticles';
import { MockStorageProvider } from '@/utils/testUtils';

describe('Purchased Articles page', () => {
  it('displays articles stored from localStorage', () => {
    const mockPurchasedArticles = [
      {
        id: 1,
        url: 'https://www.nytimes.com/2021/10/10/article1',
        title: 'Purchased Article 1',
        abstract: 'Abstract 1',
        media: [{ 'media-metadata': [{ url: 'image1.jpg' }, { url: 'image1.jpg' }, { url: 'https://static01.nyt.com/images/2024/05/15/multimedia/15CHARLES-RED-lgvw/15CHARLES-RED-lgvw-mediumThreeByTwo440.jpg' }] }],
        published_date: '2021-10-10',
        byline: 'Author 1',
      },
      {
        id: 2,
        url: 'https://www.nytimes.com/2021/10/11/article2',
        title: 'Purchased Article 2',
        abstract: 'Abstract 2',
        media: [{ 'media-metadata': [{ url: 'image2.jpg' }, { url: 'image1.jpg' }, { url: 'https://static01.nyt.com/images/2024/05/15/multimedia/15CHARLES-RED-lgvw/15CHARLES-RED-lgvw-mediumThreeByTwo440.jpg' }] }],
        published_date: '2021-10-11',
        byline: 'Author 2',
      },
    ];

    window.localStorage.setItem('purchasedArticles', JSON.stringify(mockPurchasedArticles));

    window;

    render(
      <MockStorageProvider
        initialValues={{
          coin: 100000,
          purchasedArticles: mockPurchasedArticles,
          ticket: 0,
          jackpot: false,
        }}
      >
        <PurchasedArticles search="" />
      </MockStorageProvider>,
    );

    expect(screen.getByText('Purchased Article 1')).toBeInTheDocument();
    expect(screen.getByText('Purchased Article 2')).toBeInTheDocument();
  });
});
