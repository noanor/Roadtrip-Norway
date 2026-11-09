import { NavLink } from 'react-router-dom';
import { Icon, type IconName } from './Icon';

const ITEMS: { to: string; label: string; icon: IconName }[] = [
  { to: '/', label: 'Hjem', icon: 'home' },
  { to: '/rute', label: 'Ruter', icon: 'route' },
  { to: '/lagret', label: 'Lagret', icon: 'bookmark' },
  { to: '/profil', label: 'Profil', icon: 'user' },
];

export const NAV_PATHS = new Set(ITEMS.map((i) => i.to));

export function BottomNav() {
  return (
    <nav className="nav" aria-label="Hovedmeny">
      {ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} end className={({ isActive }) => (isActive ? 'on' : '')}>
          <Icon name={item.icon} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
