/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0B0B14',
        'space-form': '#0E0E1A',
        'space-input': '#1C1C2E',
        'purple': {
          glow: '#7C3AED',
          hover: '#6D28D9'
        }
      },
      boxShadow: {
        'glow': '0 0 150px -5px rgba(124, 58, 237, 0.3)',
      }
    },
  },
  plugins: [],
} 