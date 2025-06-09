import React, { useEffect, useState } from 'react';
import { Plus, Users, Trophy, Calendar, Star } from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token] = useLocalStorage('token', '');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/teams', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to fetch teams');
        }
        return res.json();
      })
      .then((data) => setTeams(data.teams || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="p-4">Loading teams...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-4 md:pt-20">
      <Header title="Teams & Leagues" />
      
      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Create Team CTA */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Create Your Team</h2>
              <p className="opacity-90">Start your own team and compete in local leagues</p>
            </div>
            <Button variant="secondary" icon={Plus}>
              Create Team
            </Button>
          </div>
        </Card>

        {/* My Teams */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">My Teams</h2>
          
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <Card key={team.id} hover className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                      {team.logo ? (
                        <img src={team.logo} alt={team.name} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <Trophy size={24} className="text-primary-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{team.name}</h3>
                      <p className="text-sm text-gray-600">{team.league}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{team.wins}</div>
                      <div className="text-xs text-gray-600">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">{team.draws}</div>
                      <div className="text-xs text-gray-600">Draws</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">{team.losses}</div>
                      <div className="text-xs text-gray-600">Losses</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-1" />
                      {team.members.length} members
                    </div>
                    <Button size="sm" variant="outline">
                      View Team
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Trophy size={48} className="mx-auto mb-3 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
              <p className="text-gray-600 mb-4">Create your first team to start playing competitively</p>
              <Button icon={Plus}>Create Team</Button>
            </Card>
          )}
        </div>

        {/* Available Leagues */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Available Leagues</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                name: 'Sunday Premier League',
                teams: 12,
                season: '2024 Spring',
                prize: '£500',
                registrationFee: 50,
                difficulty: 'Competitive'
              },
              {
                name: 'Weekend Warriors',
                teams: 8,
                season: '2024 Spring',
                prize: '£200',
                registrationFee: 25,
                difficulty: 'Casual'
              }
            ].map((league, index) => (
              <Card key={index} hover className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{league.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    league.difficulty === 'Competitive' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {league.difficulty}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Season:</span>
                    <span>{league.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Teams:</span>
                    <span>{league.teams}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prize Pool:</span>
                    <span className="font-medium text-primary-600">{league.prize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registration:</span>
                    <span>£{league.registrationFee}</span>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Join League
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* League Standings Preview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">League Standings</h2>
            <Button variant="ghost" size="sm">View Full Table</Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Pos</th>
                  <th className="text-left py-2">Team</th>
                  <th className="text-center py-2">P</th>
                  <th className="text-center py-2">W</th>
                  <th className="text-center py-2">D</th>
                  <th className="text-center py-2">L</th>
                  <th className="text-center py-2">Pts</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pos: 1, team: 'London Lions', p: 20, w: 12, d: 5, l: 3, pts: 41 },
                  { pos: 2, team: 'City Rangers', p: 20, w: 11, d: 6, l: 3, pts: 39 },
                  { pos: 3, team: 'United FC', p: 20, w: 10, d: 7, l: 3, pts: 37 },
                ].map((team) => (
                  <tr key={team.pos} className="border-b border-gray-100">
                    <td className="py-2 font-medium">{team.pos}</td>
                    <td className="py-2 font-medium text-gray-900">{team.team}</td>
                    <td className="py-2 text-center">{team.p}</td>
                    <td className="py-2 text-center">{team.w}</td>
                    <td className="py-2 text-center">{team.d}</td>
                    <td className="py-2 text-center">{team.l}</td>
                    <td className="py-2 text-center font-bold">{team.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Teams;