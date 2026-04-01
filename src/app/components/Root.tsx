import { Outlet, useLocation } from "react-router";
import BottomTabBar from "./BottomTabBar";

export function Root() {
  const location = useLocation();

  // Hide tab bar on splash screen only (currently no splash, but ready if added)
  const hiddenPaths = ['/splash'];
  const showTabBar = !hiddenPaths.includes(location.pathname);

  return (
    <div className="min-h-screen w-full bg-zinc-950">
      <Outlet />
      {showTabBar && <BottomTabBar />}
    </div>
  );
}
