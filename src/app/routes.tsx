import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import HomePage from './pages/HomePage';
import MapsPage from './pages/MapsPage';
import RecordPage from './pages/RecordPage';
import GroupsPage from './pages/GroupsPage';
import ProfilePage from './pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'maps', Component: MapsPage },
      { path: 'record', Component: RecordPage },
      { path: 'groups', Component: GroupsPage },
      { path: 'profile', Component: ProfilePage },
    ],
  },
]);
