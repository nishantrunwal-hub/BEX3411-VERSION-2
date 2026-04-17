import { Settings, Lock, Sparkles } from 'lucide-react'

// Constants
const C = {
  bg: '#0a0a0a',
  card: '#141414',
  accent: '#0066FF',
  text: '#ffffff',
  muted: 'rgba(255, 255, 255, 0.5)',
  font: 'Inter, sans-serif',
  mono: 'Space Mono, monospace',
}

const NFT_BADGE = "/nft-badge.jpg" // Using general placeholder matching standard structure for uploaded attached assets.

export default function YouPage() {
  const earnedBadges = [
    { id: 1, title: 'Yarra River 10K', tier: 'GOLD', date: 'Apr 8, 2026', color: '#FFD700', shadow: 'rgba(0,102,255,0.5)' },
    { id: 2, title: 'St Kilda Sprint', tier: 'SILVER', date: 'Apr 4, 2026', color: '#C0C0C0', shadow: 'rgba(192,192,192,0.4)' },
  ]
  
  const lockedBadges = [
    { id: 5 },
    { id: 6 },
  ]

  return (
    <div style={{
      background: C.bg,
      minHeight: '100svh',
      fontFamily: C.font,
      color: C.text,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 1. TOP BAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(env(safe-area-inset-top) + 16px) 24px 16px',
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>You</h1>
        <div style={{ position: 'absolute', right: '24px' }}>
          <Settings size={24} color={C.text} />
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 24px calc(env(safe-area-inset-bottom) + 160px)', // Account for buttons + tab bar
      }}>
        {/* 2. PROFILE SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: C.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: 700,
          }}>
            NP
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>Marcus Rashford</h2>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: C.muted }}>Melbourne, AU · Member since 2026</p>
          </div>
        </div>

        {/* 3. STATS ROW */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px',
          marginTop: '32px',
        }}>
          {[
            { label: 'Badges', value: '12', icon: '🏅' },
            { label: 'Challenges', value: '8', icon: '⚡' },
            { label: 'Miles', value: '247mi', icon: '🗺' }
          ].map(stat => (
            <div key={stat.label} style={{
              background: C.card,
              borderRadius: '16px',
              padding: '16px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</span>
              <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: C.mono }}>{stat.value}</span>
              <span style={{ fontSize: '12px', color: C.muted, marginTop: '2px' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* 4. ACHIEVEMENTS SECTION */}
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: 700 }}>Achievements</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}>
            {/* Earned Badges */}
            {earnedBadges.map(badge => (
              <div key={badge.id} style={{
                background: C.card,
                borderRadius: '20px',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid rgba(0, 102, 255, 0.4)',
                boxShadow: '0 0 20px rgba(0, 102, 255, 0.15)',
              }}>
                <img 
                  src={NFT_BADGE} 
                  alt={badge.title} 
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'contain',
                    filter: `drop-shadow(0 0 12px ${badge.shadow})`,
                    marginBottom: '16px',
                  }} 
                />
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: badge.color,
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}>
                  {badge.tier}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', lineHeight: 1.2 }}>{badge.title}</span>
                <span style={{ fontSize: '12px', color: C.muted }}>{badge.date}</span>
              </div>
            ))}
            
            {/* Locked Badges */}
            {lockedBadges.map(badge => (
              <div key={badge.id} style={{
                background: C.card,
                borderRadius: '20px',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}>
                <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '16px' }}>
                  <img 
                    src={NFT_BADGE} 
                    alt="Locked Badge" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      opacity: 0.2,
                    }} 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}>
                    <Lock size={28} color="rgba(255, 255, 255, 0.6)" />
                  </div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: C.muted }}>Locked</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM — ONE BUTTON FIXED */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(60px + env(safe-area-inset-bottom))',
        left: 0,
        right: 0,
        padding: '16px 24px',
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        zIndex: 100,
      }}>
        <button style={{
          width: '100%',
          height: '52px',
          background: C.accent,
          border: 'none',
          borderRadius: '100px',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: C.font,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
        }}>
          <Sparkles size={20} /> Collect NFT Badge
        </button>
      </div>
    </div>
  )
}
