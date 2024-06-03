import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Page from '@/app/get-lucky/page';
import { MockStorageProvider } from '@/utils/testUtils';

describe('Get Lucky page', () => {
  it('should displays insufficient ticket when no ticket is available', async () => {
    render(
      <MockStorageProvider
        initialValues={{
          coin: 100000,
          purchasedArticles: [],
          ticket: 0,
          jackpot: false,
        }}
      >
        <Page />
      </MockStorageProvider>,
    );

    const button = screen.getByRole('button', { name: /Try Your Luck!/i });

    fireEvent.click(button);

    const toastMessage = await screen.findByText(/You do not have enough tickets to try your luck!/i);
    expect(toastMessage).toBeInTheDocument();
  });
});
