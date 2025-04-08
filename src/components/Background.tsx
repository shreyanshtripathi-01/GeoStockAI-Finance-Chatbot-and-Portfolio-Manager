import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Background = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main Background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isDarkMode 
            ? 'opacity-100 bg-[url("/candlestick-bg.jpg")] bg-cover bg-center' 
            : 'opacity-0'
        }`}
      />

      {/* Light Mode Pattern */}
      <div 
        className={`absolute inset-0 bg-[url('/candlestick-pattern.svg')] opacity-5 transition-opacity duration-300 ${
          isDarkMode ? 'opacity-0' : 'opacity-5'
        }`}
        style={{ backgroundSize: '200px 200px' }}
      />

      {/* Gradient Overlays */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900/95 via-transparent to-gray-900/95' 
          : 'bg-gradient-to-br from-white/90 via-blue-50/30 to-indigo-50/90'
      }`} />

      {/* Market Color Accents */}
      <div className="absolute inset-0">
        {/* Bull/Bear Market Indicators */}
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-soft-light filter blur-xl animate-blob ${
          isDarkMode 
            ? 'bg-green-500/10' 
            : 'bg-green-400/20'
        }`} />
        <div className={`absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-soft-light filter blur-xl animate-blob animation-delay-2000 ${
          isDarkMode 
            ? 'bg-red-500/10' 
            : 'bg-red-400/20'
        }`} />
        <div className={`absolute bottom-20 left-1/2 w-72 h-72 rounded-full mix-blend-soft-light filter blur-xl animate-blob animation-delay-4000 ${
          isDarkMode 
            ? 'bg-blue-500/10' 
            : 'bg-blue-400/20'
        }`} />
      </div>

      {/* Subtle Grid Overlay */}
      <div className={`absolute inset-0 bg-grid-pattern opacity-5 ${
        isDarkMode ? 'invert' : ''
      }`} />
    </div>
  );
};

export default Background; 