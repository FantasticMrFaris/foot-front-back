import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Users, 
  Trophy, 
  Calendar, 
  MessageCircle, 
  User,
  CreditCard
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: MapPin, label: 'Explore', path: '/explore' },
  { icon: Users, label: 'Connect', path: '/connect' },
  { icon: Trophy, label: 'Teams', path: '/teams' },
  { icon: Calendar, label: 'Matches', path: '/matches' },
  { icon: MessageCircle, label: 'Chat', path: '/chat' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: CreditCard, label: 'Premium', path: '/premium' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-dark-teal-800 via-dark-teal-700 to-dark-teal-800 border-t-2 border-white-gold-500 px-4 py-2 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b-2 shadow-premium">
      <div className="flex justify-around items-center max-w-screen-xl mx-auto md:justify-center md:space-x-8">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 py-2 px-2 rounded-lg transition-all duration-300 md:flex-row md:space-y-0 md:space-x-2 md:px-4 ${
                isActive
                  ? 'text-white-gold-500 bg-dark-teal-600 shadow-white-gold border border-white-gold-500/30'
                  : 'text-gray-300 hover:text-white-gold-500 hover:bg-dark-teal-600/50 hover:shadow-white-gold'
              }`}
            >
              <Icon size={20} className={isActive ? 'animate-bounce-soft drop-shadow-lg' : 'transition-transform hover:scale-110'} />
              <span className="text-xs font-medium md:text-sm">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}