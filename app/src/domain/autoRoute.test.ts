import { describe, expect, it } from 'vitest';
import { CITIES } from '../data/catalog';
import { OSLO_BERGEN } from '../data/routes';
import { STOPS } from '../data/stops';
import { autoRoute, NEAR_KM, straightLine } from './autoRoute';
import { dayStops, daySuggestions, initialTripState, tripDays, type TripState } from './trip';

const plan = (from: string, to: string, days = 5) => autoRoute(from, to, CITIES[from], CITIES[to], straightLine([CITIES[from], CITIES[to]]), days);

describe('autoRoute', () => {
  it('finds catalogue stops near the road, in driving order', () => {
    const route = plan('Oslo', 'Kongsberg');
    const ids = route.days.flatMap((d) => [...d.stops, ...d.suggestions]);
    expect(ids).toContain('kongsberg');
    expect(ids).toContain('mjosey');
    expect(ids).not.toContain('bryggen');
  });

  it('cuts a long drive into days of about the same length, ending at the destination', () => {
    const route = plan('Oslo', 'Stavanger');
    expect(route.days.length).toBeGreaterThan(1);
    expect(route.days.length).toBeLessThanOrEqual(5);
    expect(route.days[0].from).toBe('Oslo');
    expect(route.days.at(-1)!.to).toBe('Stavanger');
    expect(route.days.at(-1)!.toLocation).toEqual(CITIES.Stavanger);
    const kms = route.days.map((d) => d.km);
    expect(Math.max(...kms) - Math.min(...kms)).toBeLessThan(80);
    route.days.forEach((d, i) => expect(d.day).toBe(i + 1));
  });

  it('a short drive is one day, however many days were asked for', () => {
    expect(plan('Oslo', 'Jevnaker', 5).days).toHaveLength(1);
  });

  it('cuts the drive into the number of days the traveller chose', () => {
    expect(plan('Oslo', 'Stavanger', 2).days).toHaveLength(2);
    expect(plan('Oslo', 'Stavanger', 3).days).toHaveLength(3);
  });

  it('sleeps at a place to stay when one lies where a day ends', () => {
    // along the Oslo–Bergen road the catalogue has Haukeliseter fjellstue
    const line = { points: OSLO_BERGEN.days.reduce<[number, number][]>((pts, d) => [...pts, ...d.stops.map((id) => STOPS[id].location), d.toLocation], [CITIES.Oslo]), km: 718, minutes: 765 };
    const route = autoRoute('Oslo', 'Bergen', CITIES.Oslo, CITIES.Bergen, line, 5);
    const nights = route.days.slice(0, -1).map((d) => d.to);
    expect(nights.every((n) => n.length > 0)).toBe(true);
    expect(route.days.flatMap((d) => [...d.stops, ...d.suggestions])).toContain('haukeli');
  });

  it('names a night after the nearest known place, or the distance when there is none', () => {
    const route = plan('Tromsø', 'Bodø');
    expect(route.days.length).toBeGreaterThan(1);
    for (const d of route.days.slice(0, -1)) expect(d.to).toMatch(/\w/);
  });

  it('never suggests stops further from the road than the limit', () => {
    const route = plan('Oslo', 'Kongsberg');
    const ids = route.days.flatMap((d) => [...d.stops, ...d.suggestions]);
    expect(ids).not.toContain('drobak'); // Drøbak lies far south of the Oslo–Kongsberg road
    expect(NEAR_KM).toBeGreaterThan(0);
  });

  it('works with the trip selectors like a hand-picked trip', () => {
    const route = plan('Oslo', 'Kongsberg');
    const s: TripState = { ...initialTripState, from: 'Oslo', to: 'Kongsberg', days: 1 };
    expect(tripDays(s, route)).toHaveLength(1);
    expect(dayStops(s, route, 1).length + daySuggestions(s, route, 1).length).toBeGreaterThan(0);
  });

  it('«Ferdig dagsplan» off puts nothing on the route until the traveller picks it', () => {
    const route = plan('Oslo', 'Kongsberg');
    const s: TripState = { ...initialTripState, from: 'Oslo', to: 'Kongsberg', days: 1, flexible: false };
    expect(dayStops(s, route, 1)).toEqual([]);
    expect(daySuggestions(s, route, 1)).toContain('kongsberg');
    expect(dayStops({ ...s, added: ['kongsberg'] }, route, 1)).toEqual(['kongsberg']);
  });
});
