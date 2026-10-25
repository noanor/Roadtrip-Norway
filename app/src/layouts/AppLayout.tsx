import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav, NAV_PATHS } from '../components/BottomNav';
import { ToastProvider } from '../context/ToastContext';

/** Phone-sized shell: scrollable screen, bottom navigation on top-level pages, and the toast. */
export function AppLayout() {
  const { pathname } = useLocation();
  const screen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (screen.current) screen.current.scrollTop = 0;
  }, [pathname]);

  return (
    <div className="app-shell">
      <ToastProvider>
        <main className="screen enter" key={pathname} ref={screen}>
          <Outlet />
        </main>
        {NAV_PATHS.has(pathname) && <BottomNav />}
      </ToastProvider>
    </div>
  );
}
