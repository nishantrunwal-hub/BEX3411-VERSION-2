import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Map, Radio, Users, BarChart2 } from 'lucide-react'

const C = {
  bg:      '#0a0a0a',
  accent:  '#0066FF',
  border:  'rgba(255,255,255,0.08)',
  dim:     '#444444',
  font:    'Inter, sans-serif',
}

const tabs = [
  { id: 'home',   label: 'Home',   icon: Home,     path: '/'        },
  { id: 'maps',   label: 'Maps',   icon: Map,      path: '/maps'    },
  { id: 'record', label: 'Record', icon: Radio,    path: '/record'  },
  { id: 'groups', label: 'Groups', icon: Users,    path: '/groups'  },
  { id: 'you',    label: 'You',    icon: BarChart2, path: '/profile'},
]

export default function BottomTabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  // Determine active tab from current path
  const getActiveTab = () => {
    const path = location.pathname
    if (path === '/maps')    return 'maps'
    if (path === '/groups')  return 'groups'
    if (path === '/')        return 'home'
    if (path === '/record')  return 'record'
    if (path === '/profile') return 'you'
    return 'home'
  }

  const activeTab = getActiveTab()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,              // always on top of everything
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
        const isActive = activeTab === tab.id
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
                  boxShadow: '0 0 20px rgba(0,102,255,0.4)',
                  marginTop: '-8px',
                }}
              >
                <tab.icon size={20} color="#ffffff" />
              </div>
            ) : (
              <>
                <tab.icon
                  size={22}
                  color={isActive ? C.accent : C.dim}
                />
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
  )
}
