import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false,
  onClick
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl border border-white-gold-500/20',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border border-dark-teal-500/20',
    outline: 'border-2 border-dark-teal-500 text-dark-teal-500 hover:bg-dark-teal-500 hover:text-white focus:ring-2 focus:ring-dark-teal-500 focus:ring-offset-2 shadow-white-gold hover:shadow-premium',
    ghost: 'text-dark-teal-600 hover:text-dark-teal-800 hover:bg-dark-teal-50 focus:ring-2 focus:ring-dark-teal-500 focus:ring-offset-2',
    premium: 'bg-gradient-to-r from-dark-teal-600 to-dark-teal-700 text-white-gold-500 border-2 border-white-gold-500 hover:from-dark-teal-700 hover:to-dark-teal-800 focus:ring-2 focus:ring-white-gold-500 focus:ring-offset-2 shadow-premium hover:animate-glow'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={16} className="mr-2" />}
      {children}
    </button>
  );
}