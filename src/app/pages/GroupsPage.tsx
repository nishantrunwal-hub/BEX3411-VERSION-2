// src/pages/GroupsPage.tsx
// Full build — Challenges, Clubs, Explore tabs

'use client'

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Settings,
  Trophy,
  MapPin,
  Users,
  Check,
  ArrowLeft,
  X,
  PersonStanding,
  Bike,
  Waves,
  Footprints
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

// TAB DATA
const pageTabs = [
  { id: 'challenges',  label: 'Challenges'  },
  { id: 'explore',     label: 'Explore'     },
  { id: 'leaderboard', label: 'Leaderboard' },
]

// LEADERBOARD DATA
const leaderboard = [
  { rank: 1, name: 'Kilian Jornet', badges: 48, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', country: '🇪🇸', activity: 'Trail Running' },
  { rank: 2, name: 'Courtney Dauwalter', badges: 44, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', country: '🇺🇸', activity: 'Ultramarathon' },
  { rank: 3, name: 'Cam Wurf', badges: 41, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop', country: '🇦��', activity: 'Triathlon' },
  { rank: 4, name: 'Nish Patel', badges: 38, avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop', country: '🇬🇧', activity: 'Trail Running', isUser: true },
  { rank: 5, name: 'Nicola Spirig', badges: 35, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', country: '🇨🇭', activity: 'Triathlon' },
  { rank: 6, name: 'François D\'Haene', badges: 33, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', country: '🇫🇷', activity: 'Ultra Trail' },
  { rank: 7, name: 'Ruth Croft', badges: 31, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop', country: '🇳🇿', activity: 'Trail Running' },
  { rank: 8, name: 'David Laney', badges: 29, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop', country: '🇺🇸', activity: 'Ultramarathon' },
  { rank: 9, name: 'Ida Nilsson', badges: 27, avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop', country: '🇸🇪', activity: 'Ski Mountaineering' },
  { rank: 10, name: 'Jim Walmsley', badges: 25, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop', country: '🇺🇸', activity: 'Ultramarathon' }
]

function LeaderboardTab() {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return { color: '#FFD700', bg: 'rgba(255,215,0,0.1)',  label: '🥇' }
    if (rank === 2) return { color: '#C0C0C0', bg: 'rgba(192,192,192,0.1)', label: '🥈' }
    if (rank === 3) return { color: '#CD7F32', bg: 'rgba(205,127,50,0.1)',  label: '🥉' }
    return { color: C.muted, bg: 'transparent', label: `#${rank}` }
  }

  return (
    <div style={{ padding: '16px' }}>
      <div style={{
        background: C.card,
        borderRadius: '16px',
        border: `0.5px solid ${C.border}`,
        padding: '16px',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: '32px' }}>🏅</span>
        <h2 style={{
          fontFamily: C.font,
          fontWeight: 700,
          fontSize: '18px',
          color: C.text,
          margin: '8px 0 4px 0',
        }}>
          Badge Leaderboard
        </h2>
        <p style={{
          fontFamily: C.font,
          fontSize: '13px',
          color: C.muted,
          margin: 0,
        }}>
          Ranked by total badges earned
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px',
        marginBottom: '16px',
      }}>
        {leaderboard.slice(0, 3).map(athlete => {
          const rankStyle = getRankStyle(athlete.rank)
          return (
            <div
              key={athlete.rank}
              style={{
                background: C.card,
                borderRadius: '14px',
                border: `1px solid ${rankStyle.color}`,
                padding: '14px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: '20px' }}>{rankStyle.label}</span>
              <img
                src={athlete.avatar}
                alt={athlete.name}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `2px solid ${rankStyle.color}`,
                }}
              />
              <p style={{
                fontFamily: C.font,
                fontWeight: 600,
                fontSize: '11px',
                color: C.text,
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                {athlete.name.split(' ')[0]}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}>
                <span style={{ fontSize: '12px' }}>🏅</span>
                <span style={{
                  fontFamily: C.mono,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: rankStyle.color,
                }}>
                  {athlete.badges}
                </span>
              </div>
              <span style={{ fontSize: '10px' }}>{athlete.country}</span>
            </div>
          )
        })}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {leaderboard.map(athlete => {
          const rankStyle = getRankStyle(athlete.rank)
          return (
            <div
              key={athlete.rank}
              style={{
                background: athlete.isUser
                  ? 'rgba(0,102,255,0.08)'
                  : C.card,
                borderRadius: '12px',
                border: `0.5px solid ${athlete.isUser
                  ? C.accent
                  : C.border}`,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: rankStyle.bg,
                border: `1px solid ${rankStyle.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: C.mono,
                  fontSize: '11px',
                  fontWeight: 700,
                  color: rankStyle.color,
                }}>
                  {athlete.rank <= 3 ? rankStyle.label : athlete.rank}
                </span>
              </div>

              <img
                src={athlete.avatar}
                alt={athlete.name}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `2px solid ${athlete.isUser
                    ? C.accent
                    : C.border}`,
                  flexShrink: 0,
                }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '2px',
                }}>
                  <p style={{
                    fontFamily: C.font,
                    fontWeight: 600,
                    fontSize: '14px',
                    color: C.text,
                    margin: 0,
                  }}>
                    {athlete.name}
                  </p>
                  {athlete.isUser && (
                    <span style={{
                      fontFamily: C.font,
                      fontSize: '10px',
                      color: C.accent,
                      background: C.accentDim,
                      padding: '1px 6px',
                      borderRadius: '100px',
                      fontWeight: 600,
                    }}>
                      You
                    </span>
                  )}
                  <span style={{ fontSize: '12px' }}>{athlete.country}</span>
                </div>
                <p style={{
                  fontFamily: C.font,
                  fontSize: '11px',
                  color: C.muted,
                  margin: 0,
                }}>
                  {athlete.activity}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '14px' }}>🏅</span>
                <span style={{
                  fontFamily: C.mono,
                  fontSize: '15px',
                  fontWeight: 700,
                  color: rankStyle.rank <= 3
                    ? rankStyle.color
                    : C.text,
                }}>
                  {athlete.badges}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


function ExploreTab() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const placeholders = [
    'Explore by city...',
    'Explore by activity...',
    'Explore by difficulty...',
    'Find a trail near you...',
    'Search destinations...',
  ]
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [placeholderVisible, setPlaceholderVisible] = useState(true)

  useEffect(() => {
    if (isFocused || query) return
    const interval = setInterval(() => {
      setPlaceholderVisible(false)
      setTimeout(() => {
        setPlaceholderIndex(p => (p + 1) % placeholders.length)
        setPlaceholderVisible(true)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [isFocused, query])

  const suggestions = [
    { label: 'Melbourne, Australia', type: 'city',       icon: MapPin    },
    { label: 'Trail Running',        type: 'activity',   icon: PersonStanding },
    { label: 'Hard Difficulty',      type: 'difficulty', icon: Trophy    },
    { label: 'Tokyo, Japan',         type: 'city',       icon: MapPin    },
    { label: 'Cycling',             type: 'activity',   icon: Bike      },
    { label: 'Cape Town, South Africa', type: 'city',   icon: MapPin    },
    { label: 'Swimming',            type: 'activity',   icon: Waves     },
    { label: 'Easy Difficulty',     type: 'difficulty', icon: Trophy    },
    { label: 'London, UK',          type: 'city',       icon: MapPin    },
    { label: 'Hiking',              type: 'activity',   icon: Footprints },
  ]

  const filtered = query
    ? suggestions.filter(s =>
        s.label.toLowerCase().includes(query.toLowerCase())
      )
    : suggestions

  return (
    <div style={{ padding: '16px' }}>

      {/* Search bar */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            height: '52px',
            background: C.card,
            borderRadius: '100px',
            border: `1px solid ${isFocused ? C.accent : 'rgba(255,255,255,0.15)'}`,
            padding: '0 16px',
            transition: 'border-color 200ms ease',
          }}
        >
          {isFocused ? (
            <button
              onPointerDown={() => {
                setIsFocused(false)
                inputRef.current?.blur()
                setQuery('')
              }}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <ArrowLeft size={18} color={C.text} />
            </button>
          ) : (
            <Search size={16} color={C.muted} style={{ flexShrink: 0 }} />
          )}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!query) setIsFocused(false)
            }}
            placeholder=""
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: C.font,
              fontSize: '15px',
              color: C.text,
              caretColor: C.accent,
            }}
          />

          {!query && (
            <div
              style={{
                position: 'absolute',
                left: isFocused ? '50px' : '48px',
                pointerEvents: 'none',
                fontFamily: C.font,
                fontSize: '15px',
                color: C.muted,
                opacity: placeholderVisible ? 1 : 0,
                transition: 'opacity 300ms ease',
                whiteSpace: 'nowrap',
              }}
            >
              {placeholders[placeholderIndex]}
            </div>
          )}

          {query.length > 0 && (
            <button
              onPointerDown={() => setQuery('')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                padding: 0,
              }}
            >
              <X size={12} color={C.muted} />
            </button>
          )}
        </div>
      </div>

      {!isFocused && !query && (
        <div style={{ marginBottom: '20px' }}>
          <p
            style={{
              fontFamily: C.font,
              fontWeight: 700,
              fontSize: '16px',
              color: C.text,
              margin: '0 0 12px 0',
            }}
          >
            Browse by
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { label: 'City',       color: '#0066FF' },
              { label: 'Activity',   color: '#00E5A0' },
              { label: 'Difficulty', color: '#F5A623' },
              { label: 'Distance',   color: '#FF3B3B' },
            ].map(chip => (
              <button
                key={chip.label}
                onPointerDown={() => setQuery(chip.label + ' ')}
                style={{
                  height: '36px',
                  padding: '0 16px',
                  background: 'rgba(255,255,255,0.06)',
                  border: `0.5px solid rgba(255,255,255,0.12)`,
                  borderRadius: '100px',
                  fontFamily: C.font,
                  fontSize: '13px',
                  fontWeight: 500,
                  color: chip.color,
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p
          style={{
            fontFamily: C.font,
            fontWeight: 700,
            fontSize: '16px',
            color: C.text,
            margin: '0 0 12px 0',
          }}
        >
          {query ? `Results for "${query}"` : 'Popular searches'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {filtered.map((item, i) => (
            <div
              key={i}
              onPointerDown={() => setQuery(item.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '13px 4px',
                borderBottom: `0.5px solid ${C.border}`,
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: C.card2,
                  border: `0.5px solid ${C.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <item.icon size={16} color={C.accent} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: C.font,
                    fontWeight: 500,
                    fontSize: '14px',
                    color: C.text,
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: C.font,
                    fontSize: '11px',
                    color: C.muted,
                    margin: '2px 0 0 0',
                    textTransform: 'capitalize',
                  }}
                >
                  {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default function GroupsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('challenges')

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
          padding: '12px 16px 0',
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

        {/* Tab bar */}
        <div style={{
          display: 'flex',
          borderBottom: `0.5px solid ${C.border}`,
          marginTop: '10px',
        }}>
          {pageTabs.map(tab => (
            <button
              key={tab.id}
              onPointerDown={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '10px 0 12px',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab.id
                  ? C.accent
                  : 'transparent'}`,
                fontFamily: C.font,
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? C.text : C.muted,
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                transition: 'color 200ms ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}

      {activeTab === 'challenges' && (
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
      )}

      {activeTab === 'explore' && <ExploreTab />}

      {activeTab === 'leaderboard' && <LeaderboardTab />}

    </div>
  )
}

