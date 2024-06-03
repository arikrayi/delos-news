/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-news': 'linear-gradient(to top, #000000, transparent)',
        'gradient-primary': 'linear-gradient(to bottom right, #147BD1, #0e5ea0)',
      },
      colors: {
        text: '#222222',
        'text-primary': '#f9f9f9',
        'text-secondary': '#9b9b9b',
        border: '#DDDDDD',
        primary: '#147BD1',
        secondary: '#013349',
        black: '#39383C',
      },
      keyframes: {
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        beat: 'beat 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
