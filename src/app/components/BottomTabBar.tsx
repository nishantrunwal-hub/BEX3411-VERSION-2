import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Map, Radio, Users, BarChart2 } from 'lucide-react'

const tabs = [
  { id: 'home',   label: 'Home',   icon: Home,      path: '/home'   },
  { id: 'maps',   label: 'Maps',   icon: Map,       path: '/maps'   },
  { id: 'record', label: 'Record', icon: Radio,     path: '/record' },
  { id: 'groups', label: 'Groups', icon: Users,     path: '/groups' },
  { id: 'you',    label: 'You',    icon: BarChart2,  path: '/profile'},
]

export default function BottomTabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const activeTab = () => {
    switch (location.pathname) {
      case '/home':        return 'home'
      case '/maps':        return 'maps'
      case '/groups':      return 'groups'
      case '/activities':  return 'maps' // from user
      case '/community':   return 'groups' // from user
      case '/record':      return 'record'
      case '/profile':     return 'you'
      default:             return 'home'
    }
  }

  const active = activeTab()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(10,10,10,0.97)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        display: 'flex',
        alignItems: 'center',
        height: 'calc(60px + env(safe-area-inset-bottom))',
      }}
    >
      {tabs.map(tab => {
        const isActive  = active === tab.id
        const isRecord  = tab.id === 'record'
        const Icon      = tab.icon

        return (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.path) navigate(tab.path)
            }}
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
              outline: 'none',
            }}
          >
            {isRecord ? (
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#0066FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(0,102,255,0.4)',
                  marginTop: '-8px',
                }}
              >
                <Icon size={20} color="#ffffff" />
              </div>
            ) : (
              <>
                <Icon
                  size={22}
                  color={isActive ? '#0066FF' : '#444444'}
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#0066FF' : '#444444',
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
