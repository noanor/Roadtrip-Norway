import { createHashRouter, RouterProvider } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { routes } from './routes';

// Hash URLs (/#/rute) so a reload or a shared link works on static hosting such as
// GitHub Pages, which has no fallback to index.html for unknown paths.
const router = createHashRouter(routes);

export function App() {
  return (
    <TripProvider>
      <RouterProvider router={router} />
    </TripProvider>
  );
}
