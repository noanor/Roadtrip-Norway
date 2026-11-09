import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { routes } from './routes';

const router = createBrowserRouter(routes);

export function App() {
  return (
    <TripProvider>
      <RouterProvider router={router} />
    </TripProvider>
  );
}
