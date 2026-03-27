import { TopHeader } from '../components/TopHeader';
import { BottomNav } from '../components/BottomNav';
import { MapPin, Navigation } from 'lucide-react';

export default function MapsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-16">
      <TopHeader />

      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
          <div className="text-center">
            <div className="bg-zinc-900 rounded-full p-8 w-32 h-32 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">
              Explore Routes
            </h2>
            <p className="text-gray-400 mb-6">
              Discover popular running and cycling routes in your area
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto">
              <Navigation className="w-5 h-5" />
              Find Routes Near Me
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
