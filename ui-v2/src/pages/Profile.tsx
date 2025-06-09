import React, { useEffect, useState } from "react";
import { 
  Edit, 
  MapPin, 
  Calendar, 
  Star, 
  Trophy, 
  Users,
  Settings,
  Heart,
  Award
} from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ProfileData {
  displayName?: string;
  username?: string;
  joinedDate?: string;
  rating?: number;
  matchesPlayed?: number;
  position?: string;
  skillLevel?: string;
  favoriteClub?: string;
  avatar?: string;
  bio?: string;
  goalsScored?: number;
  cleanSheets?: number;
  location?: string;
}

const Profile: React.FC = () => {
  const [token] = useLocalStorage("token", "");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit mode for display name
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch profile");
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setDisplayName(data.displayName || data.username || "");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/user/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ displayName }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update profile");
      }
      const data = await res.json();
      setProfile(data);
      setEditMode(false);
    } catch (err: any) {
      setError(err.message);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-4">Loading profile...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!profile) return null;

  // Defensive checks for possibly missing fields
  const joinedYear = profile.joinedDate ? new Date(profile.joinedDate).getFullYear() : "N/A";
  const rating = typeof profile.rating === "number" ? profile.rating.toFixed(1) : "N/A";
  const matchesPlayed = profile.matchesPlayed ?? 0;
  const position = profile.position ?? "N/A";
  const skillLevel = profile.skillLevel ?? "N/A";
  const favoriteClub = profile.favoriteClub ?? "N/A";
  const avatarUrl = profile.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.displayName || profile.username || "User");

  const achievements = [
    { icon: Trophy, title: 'Top Scorer', description: 'Scored most goals in league' },
    { icon: Award, title: 'Team Player', description: 'Highly rated by teammates' },
    { icon: Users, title: 'Social Butterfly', description: 'Connected with 50+ players' },
  ];

  const stats = [
    { label: 'Matches Played', value: matchesPlayed },
    { label: 'Average Rating', value: rating },
    { label: 'Goals Scored', value: profile.goalsScored ?? 0 },
    { label: 'Clean Sheets', value: profile.cleanSheets ?? 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-4 md:pt-20">
      <Header title="Profile" showSearch={false} />
      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              {editMode ? (
                <form onSubmit={handleSave} className="flex items-center gap-2">
                  <input
                    className="border p-2 rounded"
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setEditMode(false)} disabled={saving}>
                    Cancel
                  </Button>
                </form>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.displayName || profile.username}</h1>
                  <div className="flex items-center space-x-4 mt-1 text-gray-600">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{profile.location ?? "N/A"}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Joined {joinedYear}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Star size={16} className="text-yellow-400 mr-1" />
                    <span className="font-medium">{rating}</span>
                    <span className="text-gray-600 ml-1">({matchesPlayed} matches)</span>
                  </div>
                </>
              )}
            </div>
            {!editMode && (
              <Button variant="outline" icon={Edit} onClick={() => setEditMode(true)}>
                Edit
              </Button>
            )}
          </div>
          {profile.bio && (
            <p className="text-gray-600 mb-4">{profile.bio}</p>
          )}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              {position}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {skillLevel}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {favoriteClub}
            </span>
          </div>
        </Card>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
        {/* Achievements */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Achievements</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <achievement.icon size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* Recent Activity */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Joined Sunday League match', time: '2 hours ago', icon: Calendar },
              { action: 'Connected with Sarah Williams', time: '1 day ago', icon: Heart },
              { action: 'Booked Central Sports Complex', time: '3 days ago', icon: MapPin },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <activity.icon size={16} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Settings</h2>
          <div className="space-y-3">
            {[
              'Account Settings',
              'Privacy & Security',
              'Notifications',
              'Payment Methods',
              'Help & Support',
              'About'
            ].map((setting) => (
              <button
                key={setting}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900">{setting}</span>
                <Settings size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Profile;