import { describe, expect, it } from 'vitest';
import { initialTripState, tripDays, tripPoints, type TripState } from '../domain/trip';
import { CITIES, EXPLORE_ROUTES } from './catalog';
import { findRoute, OSLO_BERGEN, reverseRoute, ROUTES, routeWithStop } from './routes';
import { DAY_TRIP_IDS, STOPS } from './stops';

describe('findRoute', () => {
  it('finds a trip regardless of case and spaces', () => {
    expect(findRoute(' oslo', 'BERGEN ')).toBe(OSLO_BERGEN);
  });

  it('finds the trip the other way round', () => {
    const back = findRoute('Bergen', 'Oslo')!;
    expect(back.from).toBe('Bergen');
    expect(back.to).toBe('Oslo');
    expect(back.days[0]).toMatchObject({ day: 1, from: 'Bergen', to: 'Eidfjord' });
    expect(back.days[4]).toMatchObject({ day: 5, from: 'Gvarv', to: 'Oslo', toLocation: OSLO_BERGEN.fromLocation });
    expect(back.days[0].stops).toEqual(['bryggen', 'voss']);
  });

  it('returns null when no trip is planned between the places', () => {
    expect(findRoute('Oslo', 'Tromsø')).toBeNull();
    expect(findRoute('', 'Bergen')).toBeNull();
  });

  it('reversing twice gives the same days', () => {
    expect(reverseRoute(reverseRoute(OSLO_BERGEN)).days).toEqual(OSLO_BERGEN.days);
  });
});

describe('every trip on offer can be planned', () => {
  it.each(EXPLORE_ROUTES.map((r) => [r.title, r] as const))('%s', (_, r) => {
    const route = findRoute(r.from, r.to);
    expect(route).not.toBeNull();
    expect(route!.days).toHaveLength(r.days);
  });

  it.each(DAY_TRIP_IDS)('day trip to %s', (id) => {
    const route = findRoute('Oslo', STOPS[id].place)!;
    expect(route.days).toHaveLength(1);
    expect(route.days[0].stops.includes(id) || route.days[0].suggestions.includes(id)).toBe(true);
  });
});

describe('route data', () => {
  it.each(ROUTES.map((r) => [r.id, r] as const))('%s uses known stops and places and ends where it says', (_, r) => {
    for (const d of r.days) for (const id of [...d.stops, ...d.suggestions]) expect(STOPS[id], id).toBeDefined();
    expect(CITIES[r.from]).toEqual(r.fromLocation);
    expect(CITIES[r.to]).toEqual(r.toLocation);
    expect(r.days[r.days.length - 1].toLocation).toEqual(r.toLocation);
    r.days.forEach((d, i) => expect(d.day).toBe(i + 1));
  });

  it('a trip with fewer days than planned still reaches the end', () => {
    const route = findRoute('Skien', 'Dalen')!;
    const s: TripState = { ...initialTripState, from: 'Skien', to: 'Dalen', days: 1 };
    expect(tripDays(s, route)).toHaveLength(1);
    expect(tripPoints(s, route).at(-1)!.location).toEqual(route.toLocation);
  });

  it('finds the trip that passes a stop', () => {
    expect(routeWithStop('ulefoss')?.id).toBe('skien-dalen');
    expect(routeWithStop('ghost')).toBeUndefined();
  });
});
