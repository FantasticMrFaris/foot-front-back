import React, { useState } from 'react';
import { Heart, X, MessageCircle, MapPin, Star, Users } from 'lucide-react';
import Header from '../components/Layout/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { User } from '../types';

const mockUsers: User[] = [
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    position: 'Forward',
    skillLevel: 'Advanced',
    location: 'West London',
    favoriteClub: 'Chelsea FC',
    bio: 'Love playing football and meeting new people! Looking for competitive matches.',
    age: 26,
    rating: 4.7,
    matchesPlayed: 63,
    joinedDate: '2023-03-20'
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    position: 'Goalkeeper',
    skillLevel: 'Professional',
    location: 'East London',
    favoriteClub: 'Tottenham',
    bio: 'Former semi-pro goalkeeper. Happy to help train others and join friendly matches.',
    age: 32,
    rating: 4.9,
    matchesPlayed: 89,
    joinedDate: '2022-11-10'
  },
];

export default function Connect() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [matches, setMatches] = useState<User[]>([]);

  const currentDisplayUser = mockUsers[currentUserIndex];

  const handleSwipe = (liked: boolean) => {
    if (liked) {
      setMatches([...matches, currentDisplayUser]);
    }
    
    if (currentUserIndex < mockUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      setCurrentUserIndex(0);
    }
  };

  if (!currentDisplayUser) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-4 md:pt-20">
        <Header title="Connect" />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Users size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No more players</h3>
            <p className="text-gray-600">Check back later for new connections!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-4 md:pt-20">
      <Header title="Connect" />
      
      <main className="px-4 py-6 max-w-md mx-auto">
        {/* Swipe Card */}
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-6 animate-slide-up">
          <div className="relative h-96">
            <img
              src={currentDisplayUser.avatar}
              alt={currentDisplayUser.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">{currentDisplayUser.name}</h2>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 mr-1" />
                  <span className="font-medium">{currentDisplayUser.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <MapPin size={16} className="mr-2" />
                <span>{currentDisplayUser.location}</span>
              </div>
              
              <div className="flex space-x-2 mb-3">
                <span className="px-3 py-1 bg-primary-500 rounded-full text-sm">
                  {currentDisplayUser.position}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {currentDisplayUser.skillLevel}
                </span>
              </div>
              
              <p className="text-sm opacity-90">{currentDisplayUser.bio}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mb-8">
          <button
            onClick={() => handleSwipe(false)}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 border-2 border-red-200 hover:border-red-300"
          >
            <X size={24} className="text-red-500" />
          </button>
          
          <button
            onClick={() => handleSwipe(true)}
            className="w-16 h-16 bg-primary-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 text-white"
          >
            <Heart size={24} />
          </button>
        </div>

        {/* Recent Matches */}
        {matches.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Matches</h3>
            <div className="space-y-3">
              {matches.slice(-3).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.position}</p>
                    </div>
                  </div>
                  <Button size="sm" icon={MessageCircle}>
                    Chat
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder Card for Phase 1 */}
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Social features coming soon!</h2>
          <p className="text-gray-600 mb-4">
            The Connect page will let you find and add friends, see who's online, and more.
          </p>
          <p className="text-gray-500">
            Stay tuned for updates in the next release.
          </p>
        </Card>
      </main>
    </div>
  );
}