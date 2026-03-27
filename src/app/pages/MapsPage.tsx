'use client'

import React, { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Bookmark,
  ChevronDown,
  Layers,
  Crosshair,
  PenLine,
  Info,
  MapPin,
  TrendingUp,
  Clock,
  Star,
  Navigation,
  Home,
  Map as MapIcon,
  Radio,
  Users,
  BarChart2,
  Check,
} from 'lucide-react'

import {
  Map as MapGL,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MapRoute,
} from '@/components/ui/map'

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

// --- ROUTE DATA ---
const nearbyRoutes = [
  {
    id: 1,
    name: 'Yarra River Trail',
    location: 'Melbourne CBD',
    distance: '6.79 km',
    elevation: '20m',
    duration: '0h 39m',
    difficulty: 'Easy',
    surface: '93% Paved',
    madeForYou: true,
    rating: 4.8,
    reviews: 203,
    type: 'Running',
    startCoord: [144.958, -37.820] as [number, number],
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=200&h=120&fit=crop',
    coordinates: [
      [144.955, -37.818],
      [144.958, -37.815],
      [144.963, -37.812],
      [144.967, -37.815],
      [144.965, -37.820],
      [144.960, -37.823],
      [144.955, -37.820],
      [144.955, -37.818],
    ] as [number, number][],
  },
  {
    id: 2,
    name: 'St Kilda Coastal Run',
    location: 'St Kilda Beach',
    distance: '8.2 km',
    elevation: '12m',
    duration: '0h 48m',
    difficulty: 'Easy',
    surface: '100% Paved',
    madeForYou: false,
    rating: 4.7,
    reviews: 156,
    type: 'Running',
    startCoord: [144.978, -37.867] as [number, number],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=120&fit=crop',
    coordinates: [
      [144.975, -37.863],
      [144.978, -37.860],
      [144.983, -37.858],
      [144.987, -37.862],
      [144.985, -37.867],
      [144.980, -37.870],
      [144.975, -37.868],
      [144.975, -37.863],
    ] as [number, number][],
  },
  {
    id: 3,
    name: 'Dandenong Ranges Trail',
    location: 'Ferny Creek',
    distance: '14.5 km',
    elevation: '420m',
    duration: '2h 10m',
    difficulty: 'Hard',
    surface: '60% Trail',
    madeForYou: false,
    rating: 4.9,
    reviews: 89,
    type: 'Trail Running',
    startCoord: [145.330, -37.870] as [number, number],
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=120&fit=crop',
    coordinates: [
      [145.325, -37.865],
      [145.330, -37.860],
      [145.338, -37.858],
      [145.342, -37.864],
      [145.338, -37.870],
      [145.330, -37.873],
      [145.325, -37.870],
      [145.325, -37.865],
    ] as [number, number][],
  },
  {
    id: 4,
    name: 'Plenty Gorge Loop',
    location: 'South Morang',
    distance: '11.3 km',
    elevation: '198m',
    duration: '1h 25m',
    difficulty: 'Moderate',
    surface: '75% Trail',
    madeForYou: true,
    rating: 4.6,
    reviews: 67,
    type: 'Hiking',
    startCoord: [145.078, -37.640] as [number, number],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=120&fit=crop',
    coordinates: [
      [145.073, -37.635],
      [145.078, -37.630],
      [145.085, -37.632],
      [145.088, -37.638],
      [145.083, -37.644],
      [145.076, -37.645],
      [145.073, -37.640],
      [145.073, -37.635],
    ] as [number, number][],
  },
  {
    id: 5,
    name: 'Capital City Trail',
    location: 'Melbourne Inner North',
    distance: '29 km',
    elevation: '95m',
    duration: '2h 45m',
    difficulty: 'Moderate',
    surface: '88% Paved',
    madeForYou: false,
    rating: 4.8,
    reviews: 312,
    type: 'Cycling',
    startCoord: [144.970, -37.800] as [number, number],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=120&fit=crop',
    coordinates: [
      [144.965, -37.795],
      [144.975, -37.790],
      [144.985, -37.793],
      [144.988, -37.800],
      [144.982, -37.807],
      [144.972, -37.808],
      [144.965, -37.803],
      [144.965, -37.795],
    ] as [number, number][],
  },
]

