/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
        },
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      borderColor: {
        primary: 'var(--border-color)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  // Add custom scrollbar styles
  theme: {
    extend: {
      // ... existing theme extensions ...
    },
  },
  plugins: [],
  // Add custom styles for the scrollbar
  style: {
    '::-webkit-scrollbar': {
      width: '10px',
    },
    '::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '5px',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.3)',
      },
    },
  },
};