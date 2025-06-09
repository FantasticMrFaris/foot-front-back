import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, Wifi } from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockPitches } from '../data/mockData';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Grass', 'Artificial', 'Indoor', '5v5', '7v7', '11v11'];

  const filteredPitches = mockPitches.filter(pitch => {
    const matchesSearch = pitch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pitch.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || 
                         pitch.surface === selectedFilter || 
                         pitch.size === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-4 md:pt-20">
      <Header title="Explore Pitches" showSearch={false} />
      
      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pitches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Map View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{filteredPitches.length} pitches found</p>
          <Button variant="outline" size="sm" icon={MapPin}>
            Map View
          </Button>
        </div>

        {/* Pitches Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPitches.map((pitch) => (
            <Card key={pitch.id} hover className="overflow-hidden">
              <img
                src={pitch.images[0]}
                alt={pitch.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{pitch.name}</h3>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{pitch.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">{pitch.location}</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                      {pitch.surface}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {pitch.size}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary-600">£{pitch.price}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    Available now
                  </div>
                  {pitch.facilities.includes('Wifi') && (
                    <div className="flex items-center">
                      <Wifi size={14} className="mr-1" />
                      WiFi
                    </div>
                  )}
                </div>
                
                <Button className="w-full">Book Now</Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredPitches.length === 0 && (
          <div className="text-center py-12">
            <MapPin size={48} className="mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pitches found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}