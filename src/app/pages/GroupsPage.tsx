// src/pages/GroupsPage.tsx
// Full build — Challenges, Clubs, Explore tabs

'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Settings,
  Trophy,
  MapPin,
  Users,
  Check
} from 'lucide-react'

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

// --- CHALLENGES DATA ---
const challenges = [
  {
    id: 1,
    badge: '400',
    badgeColor: '#1a3a5c',
    title: 'April 400-Minute Endurance Challenge',
    description: 'Complete 400 minutes of any activity in April. Any activity counts!',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'run',
    participants: '1,225,000',
  },
  {
    id: 2,
    badge: '33.3',
    badgeColor: '#0d4a3a',
    title: 'UltraSwim 33.3 #VIRTUAL',
    description: 'Swim the English Channel (33.3km) in April. Rewards at 16.65km.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'swim',
    participants: '48,200',
  },
  {
    id: 3,
    badge: '10x',
    badgeColor: '#1a3a5c',
    title: 'April Ten Days Active Challenge',
    description: 'Do 10 minutes of activity for 10 days this month. Any activity counts!',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: false,
    type: 'run',
    participants: '892,000',
  },
  {
    id: 4,
    badge: '180',
    badgeColor: '#1a3a5c',
    title: 'April 180 Minute Sweat Challenge',
    description: 'Complete a single activity that is 180-minutes long.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: false,
    type: 'ride',
    participants: '234,000',
  },
  {
    id: 5,
    badge: '100K',
    badgeColor: '#3a1a1a',
    title: 'Gran Fondo 100km Cycling Challenge',
    description: 'Ride 100km in a single effort. Segment leaderboard included.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'ride',
    participants: '156,000',
  },
  {
    id: 6,
    badge: 'HYROX',
    badgeColor: '#1a1a3a',
    title: 'Hyrox Training Block April',
    description: 'Complete 8 functional fitness sessions. Win a Hyrox race entry.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'run',
    participants: '89,000',
  },
  {
    id: 7,
    badge: '50K',
    badgeColor: '#0d4a3a',
    title: 'Ultra 50K Trail Challenge',
    description: 'Run 50km on trails this month. Off-road activities only.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'run',
    participants: '67,000',
  },
  {
    id: 8,
    badge: '21K',
    badgeColor: '#3a1a0d',
    title: 'Half Marathon Distance Month',
    description: 'Log a half marathon distance in a single run at any pace.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: false,
    type: 'run',
    participants: '445,000',
  },
  {
    id: 9,
    badge: '30D',
    badgeColor: '#1a3a5c',
    title: '30 Days of Movement Challenge',
    description: 'Log at least one activity every single day for 30 days.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'walk',
    participants: '2,100,000',
  },
  {
    id: 10,
    badge: '5K',
    badgeColor: '#0d4a3a',
    title: 'Fast 5K April Sprint Series',
    description: 'Log your fastest 5K this month. Top times win medals.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'run',
    participants: '780,000',
  },
  {
    id: 11,
    badge: 'EV',
    badgeColor: '#2a0d3a',
    title: 'Everesting Elevation Challenge',
    description: 'Accumulate 8,849m of elevation gain — the height of Everest.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'ride',
    participants: '34,000',
  },
  {
    id: 12,
    badge: 'TRI',
    badgeColor: '#1a3a5c',
    title: 'Triathlon Training Month',
    description: 'Complete swim, bike and run activities totalling 113km.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'swim',
    participants: '28,000',
  },
  {
    id: 13,
    badge: '200K',
    badgeColor: '#3a2a0d',
    title: 'Ultra Distance Month',
    description: 'Log 200km of any endurance activity across the month.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'run',
    participants: '52,000',
  },
  {
    id: 14,
    badge: 'DAWN',
    badgeColor: '#0d3a3a',
    title: 'Dawn Patrol Challenge',
    description: 'Complete 10 activities before 7am this month.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: false,
    type: 'run',
    participants: '123,000',
  },
  {
    id: 15,
    badge: 'CLIMB',
    badgeColor: '#1a1a3a',
    title: 'Peak Bagger Climbing Challenge',
    description: 'Summit 5 peaks with verified elevation gain over 400m each.',
    dates: 'Apr 1 to Apr 30, 2026',
    hasReward: true,
    type: 'walk',
    participants: '19,000',
  },
]

// --- CHALLENGE CARD ---
function ChallengeCard({ challenge }: { challenge: typeof challenges[0] }) {
  const [joined, setJoined] = useState(false)

  return (
    <div
      style={{
        background: C.card,
        borderRadius: '16px',
        border: `0.5px solid ${C.border}`,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Badge + title row */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {/* Badge */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: challenge.badgeColor,
            border: `1px solid rgba(0,102,255,0.2)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: C.display,
            fontSize: challenge.badge.length > 3 ? '13px' : '18px',
            color: '#ffffff',
            letterSpacing: '0.05em',
          }}
        >
          {challenge.badge}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: C.font,
              fontWeight: 700,
              fontSize: '15px',
              color: C.text,
              margin: '0 0 6px 0',
              lineHeight: 1.3,
            }}
          >
            {challenge.title}
          </h3>

          {/* Activity + reward icons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {challenge.hasReward && (
              <Trophy size={14} color={C.muted} />
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: C.font,
          fontSize: '13px',
          color: C.muted,
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {challenge.description}
      </p>

      {/* Dates */}
      <p
        style={{
          fontFamily: C.font,
          fontSize: '12px',
          color: C.dim,
          margin: 0,
        }}
      >
        {challenge.dates}
      </p>

      {/* Join button */}
      <button
        onClick={() => setJoined(p => !p)}
        style={{
          width: '100%',
          height: '46px',
          background: joined ? C.accentDim : C.accent,
          border: `1px solid ${C.accent}`,
          borderRadius: '100px',
          fontFamily: C.font,
          fontWeight: 600,
          fontSize: '15px',
          color: joined ? C.accent : '#ffffff',
          cursor: 'pointer',
          transition: 'all 200ms ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        {joined && <Check size={15} color={C.accent} />}
        {joined ? 'Joined' : 'Join'}
      </button>
    </div>
  )
}

// --- MAIN PAGE ---
export default function GroupsPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      background: C.bg,
      minHeight: '100svh',
      paddingBottom: 'calc(env(safe-area-inset-bottom) + 60px)',
    }}>

      {/* TOP BAR */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10,10,10,0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `0.5px solid ${C.border}`,
        paddingTop: `env(safe-area-inset-top)`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px 12px',
        }}>
          <Search size={22} color={C.muted} />
          <span style={{
            fontFamily: C.font,
            fontWeight: 700,
            fontSize: '17px',
            color: C.text,
          }}>
            Challenges
          </span>
          <Settings size={22} color={C.muted} />
        </div>
      </div>

      {/* CHALLENGES GRID — straight in, no tabs */}
      <div style={{
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      }}>
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

    </div>
  )
}