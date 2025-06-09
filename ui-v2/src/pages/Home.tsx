import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Trophy,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { currentUser, mockMatches, mockPitches } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Matches Played', value: currentUser.matchesPlayed, icon: Trophy, color: 'text-primary-600' },
    { label: 'Average Rating', value: currentUser.rating.toFixed(1), icon: Star, color: 'text-white-gold-500' },
    { label: 'Active Since', value: '2023', icon: TrendingUp, color: 'text-dark-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-dark-teal-50/30 to-gray-100 pb-20 md:pb-4 md:pt-20">
      <Header title={`Welcome back, ${currentUser.name.split(' ')[0]}!`} />
      
      <main className="px-4 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="p-4 text-center bg-gradient-to-br from-white to-dark-teal-50/20 border-dark-teal-500/30" hover>
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-dark-teal-600 to-dark-teal-700 rounded-full flex items-center justify-center border-2 border-white-gold-500/30">
                <Icon size={24} className="text-white-gold-500" />
              </div>
              <div className="text-lg font-bold text-dark-teal-800">{value}</div>
              <div className="text-xs text-dark-teal-600">{label}</div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-white via-dark-teal-50/10 to-white border-dark-teal-500/30" premium>
          <h2 className="text-lg font-semibold mb-4 text-dark-teal-800 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-white-gold-500 to-dark-teal-600 rounded-full mr-3"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Button
              variant="outline"
              icon={MapPin}
              className="flex-col h-20 space-y-2 border-dark-teal-500/50 hover:bg-gradient-to-br hover:from-dark-teal-500 hover:to-dark-teal-600"
              onClick={() => navigate('/explore')}
            >
              Find Pitch
            </Button>
            <Button
              variant="outline"
              icon={Users}
              className="flex-col h-20 space-y-2 border-dark-teal-500/50 hover:bg-gradient-to-br hover:from-dark-teal-500 hover:to-dark-teal-600"
              onClick={() => navigate('/connect')}
            >
              Find Players
            </Button>
            <Button
              variant="outline"
              icon={Calendar}
              className="flex-col h-20 space-y-2 border-dark-teal-500/50 hover:bg-gradient-to-br hover:from-dark-teal-500 hover:to-dark-teal-600"
              onClick={() => navigate('/matches')}
            >
              Join Match
            </Button>
            <Button
              variant="outline"
              icon={Trophy}
              className="flex-col h-20 space-y-2 border-dark-teal-500/50 hover:bg-gradient-to-br hover:from-dark-teal-500 hover:to-dark-teal-600"
              onClick={() => navigate('/teams')}
            >
              View Teams
            </Button>
          </div>
        </Card>

        {/* Upcoming Matches */}
        <Card className="p-6 bg-gradient-to-br from-white via-dark-teal-50/10 to-white border-dark-teal-500/30" premium>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-dark-teal-800 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-white-gold-500 to-dark-teal-600 rounded-full mr-3"></div>
              Upcoming Matches
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/matches')} className="text-dark-teal-600 hover:text-white-gold-500">
              View All
            </Button>
          </div>
          
          {mockMatches.length > 0 ? (
            <div className="space-y-3">
              {mockMatches.slice(0, 2).map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-dark-teal-50/50 to-white rounded-lg border border-dark-teal-500/20 hover:border-white-gold-500/50 transition-all duration-300">
                  <div>
                    <h3 className="font-medium text-dark-teal-800">{match.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-dark-teal-600">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-white-gold-500" />
                        {match.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-white-gold-500" />
                        {match.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1 text-white-gold-500" />
                        {match.pitch.name}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="premium">Join</Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-dark-teal-600">
              <Calendar size={48} className="mx-auto mb-3 opacity-30" />
              <p>No upcoming matches</p>
              <Button className="mt-3" onClick={() => navigate('/matches')} variant="premium">
                Find Matches
              </Button>
            </div>
          )}
        </Card>

        {/* Nearby Pitches */}
        <Card className="p-6 bg-gradient-to-br from-white via-dark-teal-50/10 to-white border-dark-teal-500/30" premium>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-dark-teal-800 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-white-gold-500 to-dark-teal-600 rounded-full mr-3"></div>
              Nearby Pitches
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/explore')} className="text-dark-teal-600 hover:text-white-gold-500">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {mockPitches.slice(0, 2).map((pitch) => (
              <div key={pitch.id} className="flex space-x-3 p-3 bg-gradient-to-r from-dark-teal-50/50 to-white rounded-lg border border-dark-teal-500/20 hover:border-white-gold-500/50 hover:shadow-white-gold transition-all duration-300 cursor-pointer">
                <img
                  src={pitch.images[0]}
                  alt={pitch.name}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-white-gold-500/30"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-dark-teal-800">{pitch.name}</h3>
                  <p className="text-sm text-dark-teal-600">{pitch.location}</p>
                  <div className="flex items-center mt-1">
                    <Star size={14} className="text-white-gold-500 mr-1" />
                    <span className="text-sm text-dark-teal-600">{pitch.rating}</span>
                    <span className="ml-2 text-sm font-medium text-primary-600">£{pitch.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}