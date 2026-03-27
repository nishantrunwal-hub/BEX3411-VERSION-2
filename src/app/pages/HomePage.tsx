import { Search, Filter, Compass, Settings2 } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '../components/ui/drawer';
import { useState } from 'react';

const mapPlaceholder = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjB0b3Bwb2dyYXBoaWN8ZW58MHx8fHwxNzc0NTc4MDEw&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

export default function HomePage() {
  const [snap, setSnap] = useState<number | string | null>(0.3);

  return (
    <div className="relative min-h-screen bg-zinc-950 w-full overflow-hidden">
      {/* Full-screen Map Background */}
      <img
        src={mapPlaceholder}
        alt="Map background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-zinc-950/20 pointer-events-none"></div>

      {/* Top Search & Filters */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 safe-top mt-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-zinc-900/90 backdrop-blur-md rounded-full px-4 py-3 flex items-center gap-2 border border-zinc-800">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search trails, cities, parks..."
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-500"
            />
          </div>
          <button className="bg-zinc-900/90 backdrop-blur-md p-3 rounded-full border border-zinc-800 flex items-center justify-center">
            <Settings2 className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <FilterPill label="Running" active />
          <FilterPill label="Hiking" />
          <FilterPill label="Cycling" />
          <FilterPill label="Wheelchair friendly" />
          <FilterPill label="Dog friendly" />
        </div>
      </div>

      {/* Bottom Sheet Drawer */}
      <Drawer
        open={true}
        snapPoints={[0.15, 0.5, 0.9]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        modal={false}
        dismissible={false}
      >
        <DrawerContent className="bg-zinc-900 border-t border-zinc-800 h-full max-h-[90vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-white">Discover nearby</DrawerTitle>
            <DrawerDescription className="text-gray-400">
              Popular trails around your location
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto space-y-4 pb-32 no-scrollbar">
            <TrailCard
              title="Griffith Observatory Trail"
              info="Running • 4.2 mi • Moderate"
              rating="4.8"
              image="https://images.unsplash.com/photo-1544085311-12501a35dc6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlmZml0aCUyMG9ic2VydmF0b3J5JTIwaGlrZXxlbnwwfHx8fDE3NzQ1NzgwMTA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
            <TrailCard
              title="Runyon Canyon Loop"
              info="Hiking • 2.7 mi • Hard"
              rating="4.6"
              image="https://images.unsplash.com/photo-1517457788880-0d3f237f374c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhydW55b24lMjBjYW55b258ZW58MHx8fHwxNzc0NTc4MDEw&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
            <TrailCard
              title="Santa Monica Beach Path"
              info="Cycling • 8.5 mi • Easy"
              rating="4.9"
              image="https://images.unsplash.com/photo-1559863897-400dcd2071aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50YSUyMG1vbmljYSUyMGJlYWNofGVufDB8fHx8MTc3NDU3ODAxMA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
          </div>
        </DrawerContent>
      </Drawer>

      <BottomNav />
    </div>
  );
}

function FilterPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-zinc-900/90 text-gray-300 border border-zinc-800'
      }`}
    >
      {label}
    </button>
  );
}

function TrailCard({
  title,
  info,
  rating,
  image,
}: {
  title: string;
  info: string;
  rating: string;
  image: string;
}) {
  return (
    <div className="flex gap-3 bg-zinc-950 p-3 rounded-2xl border border-zinc-900">
      <img
        src={image}
        alt={title}
        className="w-24 h-24 rounded-xl object-cover"
      />
      <div className="flex-1 flex flex-col justify-center">
        <h4 className="text-white font-bold leading-tight mb-1">{title}</h4>
        <p className="text-gray-400 text-sm mb-2">{info}</p>
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-white text-sm font-semibold">{rating}</span>
        </div>
      </div>
    </div>
  );
}