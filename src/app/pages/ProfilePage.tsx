import { TopHeader } from '../components/TopHeader';
import { BottomNav } from '../components/BottomNav';
import {
  Settings,
  Award,
  Activity,
  Target,
  ChevronRight,
  Trophy,
} from 'lucide-react';

export default function ProfilePage() {
  const stats = [
    { label: 'Activities', value: '0', icon: Activity },
    { label: 'Followers', value: '0', icon: Award },
    { label: 'Following', value: '0', icon: Target },
  ];

  const menuItems = [
    { label: 'Profile Settings', icon: Settings },
    { label: 'Activity History', icon: Activity },
    { label: 'Achievements', icon: Trophy },
    { label: 'Goals', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-16">
      <TopHeader />

      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="p-6 text-center border-b border-zinc-800">
          <div className="w-24 h-24 bg-zinc-800 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
          <h2 className="text-white text-2xl font-bold mb-1">Your Profile</h2>
          <p className="text-gray-400 mb-4">Athlete on ASCEND</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold">
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-zinc-800">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-white text-2xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="p-4">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full bg-zinc-900 hover:bg-zinc-800 rounded-lg p-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-blue-500" />
                  <span className="text-white font-semibold">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div className="p-4 mt-4">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-400/20 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-2">
              Complete Your Profile
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Add a photo, bio, and connect your devices to get the most out of
              ASCEND
            </p>
            <div className="w-full bg-zinc-800 rounded-full h-2 mb-2">
              <div className="w-1/4 h-full bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-xs">25% complete</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