// --- DROPDOWN DATA ---
const filterDropdowns = {
  routes: {
    label: 'Routes',
    accent: true,
    options: ['All Routes', 'Running', 'Trail Running', 'Cycling', 'Hiking'],
  },
  length: {
    label: 'Length',
    accent: false,
    options: ['Any Length', 'Under 5km', '5–10km', '10–20km', '20km+'],
  },
  elevation: {
    label: 'Elevation',
    accent: false,
    options: ['Any Elevation', 'Flat (0–50m)', 'Moderate (50–200m)', 'Hilly (200–500m)', 'Mountain (500m+)'],
  },
  surface: {
    label: 'Surface',
    accent: false,
    options: ['Any Surface', 'Paved', 'Trail', 'Mixed', 'Gravel'],
  },
  difficulty: {
    label: 'Difficulty',
    accent: false,
    options: ['Any Difficulty', 'Easy', 'Moderate', 'Hard', 'Expert'],
  },
}

function getDifficultyStyle(d: string) {
  switch (d) {
    case 'Easy':     return { color: '#00E5A0', bg: 'rgba(0,229,160,0.15)'  }
    case 'Moderate': return { color: '#F5A623', bg: 'rgba(245,166,35,0.15)' }
    case 'Hard':     return { color: '#FF3B3B', bg: 'rgba(255,59,59,0.15)'  }
    default:         return { color: C.muted,   bg: 'rgba(255,255,255,0.08)' }
  }
}

