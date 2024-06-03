'use client';

import React from 'react';
import { toast } from 'react-toastify';
import Navbar from '@/components/navbar';
import useStorage from '@/hooks/useStorage';

export default function Page() {
  const {
    ticket, setTicketValue, jackpot, setJackpotValue, coin, setCoinValue,
  } = useStorage();
  const handleGatcha = () => {
    if (ticket <= 0) {
      toast.error('You do not have enough tickets to try your luck!');
    } else if (!jackpot) {
      setTicketValue(ticket - 1);
      const random = Math.floor(Math.random() * 100);
      if (random >= 98) {
        setJackpotValue(true);
        toast.success('Congratulations! You\'ve won 50,000 coins!');
        setCoinValue(coin + 50000);
      } else if (random >= 80) {
        toast.success('Congratulations! You\'ve won 20,000 coins!');
        setCoinValue(coin + 20000);
      } else {
        toast.error('Sorry, you didn\'t win anything this time!');
      }
    } else {
      setTicketValue(ticket - 1);
      const random = Math.floor(Math.random() * 100);
      if (random >= 80) {
        toast.success('Congratulations! You\'ve won 20,000 coins!');
        setCoinValue(coin + 20000);
      } else {
        toast.error('Sorry, you didn\'t win anything this time!');
      }
    }
  };

  return (
    <main className="relative flex h-screen flex-col items-center">
      <Navbar />
      <div className="relative flex items-center gap-2 w-full h-16 px-10 py-10">
        <h1 className="text-2xl font-bold text-black mx-auto absolute top-[calc(50%-1rem)] left-1/2 transform -translate-x-1/2">
          Get Lucky
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 min-h-[calc(100dvh-181px)] h-fit w-full pb-20">
        <h1 className="text-4xl font-bold text-black mx-auto text-center">
          Your Ticket:
          {' '}
          {ticket.toLocaleString()}
        </h1>
        <button
          type="button"
          className="w-60 h-60 bg-gradient-primary text-text-primary rounded-full font-extrabold text-2xl animate-beat active:brightness-90"
          onClick={handleGatcha}
        >
          Try Your Luck!
        </button>
      </div>
    </main>
  );
}
