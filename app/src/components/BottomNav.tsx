import { NavLink, useLocation } from 'react-router-dom';
import { Icon, type IconName } from './Icon';

const ITEMS: { to: string; label: string; icon: IconName; /** Other pages that belong under this tab. */ also?: string[] }[] = [
  { to: '/', label: 'Hjem', icon: 'home' },
  { to: '/ruter', label: 'Ruter', icon: 'route', also: ['/rute'] },
  { to: '/lagret', label: 'Lagret', icon: 'bookmark' },
  { to: '/profil', label: 'Profil', icon: 'user' },
];

export const NAV_PATHS = new Set(ITEMS.flatMap((i) => [i.to, ...(i.also ?? [])]));

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav" aria-label="Hovedmeny">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) => (isActive || item.also?.includes(pathname) ? 'on' : '')}
        >
          <Icon name={item.icon} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