function FilterDropdown({
  id,
  config,
  value,
  onChange,
  openId,
  setOpenId,
}: {
  id: string
  config: { label: string; accent: boolean; options: string[] }
  value: string
  onChange: (v: string) => void
  openId: string | null
  setOpenId: (id: string | null) => void
}) {
  const isOpen = openId === id
  const isActive = value !== config.options[0]

  return (
    <div
      style={{ position: 'relative', flexShrink: 0, zIndex: isOpen ? 500 : 10 }}
      // Stop map from intercepting touches
      onTouchStart={e => e.stopPropagation()}
      onTouchEnd={e => e.stopPropagation()}
      onTouchMove={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
    >
      {/* Trigger */}
      <button
        onPointerDown={e => {
          e.stopPropagation()
          e.preventDefault()
          setOpenId(isOpen ? null : id)
        }}
        style={{
          height: '34px',
          padding: '0 12px',
          background: isActive || config.accent ? C.accentDim : 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${isActive || config.accent ? C.accent : 'rgba(255,255,255,0.2)'}`,
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          fontFamily: C.font,
          fontSize: '13px',
          fontWeight: isActive || config.accent ? 600 : 400,
          color: isActive || config.accent ? C.accent : C.text,
          whiteSpace: 'nowrap',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        }}
      >
        {isActive ? value : config.label}
        <ChevronDown
          size={12}
          color={isActive || config.accent ? C.accent : C.muted}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
          }}
        />
      </button>

      {/* Dropdown — renders above everything */}
      {isOpen && (
        <>
          {/* Invisible backdrop to close */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 490,
            }}
            onPointerDown={e => {
              e.stopPropagation()
              setOpenId(null)
            }}
          />

          {/* Menu */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              minWidth: '170px',
              background: '#1c1c1c',
              border: `1px solid rgba(0,102,255,0.35)`,
              borderRadius: '14px',
              overflow: 'hidden',
              zIndex: 500,
              boxShadow: '0 12px 40px rgba(0,0,0,0.9)',
            }}
            onTouchStart={e => e.stopPropagation()}
            onTouchEnd={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            {config.options.map((opt, i) => (
              <div
                key={opt}
                onPointerDown={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  onChange(opt)
                  setOpenId(null)
                }}
                style={{
                  padding: '13px 16px',
                  background: value === opt ? C.accentDim : 'transparent',
                  borderBottom: i < config.options.length - 1
                    ? '0.5px solid rgba(255,255,255,0.06)'
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  fontFamily: C.font,
                  fontSize: '13px',
                  fontWeight: value === opt ? 600 : 400,
                  color: value === opt ? C.accent : '#cccccc',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                }}
              >
                {opt}
                {value === opt && <Check size={13} color={C.accent} />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function RouteCard({
  route,
  isSelected,
  onSelect,
}: {
  route: typeof nearbyRoutes[0]
  isSelected: boolean
  onSelect: () => void
}) {
  const [saved, setSaved] = useState(false)
  const diff = getDifficultyStyle(route.difficulty)

  return (
    <div
      onClick={onSelect}
      style={{
        flexShrink: 0,
        width: '260px',
        background: isSelected ? '#1a1a2e' : C.card,
        borderRadius: '14px',
        border: `1px solid ${isSelected ? C.accent : C.border}`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 200ms ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '110px' }}>
        <img
          src={route.image}
          alt={route.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Save */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(p => !p) }}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.65)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Bookmark
            size={13}
            color={saved ? C.accent : '#ffffff'}
            fill={saved ? C.accent : 'none'}
          />
        </button>

        {/* Surface badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(4px)',
            borderRadius: '100px',
            padding: '3px 10px',
            fontFamily: C.font,
            fontSize: '10px',
            fontWeight: 500,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: C.accent,
            }}
          />
          {route.surface}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '10px 12px 12px' }}>
        <h3
          style={{
            fontFamily: C.font,
            fontWeight: 700,
            fontSize: '14px',
            color: C.text,
            margin: '0 0 3px 0',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {route.name}
        </h3>

        {/* Difficulty + distance + time */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '6px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: C.font,
              fontSize: '11px',
              fontWeight: 600,
              color: diff.color,
              background: diff.bg,
              padding: '2px 8px',
              borderRadius: '100px',
            }}
          >
            {route.difficulty}
          </span>
          <span
            style={{
              fontFamily: C.font,
              fontSize: '12px',
              color: C.muted,
            }}
          >
            {route.distance} · {route.elevation} · {route.duration}
          </span>
        </div>

        {/* Location */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: route.madeForYou ? '6px' : '0',
          }}
        >
          <MapPin size={10} color={C.muted} />
          <span
            style={{
              fontFamily: C.font,
              fontSize: '11px',
              color: C.muted,
            }}
          >
            {route.location}
          </span>
        </div>

        {/* Made for you */}
        {route.madeForYou && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: C.accentDim,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Star size={9} color={C.accent} fill={C.accent} />
            </div>
            <span
              style={{
                fontFamily: C.font,
                fontSize: '11px',
                fontWeight: 600,
                color: C.accent,
              }}
            >
              Made for you
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MapsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('maps')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null)
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    routes: 'All Routes',
    length: 'Any Length',
    elevation: 'Any Elevation',
    surface: 'Any Surface',
    difficulty: 'Any Difficulty',
  })

  const updateFilter = (key: string, value: string) => {
    setFilterValues(p => ({ ...p, [key]: value }))
  }

  const tabs = [
    { id: 'home',   label: 'Home',   icon: Home,     path: '/home'      },
    { id: 'maps',   label: 'Maps',   icon: MapIcon,  path: '/maps'      },
    { id: 'record', label: 'Record', icon: Radio,    path: '/home'      },
    { id: 'groups', label: 'Groups', icon: Users,    path: '/community' },
    { id: 'you',    label: 'You',    icon: BarChart2, path: '/home'     },
  ]

  // Close dropdowns when tapping map
  const handleMapTap = () => setOpenDropdown(null)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: C.bg,
        overflow: 'hidden',
      }}
      onClick={handleMapTap}
    >

      {/* REAL MAPLIBRE MAP */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <MapGL
          center={[144.960, -37.820]}
          zoom={12}
          styles={{
            dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            light: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
          }}
        >
          {/* Route lines — all routes in blue */}
          {nearbyRoutes.map(route => (
            <MapRoute
              key={route.id}
              coordinates={route.coordinates}
              color={selectedRoute === route.id ? '#0066FF' : 'rgba(0,102,255,0.5)'}
              width={selectedRoute === route.id ? 4 : 2.5}
              opacity={selectedRoute === route.id ? 1 : 0.7}
            />
          ))}

          {/* Route start markers */}
          {nearbyRoutes.map(route => (
            <MapMarker
              key={`marker-${route.id}`}
              longitude={route.startCoord[0]}
              latitude={route.startCoord[1]}
              onClick={() => setSelectedRoute(
                selectedRoute === route.id ? null : route.id
              )}
            >
              <MarkerContent>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: selectedRoute === route.id
                      ? C.accent
                      : 'rgba(0,102,255,0.2)',
                    border: `2px solid ${C.accent}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: selectedRoute === route.id
                      ? `0 0 16px rgba(0,102,255,0.6)`
                      : 'none',
                    transition: 'all 200ms ease',
                  }}
                >
                  <Navigation
                    size={14}
                    color={selectedRoute === route.id ? '#ffffff' : C.accent}
                  />
                </div>
              </MarkerContent>
              <MarkerLabel position="bottom">
                <span
                  style={{
                    fontFamily: C.font,
                    fontSize: '10px',
                    fontWeight: 600,
                    color: C.text,
                    background: 'rgba(10,10,10,0.75)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {route.distance}
                </span>
              </MarkerLabel>
            </MapMarker>
          ))}

          {/* User location marker */}
          <MapMarker longitude={144.958} latitude={-37.820}>
            <MarkerContent>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: C.accent,
                    border: '3px solid #ffffff',
                    boxShadow: `0 0 20px rgba(0,102,255,0.5)`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '-8px',
                    borderRadius: '50%',
                    background: 'rgba(0,102,255,0.15)',
                    animation: 'pulse 2s ease-out infinite',
                  }}
                />
              </div>
            </MarkerContent>
          </MapMarker>

          {/* Map controls */}
          <MapControls
            position="bottom-right"
            showZoom={true}
            showLocate={true}
          />
        </MapGL>
      </div>

      {/* TOP SEARCH BAR + FILTERS */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: 'calc(env(safe-area-inset-top) + 10px) 12px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search bar row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>

          {/* Activity type pill */}
          <div
            style={{
              height: '46px',
              padding: '0 12px',
              background: 'rgba(10,10,10,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '100px',
              border: `1px solid ${C.accent}`,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: C.accentDim,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={12} color={C.accent} />
            </div>
            <ChevronDown size={13} color={C.accent} />
          </div>

          {/* Search input */}
          <div
            style={{
              flex: 1,
              height: '46px',
              background: 'rgba(10,10,10,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '100px',
              border: `0.5px solid ${C.border}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: '8px',
            }}
          >
            <Search size={15} color={C.muted} />
            <span style={{ fontFamily: C.font, fontSize: '15px', color: C.muted }}>
              Search locations
            </span>
          </div>

          {/* Saved */}
          <div
            style={{
              height: '46px',
              padding: '0 12px',
              background: 'rgba(10,10,10,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '100px',
              border: `0.5px solid ${C.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            <Bookmark size={13} color={C.text} />
            <span style={{ fontFamily: C.font, fontSize: '13px', fontWeight: 500, color: C.text }}>
              Saved
            </span>
          </div>
        </div>

        {/* Filter pills with dropdowns */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {Object.entries(filterDropdowns).map(([key, config]) => (
            <FilterDropdown
              key={key}
              id={key}
              config={config}
              value={filterValues[key]}
              onChange={v => updateFilter(key, v)}
              openId={openDropdown}
              setOpenId={setOpenDropdown}
            />
          ))}
        </div>
      </div>

      {/* COMPASS — top right */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top) + 110px)',
          right: '12px',
          zIndex: 10,
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'rgba(10,10,10,0.88)',
          border: `0.5px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: C.font,
          fontWeight: 700,
          fontSize: '13px',
          color: C.text,
        }}
      >
        N
      </div>

      {/* RIGHT CONTROLS */}
      <div
        style={{
          position: 'absolute',
          right: '12px',
          bottom: 'calc(env(safe-area-inset-bottom) + 220px)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {/* Layers with count */}
        <button
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(10,10,10,0.92)',
            backdropFilter: 'blur(8px)',
            border: `0.5px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Layers size={20} color={C.text} />
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: C.bg,
              border: `1px solid ${C.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: C.mono,
              fontSize: '9px',
              color: C.text,
            }}
          >
            {nearbyRoutes.length}
          </div>
        </button>

        {/* 3D */}
        <button
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(10,10,10,0.92)',
            backdropFilter: 'blur(8px)',
            border: `0.5px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: C.display,
            fontSize: '16px',
            color: C.text,
          }}
        >
          3D
        </button>

        {/* Draw route */}
        <button
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: C.accent,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `0 0 20px rgba(0,102,255,0.4)`,
          }}
        >
          <PenLine size={20} color="#ffffff" />
        </button>
      </div>

      {/* INFO BUTTON */}
      <button
        style={{
          position: 'absolute',
          left: '12px',
          bottom: 'calc(env(safe-area-inset-bottom) + 220px)',
          zIndex: 10,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(10,10,10,0.88)',
          border: `0.5px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Info size={15} color={C.muted} />
      </button>

      {/* BOTTOM SHEET — route cards horizontal scroll */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(env(safe-area-inset-bottom) + 60px)',
          left: 0,
          right: 0,
          zIndex: 20,
          background: 'rgba(10,10,10,0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '20px 20px 0 0',
          borderTop: `0.5px solid ${C.border}`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Pull handle */}
        <div
          style={{
            width: '36px',
            height: '4px',
            background: C.dim,
            borderRadius: '100px',
            margin: '10px auto 0',
          }}
        />

        {/* Selected route detail — appears when route selected */}
        {selectedRoute !== null && (() => {
          const route = nearbyRoutes.find(r => r.id === selectedRoute)!
          const diff = getDifficultyStyle(route.difficulty)
          return (
            <div
              style={{
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: `0.5px solid ${C.border}`,
              }}
            >
              <img
                src={route.image}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: C.font,
                    fontWeight: 700,
                    fontSize: '15px',
                    color: C.text,
                    margin: '0 0 3px 0',
                  }}
                >
                  {route.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: C.font,
                      fontSize: '11px',
                      fontWeight: 600,
                      color: diff.color,
                      background: diff.bg,
                      padding: '2px 8px',
                      borderRadius: '100px',
                    }}
                  >
                    {route.difficulty}
                  </span>
                  <span style={{ fontFamily: C.font, fontSize: '12px', color: C.muted }}>
                    {route.distance} · {route.elevation} · {route.duration}
                  </span>
                </div>
                {route.madeForYou && (
                  <span
                    style={{
                      fontFamily: C.font,
                      fontSize: '11px',
                      fontWeight: 600,
                      color: C.accent,
                    }}
                  >
                    ★ Made for you
                  </span>
                )}
              </div>
              <button
                style={{
                  background: C.accent,
                  border: 'none',
                  borderRadius: '100px',
                  padding: '8px 16px',
                  fontFamily: C.font,
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                Start
              </button>
            </div>
          )
        })()}

        {/* Routes count + scroll */}
        <div
          style={{
            padding: '10px 16px 6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: C.font, fontWeight: 700, fontSize: '15px', color: C.text }}>
            Routes Nearby
          </span>
          <span style={{ fontFamily: C.mono, fontSize: '11px', color: C.accent }}>
            {nearbyRoutes.length} routes
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            padding: '4px 16px 16px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {nearbyRoutes.map(route => (
            <RouteCard
              key={route.id}
              route={route}
              isSelected={selectedRoute === route.id}
              onSelect={() => setSelectedRoute(
                selectedRoute === route.id ? null : route.id
              )}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM TAB BAR */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: `0.5px solid ${C.border}`,
          paddingBottom: `env(safe-area-inset-bottom)`,
          display: 'flex',
          alignItems: 'center',
          height: 'calc(60px + env(safe-area-inset-bottom))',
        }}
      >
        {tabs.map(tab => {
          const isActive = tab.id === 'maps'
          const isRecord = tab.id === 'record'

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                height: '60px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                padding: 0,
              }}
            >
              {isRecord ? (
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: C.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 20px rgba(0,102,255,0.4)`,
                    marginTop: '-8px',
                  }}
                >
                  <tab.icon size={20} color="#ffffff" />
                </div>
              ) : (
                <>
                  <tab.icon size={22} color={isActive ? C.accent : C.dim} />
                  <span
                    style={{
                      fontFamily: C.font,
                      fontSize: '10px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? C.accent : C.dim,
                    }}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </button>
          )
        })}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
