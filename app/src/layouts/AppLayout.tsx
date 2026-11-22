import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav, showsNav } from '../components/BottomNav';
import { ToastProvider } from '../context/ToastContext';
import { useDragScroll } from '../hooks/useDragScroll';

/** How long the scroll indicator stays after scrolling stops, as on iOS. */
const INDICATOR_MS = 900;
const INDICATOR_MIN_PX = 36;
/** Space between the indicator and the top and bottom of the screen. */
const INDICATOR_INSET_PX = 3;

/** Phone-sized shell: scrollable screen, bottom navigation on top-level pages, and the toast. */
export function AppLayout() {
  const { pathname } = useLocation();
  const screen = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  useDragScroll();

  useEffect(() => {
    if (screen.current) screen.current.scrollTop = 0;
  }, [pathname]);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  // A thin bar over the content, like the iOS scroll indicator: sized and moved by hand on each scroll,
  // without re-rendering the page, and only shown while scrolling.
  const showIndicator = () => {
    const el = screen.current;
    const bar = indicator.current;
    if (!el || !bar) return;
    const { scrollTop, scrollHeight, clientHeight, offsetTop } = el;
    if (scrollHeight <= clientHeight) return;
    const track = clientHeight - INDICATOR_INSET_PX * 2;
    const height = Math.max(INDICATOR_MIN_PX, (track * clientHeight) / scrollHeight);
    const top = offsetTop + INDICATOR_INSET_PX + (scrollTop / (scrollHeight - clientHeight)) * (track - height);
    bar.style.height = `${height}px`;
    bar.style.transform = `translateY(${top}px)`;
    bar.classList.add('on');
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => bar.classList.remove('on'), INDICATOR_MS);
  };

  return (
    <div className="app-shell">
      <ToastProvider>
        <main className="screen enter" key={pathname} ref={screen} onScroll={showIndicator}>
          <Outlet />
        </main>
        <div className="scroll-indicator" ref={indicator} aria-hidden="true" />
        {showsNav(pathname) && <BottomNav />}
      </ToastProvider>
    </div>
  );
}
