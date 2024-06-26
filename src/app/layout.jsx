import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { StorageProvider } from '@/providers/ContextProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Delos News',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StorageProvider>
          <ReactQueryProvider>
            <ToastContainer position="top-center" />
            {children}
          </ReactQueryProvider>
        </StorageProvider>
      </body>
    </html>
  );
}
