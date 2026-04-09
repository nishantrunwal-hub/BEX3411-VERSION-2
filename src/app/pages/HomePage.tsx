import React, { useState } from 'react';
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

// STATS DATA
const userStats = {
  badgesCollected: 12,
  challengesCompleted: 8,
  milesExplored: 247,
  suggestedRoutes: 5,
}

// STATS SECTION COMPONENT
function StatsSection() {
  const [showHistory, setShowHistory] = useState(false)

  const routeHistory = [
    {
      id: 1,
      name: 'Yarra River Trail',
      date: 'Apr 8, 2026',
      distance: '6.79 km',
      time: '0h 39m',
      pace: '5:45 /km',
      type: 'Running',
    },
    {
      id: 2,
      name: 'Dandenong Ranges Circuit',
      date: 'Apr 6, 2026',
      distance: '14.5 km',
      time: '2h 10m',
      pace: '8:58 /km',
      type: 'Trail Running',
    },
    {
      id: 3,
      name: 'St Kilda Coastal Run',
      date: 'Apr 4, 2026',
      distance: '7.8 km',
      time: '0h 42m',
      pace: '5:23 /km',
      type: 'Running',
    },
    {
      id: 4,
      name: 'Capital City Trail',
      date: 'Apr 2, 2026',
      distance: '29 km',
      time: '2h 45m',
      pace: '5:41 /km',
      type: 'Cycling',
    },
    {
      id: 5,
      name: 'Mount Macedon Summit',
      date: 'Mar 30, 2026',
      distance: '9.6 km',
      time: '2h 10m',
      pace: '13:33 /km',
      type: 'Hiking',
    },
  ]

  const stats = [
    {
      id: 1,
      label: 'Badges Collected',
      value: '12',
      icon: '🏅',
      color: '#F5A623',
    },
    {
      id: 2,
      label: 'Challenges Completed',
      value: '8',
      icon: '⚡',
      color: '#0066FF',
    },
    {
      id: 3,
      label: 'Miles Explored',
      value: '247',
      icon: '🗺',
      color: '#00E5A0',
    },
    {
      id: 4,
      label: 'Suggested Routes',
      value: '5',
      icon: '📍',
      color: '#FF3B3B',
    },
  ]

  return (
    <div style={{
      background: C.bg,
      borderBottom: `0.5px solid ${C.border}`,
      padding: '16px',
      marginBottom: '4px',
    }}>

      {/* Section header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '14px',
      }}>
        <h2 style={{
          fontFamily: C.font,
          fontWeight: 700,
          fontSize: '18px',
          color: C.text,
          margin: 0,
        }}>
          Your Stats
        </h2>
        <button
          onClick={() => setShowHistory(p => !p)}
          style={{
            background: showHistory ? C.accentDim : 'transparent',
            border: `1px solid ${C.accent}`,
            borderRadius: '100px',
            padding: '6px 14px',
            fontFamily: C.font,
            fontSize: '12px',
            fontWeight: 600,
            color: C.accent,
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {showHistory ? 'Hide Stats' : 'View Recent Stats'}
        </button>
      </div>

      {/* Stats grid — 2x2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        marginBottom: showHistory ? '16px' : '0',
      }}>
        {stats.map(stat => (
          <div
            key={stat.id}
            style={{
              background: C.card,
              borderRadius: '14px',
              border: `0.5px solid ${C.border}`,
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{stat.icon}</span>
            <span style={{
              fontFamily: C.font,
              fontWeight: 700,
              fontSize: '24px',
              color: stat.color,
              lineHeight: 1,
            }}>
              {stat.value}
            </span>
            <span style={{
              fontFamily: C.font,
              fontSize: '11px',
              color: C.muted,
              lineHeight: 1.3,
            }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Route history — expands when View Recent Stats clicked */}
      {showHistory && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          animation: 'fadeIn 200ms ease',
        }}>
          <p style={{
            fontFamily: C.font,
            fontWeight: 700,
            fontSize: '15px',
            color: C.text,
            margin: '0 0 10px 0',
          }}>
            Recent Routes
          </p>

          {routeHistory.map((route, i) => (
            <div
              key={route.id}
              style={{
                background: C.card,
                borderRadius: '12px',
                border: `0.5px solid ${C.border}`,
                padding: '12px 14px',
                marginBottom: '8px',
              }}
            >
              {/* Route name + type */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}>
                <h3 style={{
                  fontFamily: C.font,
                  fontWeight: 600,
                  fontSize: '14px',
                  color: C.text,
                  margin: 0,
                }}>
                  {route.name}
                </h3>
                <span style={{
                  fontFamily: C.font,
                  fontSize: '10px',
                  fontWeight: 500,
                  color: C.accent,
                  background: C.accentDim,
                  padding: '2px 8px',
                  borderRadius: '100px',
                }}>
                  {route.type}
                </span>
              </div>

              {/* Date */}
              <p style={{
                fontFamily: C.font,
                fontSize: '11px',
                color: C.dim,
                margin: '0 0 8px 0',
              }}>
                {route.date}
              </p>

              {/* Stats row */}
              <div style={{
                display: 'flex',
                gap: '16px',
              }}>
                {[
                  { label: 'Distance', value: route.distance },
                  { label: 'Time',     value: route.time     },
                  { label: 'Pace',     value: route.pace     },
                ].map(item => (
                  <div key={item.label}>
                    <p style={{
                      fontFamily: C.font,
                      fontSize: '10px',
                      color: C.muted,
                      margin: '0 0 2px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}>
                      {item.label}
                    </p>
                    <p style={{
                      fontFamily: C.mono,
                      fontSize: '13px',
                      fontWeight: 700,
                      color: C.text,
                      margin: 0,
                    }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
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
      <StatsSection />
      <SuggestedChallenges />
      {activityFeed.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
