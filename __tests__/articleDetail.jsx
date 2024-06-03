import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ArticleDetail from '@/components/articleDetail';
import { MockStorageProvider } from '@/utils/testUtils';

describe('Article List page', () => {
  it('should display article detail based on props', () => {
    render(
      <MockStorageProvider
        initialValues={{
          coin: 100000,
          purchasedArticles: [],
          ticket: 0,
          jackpot: false,
        }}
      >
        <ArticleDetail
          article={{
            id: 1,
            url: 'https://www.nytimes.com/2021/10/10/article1',
            title: 'Article 1',
            abstract: 'Abstract 1',
            media: [{ 'media-metadata': [{ url: 'image1.jpg' }, { url: 'image1.jpg' }, { url: 'https://static01.nyt.com/images/2024/05/15/multimedia/15CHARLES-RED-lgvw/15CHARLES-RED-lgvw-mediumThreeByTwo440.jpg' }] }],
            published_date: '2021-10-10',
            byline: 'Author 1',
          }}
          setSelectedArticle={() => {
          }}
        />
      </MockStorageProvider>,
    );
    expect(screen.getByText('Article 1')).toBeInTheDocument();
  });
});
