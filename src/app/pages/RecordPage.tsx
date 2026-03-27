import { TopHeader } from '../components/TopHeader';
import { BottomNav } from '../components/BottomNav';
import { Circle, Play, Square } from 'lucide-react';
import { useState } from 'react';

export default function RecordPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const [distance, setDistance] = useState('0.00');
  const [pace, setPace] = useState('0:00');

  const activities = [
    { id: 1, name: 'Run', icon: '🏃' },
    { id: 2, name: 'Ride', icon: '🚴' },
    { id: 3, name: 'Walk', icon: '🚶' },
    { id: 4, name: 'Hike', icon: '🥾' },
    { id: 5, name: 'Swim', icon: '🏊' },
    { id: 6, name: 'Workout', icon: '💪' },
  ];

  const [selectedActivity, setSelectedActivity] = useState(activities[0]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-16">
      <TopHeader />

      <div className="max-w-md mx-auto p-6">
        {!isRecording ? (
          <>
            {/* Activity Type Selector */}
            <div className="mb-8">
              <h2 className="text-white text-xl font-bold mb-4">
                Select Activity Type
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {activities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity)}
                    className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      selectedActivity.id === activity.id
                        ? 'bg-blue-600 border-2 border-blue-400'
                        : 'bg-zinc-900 border-2 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-3xl">{activity.icon}</span>
                    <span className="text-sm font-semibold">
                      {activity.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Recording Button */}
            <div className="flex flex-col items-center gap-6 mt-12">
              <button
                onClick={() => setIsRecording(true)}
                className="bg-blue-600 hover:bg-blue-700 rounded-full w-32 h-32 flex items-center justify-center shadow-lg shadow-blue-500/50"
              >
                <Circle className="w-24 h-24 fill-white text-white" />
              </button>
              <div className="text-center">
                <h3 className="text-white text-xl font-bold mb-2">
                  Ready to Record
                </h3>
                <p className="text-gray-400">
                  Tap to start tracking your {selectedActivity.name.toLowerCase()}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Recording View */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full mb-6">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-white font-semibold">Recording</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-8 mb-12">
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-2">TIME</div>
                <div className="text-white text-6xl font-bold tracking-tight">
                  {time}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-2">DISTANCE</div>
                  <div className="text-white text-4xl font-bold">
                    {distance}
                  </div>
                  <div className="text-gray-400 text-sm">km</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-2">PACE</div>
                  <div className="text-white text-4xl font-bold">{pace}</div>
                  <div className="text-gray-400 text-sm">min/km</div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => setIsRecording(false)}
                className="bg-red-600 hover:bg-red-700 rounded-full w-20 h-20 flex items-center justify-center"
              >
                <Square className="w-10 h-10 fill-white text-white" />
              </button>
              <span className="text-gray-400 text-sm">Stop & Save</span>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
