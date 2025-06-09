import React, { useEffect, useState } from 'react';
import { Plus, Calendar, Clock, MapPin, Users, Star } from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Matches() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token] = useLocalStorage('token', '');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'hosting' | 'past'>('upcoming');

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: 3 },
    { key: 'hosting', label: 'Hosting', count: 1 },
    { key: 'past', label: 'Past', count: 12 },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/matches', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to fetch matches');
        }
        return res.json();
      })
      .then((data) => setMatches(data.matches || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="p-4">Loading matches...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-4 md:pt-20">
      <Header title="Matches" />
      
      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Create Match CTA */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Organize a Match</h2>
              <p className="opacity-90">Create and host your own football matches</p>
            </div>
            <Button variant="secondary" icon={Plus}>
              Create Match
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {activeTab === 'upcoming' && (
            <>
              {matches.map((match) => (
                <Card key={match.id} hover className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{match.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span>{match.date}</span>
                          <Clock size={16} className="ml-4 mr-2" />
                          <span>{match.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          <span>{match.pitch.name}, {match.pitch.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users size={16} className="mr-2" />
                          <span>{match.participants.length}/{match.maxParticipants} players</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600 mb-1">
                        £{match.price || 'Free'}
                      </div>
                      <div className="text-sm text-gray-600">{match.skillLevel}</div>
                    </div>
                  </div>
                  
                  {match.description && (
                    <p className="text-gray-600 mb-4">{match.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={match.organizer.avatar}
                        alt={match.organizer.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{match.organizer.name}</div>
                        <div className="flex items-center">
                          <Star size={12} className="text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-600">{match.organizer.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button>Join Match</Button>
                  </div>
                </Card>
              ))}
              
              {/* Browse More */}
              <Card className="p-8 text-center">
                <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Find More Matches</h3>
                <p className="text-gray-600 mb-4">Discover matches happening near you</p>
                <Button variant="outline">Browse All Matches</Button>
              </Card>
            </>
          )}

          {activeTab === 'hosting' && (
            <Card className="p-8 text-center">
              <Plus size={48} className="mx-auto mb-3 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matches hosted yet</h3>
              <p className="text-gray-600 mb-4">Create your first match and bring players together</p>
              <Button icon={Plus}>Create Match</Button>
            </Card>
          )}

          {activeTab === 'past' && (
            <Card className="p-8 text-center">
              <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Past matches will appear here</h3>
              <p className="text-gray-600">Your match history and stats</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}