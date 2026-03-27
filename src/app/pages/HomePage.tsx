import { TopHeader } from '../components/TopHeader';
import { BottomNav } from '../components/BottomNav';
import { Shield, CheckCircle2 } from 'lucide-react';

const heroImage = 'https://images.unsplash.com/photo-1760315972424-1637530daead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdGhsZXRlcyUyMHJ1bm5pbmclMjBjaXR5fGVufDF8fHx8MTc3NDU3NjA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-16">
      <TopHeader />

      <div className="max-w-md mx-auto">
        {/* Suggested Goal Section */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="text-white font-semibold">Suggested Goal</span>
            </div>
            <button className="text-blue-500 text-sm hover:text-blue-400">
              Customize
            </button>
          </div>

          {/* Goal Card */}
          <div className="bg-zinc-900 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-zinc-800 rounded-full p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">2 per week</h3>
                <p className="text-gray-400 text-sm">0 / 2 runs completed</p>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold">
              Set Goal
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>
        </div>

        {/* Onboarding Section */}
        <div className="p-4">
          {/* Orange accent bar */}
          <div className="w-24 h-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-4"></div>

          <h2 className="text-white text-2xl font-bold mb-2">
            You've joined the world's largest team!
          </h2>
          <p className="text-gray-400 mb-4">
            Here's how to get started using ASCEND:
          </p>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-1 bg-zinc-800 rounded-full">
              <div className="h-full w-0 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm">0/4</span>
          </div>

          {/* Checklist items */}
          <div className="space-y-3">
            <ChecklistItem
              icon="📱"
              title="Upload your first activity"
              description="You can record it right in the app."
            />
            <ChecklistItem
              icon="👥"
              title="Follow three people (0/3)"
              description="Find friends and fan favorites to follow."
            />
            <ChecklistItem
              icon="👤"
              title="Add a profile picture"
              description="This helps people know who you are."
            />
            <ChecklistItem
              icon="⌚"
              title="Connect a device"
              description="Sync a watch or fitness tracker to seamlessly upload to ASCEND."
              showButtons
            />
          </div>
        </div>

        {/* Start Your Streak Section */}
        <div className="mt-6">
          <div className="relative h-48 overflow-hidden">
            <img
              src={heroImage}
              alt="Athletes running"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-4">
              <div className="bg-zinc-900 rounded-full p-3">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-blue-500"
                >
                  <path
                    d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={1}
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">
                  Start your Streak
                </h3>
                <p className="text-gray-300 text-sm">
                  There's nothing like the satisfaction of an epic Streak – it
                  takes one activity a week.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who to Follow Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-xl">Who to Follow</h3>
            <button className="text-blue-500 text-sm hover:text-blue-400">
              See All
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            <UserCard
              name="Joseph Tinsley"
              subtitle="Fan favorite on ASCEND"
              imageUrl="https://images.unsplash.com/photo-1530279281203-4c60af01ee58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcG9ydHJhaXQlMjBtYWxlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NDU3NjY1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
            <UserCard
              name="Sarah Mitchell"
              subtitle="Fan favorite on ASCEND"
              imageUrl="https://images.unsplash.com/photo-1554454019-8a165b8a3bd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBydW5uZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzQ1NzY2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
            <UserCard
              name="Marcus Chen"
              subtitle="Fan favorite on ASCEND"
              imageUrl="https://images.unsplash.com/photo-1600492110240-63958f19b8b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaXN0JTIwcG9ydHJhaXQlMjBtYWxlfGVufDF8fHx8MTc3NDU3NjY1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
          </div>
        </div>

        {/* Suggested Challenges Section */}
        <div className="p-4 mt-4">
          <h3 className="text-white font-bold text-xl mb-2">
            Suggested Challenges
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Make accountability a little easier, more fun and earn rewards!
          </p>

          <div className="bg-zinc-900 rounded-xl p-5">
            <p className="text-gray-400 text-sm mb-4">
              More than 1,225,000 athletes have already joined
            </p>

            <div className="flex items-start gap-4 mb-4">
              <div className="bg-blue-500/10 border-2 border-blue-500 rounded-2xl p-4 flex-shrink-0">
                <div className="text-center">
                  <div className="text-blue-400 font-bold text-3xl">400</div>
                  <div className="text-blue-400 text-xs">MINS</div>
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-white font-bold text-lg mb-1">
                  March 400-minute x Runna Challenge
                </h4>
                <p className="text-gray-400 text-sm mb-2">
                  Log 400 mins of movement. Unlock 2 weeks free + win a Hawaii
                  race trip!
                </p>
                <div className="inline-block bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                  Reward
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold">
              Join Challenge
            </button>
          </div>

          <button className="w-full text-blue-500 hover:text-blue-400 font-semibold mt-4">
            Explore All Challenges
          </button>
        </div>

        {/* Recommended Members */}
        <div className="p-4 mt-4">
          <h3 className="text-white font-bold text-xl mb-4">
            Recommended for you - check out these popular ASCEND members to stay
            motivated:
          </h3>

          <div className="bg-zinc-900 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="William Goodge"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold">William Goodge</h4>
                <p className="text-gray-400 text-sm">Today · Minato, Japan</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <circle cx="10" cy="4" r="1.5" />
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="10" cy="16" r="1.5" />
              </svg>
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800">
            <h4 className="text-white font-bold text-lg mb-2">Evening Run</h4>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function ChecklistItem({
  icon,
  title,
  description,
  showButtons = false,
}: {
  icon: string;
  title: string;
  description: string;
  showButtons?: boolean;
}) {
  return (
    <div className="bg-zinc-900 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">{icon}</span>
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-1">{title}</h4>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          className="text-gray-500 flex-shrink-0 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 10l3 3 3-3"
            transform="rotate(-90 10 10)"
          />
        </svg>
      </div>

      {showButtons && (
        <div className="flex gap-3 mt-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm font-semibold">
            Connect
          </button>
          <button className="flex-1 border border-blue-600 text-blue-500 hover:bg-blue-600/10 py-2 rounded-full text-sm font-semibold">
            I don't have one
          </button>
        </div>
      )}
    </div>
  );
}

function UserCard({
  name,
  subtitle,
  imageUrl,
}: {
  name: string;
  subtitle: string;
  imageUrl: string;
}) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 flex flex-col items-center min-w-[260px]">
      <div className="relative mb-3">
        <div className="w-24 h-24 rounded-lg overflow-hidden border-4 border-blue-500">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
      </div>

      <h4 className="text-white font-bold text-center mb-1">{name}</h4>
      <p className="text-gray-400 text-sm text-center mb-4">{subtitle}</p>

      <div className="flex gap-2 w-full">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm font-semibold">
          Follow
        </button>
        <button className="flex-1 border border-zinc-700 text-gray-300 hover:bg-zinc-800 py-2 rounded-full text-sm font-semibold">
          Remove
        </button>
      </div>
    </div>
  );
}