import React from 'react';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export default function Header({ title, showSearch = true, showNotifications = true }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-dark-teal-800 via-dark-teal-700 to-dark-teal-800 border-b-2 border-white-gold-500 px-4 py-4 md:px-6 shadow-premium">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <h1 className="text-xl font-bold text-white md:text-2xl drop-shadow-lg">{title}</h1>
        
        <div className="flex items-center space-x-3">
          {showSearch && (
            <button className="p-2 rounded-full bg-dark-teal-600/50 border border-white-gold-500/30 hover:bg-dark-teal-600 hover:shadow-white-gold transition-all duration-300">
              <Search size={20} className="text-white-gold-500" />
            </button>
          )}
          
          {showNotifications && (
            <button className="relative p-2 rounded-full bg-dark-teal-600/50 border border-white-gold-500/30 hover:bg-dark-teal-600 hover:shadow-white-gold transition-all duration-300">
              <Bell size={20} className="text-white-gold-500" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white-gold-500 rounded-full border border-dark-teal-800 animate-glow"></span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}