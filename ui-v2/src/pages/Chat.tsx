import React from 'react';
import { MessageCircle, Users, Search } from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import { currentUser } from '../data/mockData';

const mockChats = [
  {
    id: '1',
    name: 'Sunday League Team',
    lastMessage: 'Great game today everyone!',
    timestamp: '2 hours ago',
    unread: 3,
    isGroup: true,
    avatar: 'https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    lastMessage: 'Are you free for a match tomorrow?',
    timestamp: '1 day ago',
    unread: 0,
    isGroup: false,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'Central Sports Complex',
    lastMessage: 'Your booking is confirmed for Saturday',
    timestamp: '2 days ago',
    unread: 1,
    isGroup: false,
    avatar: 'https://images.pexels.com/photos/1040482/pexels-photo-1040482.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export default function Chat() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-4 md:pt-20">
      <Header title="Messages" showSearch={false} />
      
      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Chat List */}
        <div className="space-y-2">
          {mockChats.map((chat) => (
            <Card key={chat.id} hover className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.isGroup && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                      <Users size={10} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{chat.unread}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {mockChats.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle size={48} className="mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-600">Start connecting with players to begin chatting</p>
          </div>
        )}
      </main>
    </div>
  );
}