import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BottomTabBar from './components/BottomTabBar';
import HomePage from './pages/HomePage';
import MapsPage from './pages/MapsPage';
import GroupsPage from './pages/GroupsPage';
import RecordPage from './pages/RecordPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const location = useLocation();

  // Optionally hide on splash routes later
  const hiddenPaths = ['/splash'];
  const showTabBar = !hiddenPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/"            element={<Navigate to="/home" replace />} />
        <Route path="/home"        element={<HomePage />} />
        <Route path="/maps"        element={<MapsPage />} />
        <Route path="/groups"      element={<GroupsPage />} />
        <Route path="/record"      element={<RecordPage />} />
        <Route path="/profile"     element={<ProfilePage />} />
        <Route path="*"            element={<Navigate to="/home" replace />} />
      </Routes>

      {showTabBar && <BottomTabBar />}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
