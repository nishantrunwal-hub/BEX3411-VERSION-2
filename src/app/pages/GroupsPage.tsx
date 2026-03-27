import { TopHeader } from '../components/TopHeader';
import { BottomNav } from '../components/BottomNav';
import { Users, Lock, Globe, TrendingUp } from 'lucide-react';

export default function GroupsPage() {
  const groups = [
    {
      id: 1,
      name: 'Elite Runners',
      members: '12.5K',
      type: 'public',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=200',
      description: 'For serious runners pushing their limits',
    },
    {
      id: 2,
      name: 'Marathon Training',
      members: '8.2K',
      type: 'private',
      image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=200',
      description: 'Prepare for your next marathon',
    },
    {
      id: 3,
      name: 'Cycling Enthusiasts',
      members: '15.8K',
      type: 'public',
      image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=200',
      description: 'Join cyclists from around the world',
    },
    {
      id: 4,
      name: 'Trail Blazers',
      members: '6.4K',
      type: 'public',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=200',
      description: 'Trail running and hiking adventures',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-16">
      <TopHeader />

      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-2">Groups</h1>
          <p className="text-gray-400">
            Connect with athletes who share your passion
          </p>
        </div>

        {/* Trending Groups */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h2 className="text-white font-bold text-lg">Trending Now</h2>
          </div>

          <div className="space-y-3">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold">{group.name}</h3>
                      {group.type === 'private' ? (
                        <Lock className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Globe className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {group.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{group.members} members</span>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Group Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold mt-6">
          Create New Group
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
