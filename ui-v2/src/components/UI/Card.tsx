import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  premium?: boolean;
}

export default function Card({ children, className = '', hover = false, premium = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border-2 ${
        premium 
          ? 'border-white-gold-500 shadow-premium bg-gradient-to-br from-white to-gray-50' 
          : 'border-dark-teal-500/20 shadow-dark-teal'
      } ${
        hover ? 'hover:shadow-premium hover:border-white-gold-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}