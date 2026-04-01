// src/pages/GroupsPage.tsx
// Full build — Challenges, Clubs, Explore tabs

'use client'

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  MessageSquare,
  Settings,
  MapPin,
  Users,
  Trophy,
  Bike,
  PersonStanding,
  Waves,
  Footprints,
  ChevronLeft,
  ArrowLeft,
  Home,
  Map,
  Radio,
  BarChart2,
  Check,
  X,
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

// --- CLUBS DATA ---
const clubs = [
  {
    id: 1,
    name: 'MAAP',
    logo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=80&h=80&fit=crop',
    type: 'ride',
    location: 'Melbourne, Victoria, Australia',
    members: '111,092 Cyclists',
  },
  {
    id: 2,
    name: 'Every Drop Counts',
    logo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop',
    type: 'run',
    location: 'Melbourne, Victoria, Australia',
    members: '25,361 Runners',
  },
  {
    id: 3,
    name: 'Relief Run',
    logo: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=80&h=80&fit=crop',
    type: 'run',
    location: 'Melbourne, Victoria, Australia',
    members: '21,861 Runners',
  },
  {
    id: 4,
    name: 'Everesting',
    logo: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=80&h=80&fit=crop',
    type: 'ride',
    location: 'Melbourne, Victoria, Australia',
    members: '18,143 Cyclists',
  },
  {
    id: 5,
    name: 'Lululemon Run Club',
    logo: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=80&h=80&fit=crop',
    type: 'run',
    location: 'Melbourne, Victoria, Australia',
    members: '94,220 Runners',
  },
  {
    id: 6,
    name: 'Stoke Trail Runners',
    logo: 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=80&h=80&fit=crop',
    type: 'run',
    location: 'Melbourne, Victoria, Australia',
    members: '8,440 Runners',
  },
  {
    id: 7,
    name: 'Wahoo Cycling',
    logo: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=80&h=80&fit=crop',
    type: 'ride',
    location: 'Melbourne, Victoria, Australia',
    members: '44,800 Cyclists',
  },
  {
    id: 8,
    name: 'Melbourne Marathon Club',
    logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=80&h=80&fit=crop',
    type: 'run',
    location: 'Melbourne, Victoria, Australia',
    members: '32,500 Runners',
  },
  {
    id: 9,
    name: 'Garmin Athletes',
    logo: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=80&h=80&fit=crop',
    type: 'run',
    location: 'Melbourne, Victoria, Australia',
    members: '218,000 Athletes',
  },
  {
    id: 10,
    name: 'TrailHead Collective',
    logo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80&h=80&fit=crop',
    type: 'walk',
    location: 'Melbourne, Victoria, Australia',
    members: '12,800 Hikers',
  },
  {
    id: 11,
    name: 'Ironman Club Australia',
    logo: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=80&h=80&fit=crop',
    type: 'swim',
    location: 'Melbourne, Victoria, Australia',
    members: '29,400 Triathletes',
  },
  {
    id: 12,
    name: 'Hyrox Australia',
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&h=80&fit=crop',
    type: 'run',
    location: 'Melbourne, Victoria, Australia',
    members: '15,600 Athletes',
  },
  {
    id: 13,
    name: 'Velocio Cycling Kit',
    logo: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=80&h=80&fit=crop',
    type: 'ride',
    location: 'Melbourne, Victoria, Australia',
    members: '38,200 Cyclists',
  },
  {
    id: 14,
    name: 'Open Water Swimmers VIC',
    logo: 'https://images.unsplash.com/photo-1560090995-01632a28895b?w=80&h=80&fit=crop',
    type: 'swim',
    location: 'Melbourne, Victoria, Australia',
    members: '6,900 Swimmers',
  },
  {
    id: 15,
    name: 'Salomon Trail Community',
    logo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=80&h=80&fit=crop',
    type: 'walk',
    location: 'Melbourne, Victoria, Australia',
    members: '56,100 Runners',
  },
]

// --- ACTIVITY TYPE ICONS ---
function ActivityIcon({ type, size = 16 }: { type: string; size?: number }) {
  const icons: Record<string, any> = {
    run:  PersonStanding,
    ride: Bike,
    swim: Waves,
    walk: Footprints,
  }
  const Icon = icons[type] || PersonStanding
  return <Icon size={size} color={C.muted} />
}

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
            <ActivityIcon type={challenge.type} size={16} />
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

