import React from 'react';
import { TopHeader } from '../components/TopHeader';

const C = {
  bg:        '#0a0a0a',
  card:      '#141414',
  card2:     '#1a1a1a',
  accent:    '#0066FF',
  accentDim: 'rgba(0,102,255,0.15)',
  border:    'rgba(255,255,255,0.08)',
  text:      '#ffffff',
  muted:     '#8A8A8A',
  dim:       '#444444',
  font:      'Inter, sans-serif',
  mono:      'Space Mono, monospace',
  display:   'Bebas Neue, sans-serif',
}

function SuggestedChallenges() {
  return (
    <div className="p-4 mt-4">
      <h3 className="text-white font-bold text-xl mb-2">
        Suggested Challenges
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        Make accountability a little easier, more fun and earn rewards!
      </p>
      <div className="bg-zinc-900 rounded-xl p-5">
        <p className="text-gray-400 text-sm mb-4">
          More than 1,225,000 athletes have already joined
        </p>
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-blue-500/10 border-2 border-blue-500 rounded-2xl p-4 flex-shrink-0">
            <div className="text-center">
              <div className="text-blue-400 font-bold text-3xl">400</div>
              <div className="text-blue-400 text-xs">MINS</div>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg mb-1">
              March 400-minute x Runna Challenge
            </h4>
            <p className="text-gray-400 text-sm mb-2">
              Log 400 mins of movement. Unlock 2 weeks free + win a Hawaii
              race trip!
            </p>
            <div className="inline-block bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
              Reward
            </div>
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold">
          Join Challenge
        </button>
      </div>
      <button className="w-full text-blue-500 hover:text-blue-400 font-semibold mt-4">
        Explore All Challenges
      </button>
    </div>
  )
}

const activityFeed: any[] = [];
function ActivityCard({ activity }: { activity: any }) { return null; }

export default function HomePage() {
  return (
    <div style={{
      background: C.bg,
      minHeight: '100svh',
      paddingTop: 'calc(env(safe-area-inset-top) + 60px)',
      paddingBottom: 'calc(env(safe-area-inset-bottom) + 60px)',
    }}>
      <TopHeader />
      <SuggestedChallenges />
      {activityFeed.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
