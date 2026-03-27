import { Outlet } from "react-router";
import { useState } from "react";
import { SplashScreen } from "./SplashScreen";

export function Root() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen w-full bg-zinc-950">
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : null}
      <div style={{ opacity: showSplash ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
        <Outlet />
      </div>
    </div>
  );
}
