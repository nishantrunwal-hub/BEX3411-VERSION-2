'use client'

import { useState, useEffect, useRef } from 'react'
import { SiriOrb } from '@/components/ui/siri-orb'

const C = {
  bg:        '#080808',
  card:      '#141414',
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

type RecordState = 'idle' | 'active' | 'complete'

export default function RecordPage() {
  const [state, setState] = useState<RecordState>('idle')
  const [time, setTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [pace, setPace] = useState('--:--')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Timer when active
  useEffect(() => {
    if (state === 'active') {
      intervalRef.current = setInterval(() => {
        setTime(t => t + 1)
        // Simulate distance increment
        setDistance(d => {
          const newD = d + 0.001
          // Calculate pace in min/km
          if (newD > 0 && time > 0) {
            const paceSeconds = time / newD
            const paceMin = Math.floor(paceSeconds / 60)
            const paceSec = Math.floor(paceSeconds % 60)
            setPace(`${paceMin}:${paceSec.toString().padStart(2, '0')}`)
          }
          return newD
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state])

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Simulate NFC tap
  const handleOrbTap = () => {
    if (state === 'idle') {
      setState('active')
    } else if (state === 'active') {
      setState('complete')
    }
  }

  const handleReset = () => {
    setState('idle')
    setTime(0)
    setDistance(0)
    setPace('--:--')
  }

  // Orb colours per state
  const orbColors = {
    idle: {
      bg: 'transparent',
      c1: 'oklch(55% 0.22 250)',
      c2: 'oklch(58% 0.20 230)',
      c3: 'oklch(52% 0.25 260)',
    },
    active: {
      bg: 'transparent',
      c1: 'oklch(62% 0.25 245)',
      c2: 'oklch(65% 0.22 220)',
      c3: 'oklch(60% 0.28 255)',
    },
    complete: {
      bg: 'transparent',
      c1: 'oklch(65% 0.22 155)',
      c2: 'oklch(68% 0.20 140)',
      c3: 'oklch(63% 0.25 165)',
    },
  }

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 'calc(env(safe-area-inset-top) + 80px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 80px)',
        paddingLeft: '24px',
        paddingRight: '24px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >

      {/* Ambient background glow matching orb state */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: state === 'complete'
          ? 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        transition: 'background 1s ease',
      }} />

      {/* Top section — state label */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          {/* Status dot */}
          <div style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: state === 'idle'    ? C.dim    :
                        state === 'active'  ? '#00E5A0' :
                        '#00E5A0',
            animation: state === 'active' ? 'blink 1.5s ease infinite' : 'none',
          }} />
          <span style={{
            fontFamily: C.mono,
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: state === 'idle'    ? C.muted   :
                   state === 'active'  ? '#00E5A0' :
                   '#00E5A0',
            textTransform: 'uppercase',
          }}>
            {state === 'idle'    ? 'Ready'    :
             state === 'active'  ? 'Recording' :
             'Completed'}
          </span>
        </div>

        {/* Timer — only shows when active or complete */}
        {state !== 'idle' && (
          <p style={{
            fontFamily: C.mono,
            fontSize: '42px',
            fontWeight: 700,
            color: C.text,
            margin: 0,
            letterSpacing: '0.05em',
            animation: 'fadeIn 400ms ease',
          }}>
            {formatTime(time)}
          </p>
        )}
      </div>

      {/* CENTRE — Siri Orb NFC ring */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div style={{
          position: 'relative',
          width: '180px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={handleOrbTap}
        >
          {/* Outer tap ring — pulsing */}
          {state === 'idle' && (
            <>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                border: '1px solid rgba(0,102,255,0.2)',
                animation: 'ringPulse 2s ease-out infinite',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                border: '1px solid rgba(0,102,255,0.1)',
                animation: 'ringPulse 2s ease-out infinite 0.5s',
                pointerEvents: 'none',
              }} />
            </>
          )}

          <SiriOrb
            size="180px"
            animationDuration={state === 'active' ? 8 : 20}
            colors={orbColors[state]}
          />

          {/* Logo centred over orb */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/ascent-logo.png"
              alt="Ascent"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
              style={{
                width: '52px',
                height: '52px',
                objectFit: 'contain',
                filter: 'brightness(100)',
              }}
            />
          </div>
        </div>

        {/* Tap instruction below orb */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: C.font,
            fontWeight: 700,
            fontSize: '20px',
            color: C.text,
            margin: 0,
          }}>
            {state === 'idle'    ? 'Tap an ASCENT board'    :
             state === 'active'  ? 'Tap board to finish'    :
             'Challenge Complete'}
          </p>
          <p style={{
            fontFamily: C.font,
            fontSize: '14px',
            color: C.muted,
            margin: 0,
            maxWidth: '240px',
            lineHeight: 1.5,
          }}>
            {state === 'idle'
              ? 'Hold your phone to any ASCENT NFC board to begin your challenge'
              : state === 'active'
              ? 'Hold your phone to the finish board to verify completion'
              : 'Your activity has been verified and recorded'}
          </p>
        </div>
      </div>

      {/* Bottom — stats when active */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        animation: state !== 'idle' ? 'fadeIn 400ms ease' : 'none',
      }}>

        {/* Stats row — visible when active or complete */}
        {state !== 'idle' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '8px',
            width: '100%',
          }}>
            {[
              { label: 'Distance', value: `${distance.toFixed(2)} km` },
              { label: 'Pace',     value: pace                         },
              { label: 'Time',     value: formatTime(time)             },
            ].map(stat => (
              <div
                key={stat.label}
                style={{
                  background: C.card,
                  borderRadius: '12px',
                  border: `0.5px solid ${C.border}`,
                  padding: '12px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{
                  fontFamily: C.mono,
                  fontSize: '14px',
                  fontWeight: 700,
                  color: C.text,
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: C.font,
                  fontSize: '10px',
                  color: C.muted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Reset button — only on complete */}
        {state === 'complete' && (
          <button
            onClick={handleReset}
            style={{
              width: '100%',
              height: '52px',
              background: C.accent,
              border: 'none',
              borderRadius: '100px',
              fontFamily: C.font,
              fontWeight: 600,
              fontSize: '16px',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'opacity 200ms ease',
              animation: 'fadeIn 600ms ease',
            }}
            onTouchStart={e => e.currentTarget.style.opacity = '0.8'}
            onTouchEnd={e => e.currentTarget.style.opacity = '1'}
          >
            Start New Challenge
          </button>
        )}

        {/* Abandon — only when active */}
        {state === 'active' && (
          <button
            onClick={handleReset}
            style={{
              width: '100%',
              height: '44px',
              background: 'transparent',
              border: `0.5px solid rgba(255,59,59,0.3)`,
              borderRadius: '100px',
              fontFamily: C.font,
              fontWeight: 500,
              fontSize: '14px',
              color: 'rgba(255,59,59,0.7)',
              cursor: 'pointer',
            }}
          >
            Abandon Challenge
          </button>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes ringPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 0;   }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </div>
  )
}
