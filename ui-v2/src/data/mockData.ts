import { User, Pitch, Match, Team, League } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Faris Hussain',
  email: 'Faris@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  position: 'Midfielder',
  skillLevel: 'Intermediate',
  location: 'London, UK',
  favoriteClub: 'Arsenal FC',
  bio: 'Passionate footballer looking for regular games and new friends!',
  age: 28,
  rating: 4.2,
  matchesPlayed: 47,
  joinedDate: '2023-01-15'
};

export const mockPitches: Pitch[] = [
  {
    id: '1',
    name: 'Central Sports Complex',
    location: 'Downtown London',
    latitude: 51.5074,
    longitude: -0.1278,
    surface: 'Artificial',
    size: '11v11',
    price: 25,
    rating: 4.5,
    facilities: ['Changing Rooms', 'Parking', 'Floodlights', 'Café'],
    images: ['https://images.pexels.com/photos/1040482/pexels-photo-1040482.jpeg?auto=compress&cs=tinysrgb&w=800'],
    availability: []
  },
  {
    id: '2',
    name: 'Green Park 5-a-side',
    location: 'Green Park, London',
    latitude: 51.5067,
    longitude: -0.1410,
    surface: 'Grass',
    size: '5v5',
    price: 15,
    rating: 4.2,
    facilities: ['Parking', 'Equipment Rental'],
    images: ['https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800'],
    availability: []
  }
];

export const mockMatches: Match[] = [
  {
    id: '1',
    title: 'Sunday League Kickabout',
    date: '2024-01-28',
    time: '10:00',
    pitch: mockPitches[0],
    organizer: currentUser,
    participants: [currentUser],
    maxParticipants: 22,
    skillLevel: 'Mixed',
    type: 'Casual',
    price: 5,
    description: 'Friendly game for all skill levels. Come join us!'
  }
];

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'London Lions',
    logo: 'https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=100',
    captain: currentUser,
    members: [currentUser],
    league: 'Sunday Premier League',
    wins: 12,
    losses: 3,
    draws: 5,
    founded: '2022-08-01',
    description: 'Competitive team looking for skilled players'
  }
];