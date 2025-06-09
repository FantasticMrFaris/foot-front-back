export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  position: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  location: string;
  favoriteClub: string;
  bio?: string;
  age?: number;
  rating: number;
  matchesPlayed: number;
  joinedDate: string;
}

export interface Pitch {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  surface: 'Grass' | 'Artificial' | 'Indoor';
  size: '5v5' | '7v7' | '11v11';
  price: number;
  rating: number;
  facilities: string[];
  images: string[];
  availability: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  price: number;
}

export interface Match {
  id: string;
  title: string;
  date: string;
  time: string;
  pitch: Pitch;
  organizer: User;
  participants: User[];
  maxParticipants: number;
  skillLevel: string;
  type: 'Casual' | 'Competitive' | 'Training';
  price?: number;
  description?: string;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  captain: User;
  members: User[];
  league?: string;
  wins: number;
  losses: number;
  draws: number;
  founded: string;
  description?: string;
}

export interface League {
  id: string;
  name: string;
  season: string;
  teams: Team[];
  fixtures: Match[];
  standings: LeagueStanding[];
  rules: string;
  registrationFee: number;
}

export interface LeagueStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface ChatMessage {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'location';
}

export interface ChatGroup {
  id: string;
  name: string;
  members: User[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  isTeamChat: boolean;
  teamId?: string;
}