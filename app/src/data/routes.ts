import type { DayPlan, LatLng, RouteTemplate } from '../types';

// Planned trips. Each day ends where the night is spent; `stops` are on the route from the start,
// `suggestions` are offered along the way. Replace with routes from the backend once it exists.
// Times and distances are rough driving numbers, used until the routing service has answered.

export const OSLO_BERGEN: RouteTemplate = {
  id: 'oslo-bergen',
  from: 'Oslo',
  to: 'Bergen',
  fromLocation: [59.913, 10.752],
  toLocation: [60.392, 5.324],
  days: [
    { day: 1, from: 'Oslo', to: 'Gvarv', toLocation: [59.388, 9.177], km: 178, minutes: 185, stops: ['kongsberg', 'heddal', 'lindheim'], suggestions: ['mjosey'] },
    { day: 2, from: 'Gvarv', to: 'Rauland', toLocation: [59.7, 8.04], km: 154, minutes: 170, stops: ['vemork', 'gausta'], suggestions: ['rauland'] },
    { day: 3, from: 'Rauland', to: 'Odda', toLocation: [60.069, 6.546], km: 162, minutes: 165, stops: ['haukeli', 'late'], suggestions: ['roldal'] },
    { day: 4, from: 'Odda', to: 'Eidfjord', toLocation: [60.467, 7.072], km: 74, minutes: 85, stops: ['sider', 'voring'], suggestions: ['eidfjord'] },
    { day: 5, from: 'Eidfjord', to: 'Bergen', toLocation: [60.392, 5.324], km: 150, minutes: 160, stops: ['voss', 'bryggen'], suggestions: ['floyen'] },
  ],
};

const HARDANGER: RouteTemplate = {
  id: 'bergen-odda',
  from: 'Bergen',
  to: 'Odda',
  fromLocation: [60.392, 5.324],
  toLocation: [60.069, 6.546],
  days: [
    { day: 1, from: 'Bergen', to: 'Norheimsund', toLocation: [60.371, 6.146], km: 75, minutes: 80, stops: ['steinsdal'], suggestions: ['fartoyvern'] },
    { day: 2, from: 'Norheimsund', to: 'Lofthus', toLocation: [60.326, 6.664], km: 95, minutes: 110, stops: ['folkemuseum', 'sider'], suggestions: ['husedalen'] },
    { day: 3, from: 'Lofthus', to: 'Odda', toLocation: [60.069, 6.546], km: 40, minutes: 45, stops: ['vasskraft'], suggestions: ['late'] },
  ],
};

const TELEMARKSKANALEN: RouteTemplate = {
  id: 'skien-dalen',
  from: 'Skien',
  to: 'Dalen',
  fromLocation: [59.209, 9.609],
  toLocation: [59.445, 8.004],
  days: [
    { day: 1, from: 'Skien', to: 'Lunde', toLocation: [59.296, 9.098], km: 70, minutes: 75, stops: ['ibsen', 'ulefoss'], suggestions: ['vrangfoss'] },
    { day: 2, from: 'Lunde', to: 'Dalen', toLocation: [59.445, 8.004], km: 85, minutes: 95, stops: ['eidsborg', 'dalenhotel'], suggestions: ['kviteseid'] },
  ],
};

const ATLANTERHAVSVEIEN: RouteTemplate = {
  id: 'molde-kristiansund',
  from: 'Molde',
  to: 'Kristiansund',
  fromLocation: [62.737, 7.16],
  toLocation: [63.11, 7.728],
  days: [
    { day: 1, from: 'Molde', to: 'Kristiansund', toLocation: [63.11, 7.728], km: 75, minutes: 85, stops: ['varden', 'atlanterhavsveien'], suggestions: ['bud', 'kvernes'] },
  ],
};

const STRYNEFJELLET: RouteTemplate = {
  id: 'lom-stryn',
  from: 'Lom',
  to: 'Stryn',
  fromLocation: [61.838, 8.567],
  toLocation: [61.904, 6.716],
  days: [
    { day: 1, from: 'Lom', to: 'Grotli', toLocation: [61.993, 7.678], km: 70, minutes: 70, stops: ['lomkyrkje', 'fjellmuseum'], suggestions: ['grotli'] },
    { day: 2, from: 'Grotli', to: 'Stryn', toLocation: [61.904, 6.716], km: 60, minutes: 95, stops: ['videseter'], suggestions: ['tystig'] },
  ],
};

const OSLO_JEVNAKER: RouteTemplate = {
  id: 'oslo-jevnaker',
  from: 'Oslo',
  to: 'Jevnaker',
  fromLocation: [59.913, 10.752],
  toLocation: [60.24, 10.38],
  days: [{ day: 1, from: 'Oslo', to: 'Jevnaker', toLocation: [60.24, 10.38], km: 70, minutes: 75, stops: ['hadeland'], suggestions: ['kistefos'] }],
};

const OSLO_FROGN: RouteTemplate = {
  id: 'oslo-frogn',
  from: 'Oslo',
  to: 'Frogn',
  fromLocation: [59.913, 10.752],
  toLocation: [59.66, 10.63],
  days: [{ day: 1, from: 'Oslo', to: 'Frogn', toLocation: [59.66, 10.63], km: 38, minutes: 40, stops: ['drobak'], suggestions: ['oscarsborg'] }],
};

export const ROUTES: RouteTemplate[] = [OSLO_BERGEN, HARDANGER, TELEMARKSKANALEN, ATLANTERHAVSVEIEN, STRYNEFJELLET, OSLO_JEVNAKER, OSLO_FROGN];

const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

/** The same trip driven the other way: days, stops and nights in reverse order. */
export function reverseRoute(route: RouteTemplate): RouteTemplate {
  // where each original day starts: the trip's start, then every night
  const starts: { name: string; location: LatLng }[] = [
    { name: route.from, location: route.fromLocation },
    ...route.days.slice(0, -1).map((d) => ({ name: d.to, location: d.toLocation })),
  ];
  const days: DayPlan[] = route.days
    .map((d, i) => ({
      ...d,
      from: d.to,
      to: starts[i].name,
      toLocation: starts[i].location,
      stops: [...d.stops].reverse(),
      suggestions: [...d.suggestions].reverse(),
    }))
    .reverse()
    .map((d, i) => ({ ...d, day: i + 1 }));
  return { id: `${route.id}-retur`, from: route.to, to: route.from, fromLocation: route.toLocation, toLocation: route.fromLocation, days };
}

const reversed = new Map(ROUTES.map((r) => [r.id, reverseRoute(r)]));

/** The planned trip between two places, in either direction, or null when there is none yet. */
export function findRoute(from: string, to: string): RouteTemplate | null {
  for (const r of ROUTES) {
    if (same(r.from, from) && same(r.to, to)) return r;
    if (same(r.to, from) && same(r.from, to)) return reversed.get(r.id)!;
  }
  return null;
}

/** The first planned trip that passes the stop, to offer it from the stop's page. */
export function routeWithStop(stopId: string): RouteTemplate | undefined {
  return ROUTES.find((r) => r.days.some((d) => d.stops.includes(stopId) || d.suggestions.includes(stopId)));
}
