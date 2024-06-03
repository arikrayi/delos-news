'use client';

import React, { createContext, useState } from 'react';

export const StorageContext = createContext();

export function StorageProvider({ children }) {
  const [coin, setCoin] = useState(() => {
    const storedValue = typeof window !== 'undefined' ? window.localStorage.getItem('coin') : null;
    return storedValue ? JSON.parse(storedValue) : 100000;
  });

  const [purchasedArticles, setPurchasedArticles] = useState(() => {
    const storedValue = typeof window !== 'undefined' ? window.localStorage.getItem('purchasedArticles') : null;
    return storedValue ? JSON.parse(storedValue) : [];
  });

  const [ticket, setTicket] = useState(() => {
    const storedValue = typeof window !== 'undefined' ? window.localStorage.getItem('ticket') : null;
    return storedValue ? JSON.parse(storedValue) : 0;
  });

  const setCoinValue = (newValue) => {
    setCoin(newValue);
    window.localStorage.setItem('coin', JSON.stringify(newValue));
  };

  const setPurchasedArticlesValue = (newValue) => {
    setPurchasedArticles(newValue);
    window.localStorage.setItem('purchasedArticles', JSON.stringify(newValue));
  };

  const setTicketValue = (newValue) => {
    setTicket(newValue);
    window.localStorage.setItem('ticket', JSON.stringify(newValue));
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StorageContext.Provider value={{
      coin, setCoinValue, purchasedArticles, setPurchasedArticlesValue, ticket, setTicketValue,
    }}
    >
      {children}
    </StorageContext.Provider>
  );
}