// --- CLUB CARD ---
function ClubCard({ club }: { club: typeof clubs[0] }) {
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
      {/* Logo */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '10px',
          background: C.card2,
          border: `0.5px solid ${C.border}`,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={club.logo}
          alt={club.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Info */}
      <div>
        <h3
          style={{
            fontFamily: C.font,
            fontWeight: 700,
            fontSize: '16px',
            color: C.text,
            margin: '0 0 6px 0',
          }}
        >
          {club.name}
        </h3>
        <ActivityIcon type={club.type} size={15} />
        <p
          style={{
            fontFamily: C.font,
            fontSize: '12px',
            color: C.muted,
            margin: '6px 0 2px 0',
            lineHeight: 1.4,
          }}
        >
          {club.location}
        </p>
        <p
          style={{
            fontFamily: C.font,
            fontSize: '12px',
            color: C.muted,
            margin: 0,
          }}
        >
          {club.members}
        </p>
      </div>

      {/* Join */}
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

// --- EXPLORE TAB ---
function ExploreTab() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Rotating placeholder text
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
          {/* Back arrow when focused */}
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

          {/* Input */}
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

          {/* Animated placeholder — only when no query and not focused showing typed text */}
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

          {/* Clear button */}
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

      {/* Quick filter chips */}
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

      {/* Suggestions list */}
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

// --- ACTIVITY FILTER PILLS ---
const activityFilters = [
  { id: 'run',  label: 'Run',  icon: PersonStanding },
  { id: 'ride', label: 'Ride', icon: Bike           },
  { id: 'swim', label: 'Swim', icon: Waves          },
  { id: 'walk', label: 'Walk', icon: Footprints     },
]

// --- MAIN PAGE ---
export default function GroupsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('challenges')
  const [activeActivity, setActiveActivity] = useState('run')

  const navTabs = [
    { id: 'home',   label: 'Home',   icon: Home,     path: '/'      },
    { id: 'maps',   label: 'Maps',   icon: Map,      path: '/maps'      },
    { id: 'record', label: 'Record', icon: Radio,    path: '/'      },
    { id: 'groups', label: 'Groups', icon: Users,    path: '/groups'    },
    { id: 'you',    label: 'You',    icon: BarChart2, path: '/profile'     },
  ]

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100svh',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 60px)',
      }}
    >

      {/* TOP BAR */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(10,10,10,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `0.5px solid ${C.border}`,
          paddingTop: `env(safe-area-inset-top)`,
        }}
      >
        {/* Title row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px 10px',
          }}
        >
          <Search size={22} color={C.muted} />
          <span
            style={{
              fontFamily: C.font,
              fontWeight: 700,
              fontSize: '17px',
              color: C.text,
            }}
          >
            Groups
          </span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <MessageSquare size={22} color={C.muted} />
            <Settings size={22} color={C.muted} />
          </div>
        </div>

        {/* Sub tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: `0.5px solid ${C.border}`,
          }}
        >
          {['active', 'challenges', 'clubs', 'explore'].map(tab => (
            <button
              key={tab}
              onPointerDown={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '10px 0 12px',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab ? C.accent : 'transparent'}`,
                fontFamily: C.font,
                fontSize: '14px',
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? C.text : C.muted,
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                textTransform: 'capitalize',
                transition: 'color 200ms ease',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Activity filter pills — only on challenges tab */}
        {activeTab === 'challenges' && (
          <div
            style={{
              display: 'flex',
              gap: '8px',
              padding: '10px 16px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {activityFilters.map(filter => (
              <button
                key={filter.id}
                onPointerDown={() => setActiveActivity(filter.id)}
                style={{
                  flexShrink: 0,
                  height: '34px',
                  padding: '0 14px',
                  background: activeActivity === filter.id
                    ? C.accentDim
                    : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${activeActivity === filter.id
                    ? C.accent
                    : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontFamily: C.font,
                  fontSize: '13px',
                  fontWeight: activeActivity === filter.id ? 600 : 400,
                  color: activeActivity === filter.id ? C.accent : C.muted,
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <filter.icon size={14} color={activeActivity === filter.id ? C.accent : C.muted} />
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PAGE CONTENT */}

      {/* ACTIVE TAB */}
      {activeTab === 'active' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 24px',
            gap: '12px',
          }}
        >
          <Users size={48} color={C.dim} />
          <p style={{ fontFamily: C.font, fontWeight: 700, fontSize: '18px', color: C.text, margin: 0 }}>
            No active groups yet
          </p>
          <p style={{ fontFamily: C.font, fontSize: '14px', color: C.muted, textAlign: 'center', margin: 0 }}>
            Join a challenge or club to get started
          </p>
          <button
            onPointerDown={() => setActiveTab('challenges')}
            style={{
              marginTop: '8px',
              height: '46px',
              padding: '0 28px',
              background: C.accent,
              border: 'none',
              borderRadius: '100px',
              fontFamily: C.font,
              fontWeight: 600,
              fontSize: '15px',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Browse Challenges
          </button>
        </div>
      )}

      {/* CHALLENGES TAB */}
      {activeTab === 'challenges' && (
        <div
          style={{
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {challenges
            .filter(c =>
              activeActivity === 'run'  ? ['run', 'walk'].includes(c.type) :
              activeActivity === 'ride' ? c.type === 'ride' :
              activeActivity === 'swim' ? c.type === 'swim' :
              true
            )
            .map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
        </div>
      )}

      {/* CLUBS TAB */}
      {activeTab === 'clubs' && (
        <div style={{ padding: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: C.accentDim,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MapPin size={14} color={C.accent} />
            </div>
            <span
              style={{
                fontFamily: C.font,
                fontWeight: 700,
                fontSize: '16px',
                color: C.text,
              }}
            >
              Popular Clubs Near You
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            {clubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      )}

      {/* EXPLORE TAB */}
      {activeTab === 'explore' && <ExploreTab />}

          </div>
  )
}