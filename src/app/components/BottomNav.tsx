import { Home, Map, Circle, Users, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Map, label: 'Maps', path: '/maps' },
    { icon: Circle, label: 'Record', path: '/record' },
    { icon: Users, label: 'Groups', path: '/groups' },
    { icon: User, label: 'You', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center justify-center flex-1 h-full"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                }`}
                fill={isActive && label === 'Record' ? 'currentColor' : 'none'}
              />
              <span
                className={`text-xs mt-1 ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
