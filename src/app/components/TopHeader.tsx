import { Search, MessageSquare, Bell, UserCircle } from 'lucide-react';

export function TopHeader() {
  return (
    <header className="sticky top-0 bg-zinc-950 border-b border-zinc-800 z-10">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white">
            <UserCircle className="w-7 h-7" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Search className="w-6 h-6" />
          </button>
        </div>

        {/* Center */}
        <h1 className="text-white font-semibold text-lg">Home</h1>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white">
            <MessageSquare className="w-6 h-6" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>

    </header>
  );
}
