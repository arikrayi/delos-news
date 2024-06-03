import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Posts from '@/components/posts';
import { MockStorageProvider, MockQueryClientProvider } from '@/utils/testUtils';

describe('Article List page', () => {
  it('should display articles based on API data', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      num_resuls: 2,
      results: [
        {
          id: 1,
          url: 'https://www.nytimes.com/2021/10/10/article1',
          title: 'Article 1',
          abstract: 'Abstract 1',
          media: [{ 'media-metadata': [{ url: 'image1.jpg' }, { url: 'image1.jpg' }, { url: 'https://static01.nyt.com/images/2024/05/15/multimedia/15CHARLES-RED-lgvw/15CHARLES-RED-lgvw-mediumThreeByTwo440.jpg' }] }],
          published_date: '2021-10-10',
          byline: 'Author 1',
        },
        {
          id: 2,
          url: 'https://www.nytimes.com/2021/10/11/article2',
          title: 'Article 2',
          abstract: 'Abstract 2',
          media: [{ 'media-metadata': [{ url: 'image2.jpg' }, { url: 'image1.jpg' }, { url: 'https://static01.nyt.com/images/2024/05/15/multimedia/15CHARLES-RED-lgvw/15CHARLES-RED-lgvw-mediumThreeByTwo440.jpg' }] }],
          published_date: '2021-10-11',
          byline: 'Author 2',
        },
      ],
    }));

    render(
      <MockStorageProvider>
        <MockQueryClientProvider
          initialValues={{
            coin: 100000,
            purchasedArticles: [],
            ticket: 0,
            jackpot: false,
          }}
        >
          <Posts filter="emailed" search="" />
        </MockQueryClientProvider>
      </MockStorageProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
      expect(screen.getByText('Article 2')).toBeInTheDocument();
    });
  });
});
