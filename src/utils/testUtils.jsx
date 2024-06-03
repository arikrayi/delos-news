import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StorageContext } from '@/providers/ContextProvider';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      throwOnError: true,
    },
  },
});

export function MockQueryClientProvider({ children }) {
  const client = createTestQueryClient();
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}

export function MockStorageProvider({ children, initialValues = {} }) {
  const [coin, setCoin] = useState(initialValues.coin || 100000);
  const [purchasedArticles, setPurchasedArticles] = useState(initialValues.purchasedArticles || []);
  const [ticket, setTicket] = useState(initialValues.ticket || 0);
  const [jackpot, setJackpot] = useState(initialValues.jackpot || false);

  const setCoinValue = (newValue) => {
    setCoin(newValue);
  };

  const setPurchasedArticlesValue = (newValue) => {
    setPurchasedArticles(newValue);
  };

  const setTicketValue = (newValue) => {
    setTicket(newValue);
  };

  const setJackpotValue = (newValue) => {
    setJackpot(newValue);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StorageContext.Provider value={{
      coin,
      setCoinValue,
      purchasedArticles,
      setPurchasedArticlesValue,
      ticket,
      setTicketValue,
      jackpot,
      setJackpotValue,
    }}
    >
      {children}
    </StorageContext.Provider>
  );
}
