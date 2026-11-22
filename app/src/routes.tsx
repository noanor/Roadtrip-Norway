import type { RouteObject } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { BusinessPage } from './pages/BusinessPage';
import { FullMapPage } from './pages/FullMapPage';
import { HomePage } from './pages/HomePage';
import { InterestsPage } from './pages/InterestsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { PricingPage } from './pages/PricingPage';
import { ProfilePage } from './pages/ProfilePage';
import { RoutePage } from './pages/RoutePage';
import { SavedPage } from './pages/SavedPage';
import { SettingsPage } from './pages/SettingsPage';
import { TripsPage } from './pages/TripsPage';
import { StopDetailPage } from './pages/StopDetailPage';

// Shared by the browser router (App.tsx) and the memory router in tests.
export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/interesser', element: <InterestsPage /> },
      { path: '/rute', element: <RoutePage /> },
      { path: '/rute/kart', element: <FullMapPage /> },
      { path: '/stopp/:stopId', element: <StopDetailPage /> },
      { path: '/ruter', element: <TripsPage /> },
      { path: '/lagret', element: <SavedPage /> },
      { path: '/profil', element: <ProfilePage /> },
      { path: '/pris', element: <PricingPage /> },
      { path: '/innstillinger', element: <SettingsPage /> },
      { path: '/for-aktorer', element: <BusinessPage /> },
      { path: '/varsler', element: <NotificationsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
