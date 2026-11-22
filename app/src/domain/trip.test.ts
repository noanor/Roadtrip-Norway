import { describe, expect, it } from 'vitest';
import { OSLO_BERGEN } from '../data/routes';
import {
  dayCount,
  dayRange,
  dayStops,
  daySuggestions,
  initialTripState,
  isOnRoute,
  MAX_DAYS,
  totalStops,
  tripDays,
  tripPoints,
  tripReducer,
  unmetInterests,
  type TripState,
} from './trip';

const route = OSLO_BERGEN;

describe('tripReducer', () => {
  it('swaps from and to', () => {
    const s = tripReducer(initialTripState, { type: 'swap' });
    expect([s.from, s.to]).toEqual(['Bergen', 'Oslo']);
  });

  it('clamps the number of days and the active day', () => {
    let s = tripReducer({ ...initialTripState, activeDay: 5 }, { type: 'changeDays', delta: -3 });
    expect(s.days).toBe(2);
    expect(s.activeDay).toBe(2);
    s = tripReducer(s, { type: 'changeDays', delta: 10 });
    expect(s.days).toBe(MAX_DAYS);
  });

  it('adds a stop once and moves to its day', () => {
    let s = tripReducer(initialTripState, { type: 'addStop', stopId: 'rauland', day: 2 });
    s = tripReducer(s, { type: 'addStop', stopId: 'rauland', day: 2 });
    expect(s.added).toEqual(['rauland']);
    expect(s.activeDay).toBe(2);
    expect(s.lastAdded).toBe('rauland');
  });

  it('toggles interests and saved stops', () => {
    let s = tripReducer(initialTripState, { type: 'toggleInterest', id: 'mat' });
    expect(s.interests).toContain('mat');
    expect(tripReducer(s, { type: 'toggleInterest', id: 'mat' }).interests).not.toContain('mat');
    s = tripReducer(s, { type: 'toggleSaved', stopId: 'late' });
    expect(s.saved).toContain('late');
  });
});

describe('selectors', () => {
  const withBakery = tripReducer(initialTripState, { type: 'addStop', stopId: 'mjosey', day: 1 });

  it('moves an added suggestion from suggestions to the day', () => {
    expect(daySuggestions(initialTripState, route, 1)).toEqual(['mjosey']);
    expect(daySuggestions(withBakery, route, 1)).toEqual([]);
    expect(dayStops(withBakery, route, 1)).toContain('mjosey');
    expect(isOnRoute(withBakery, route, 'mjosey')).toBe(true);
    expect(totalStops(withBakery, route)).toBe(totalStops(initialTripState, route) + 1);
  });

  it('builds waypoints from start, through every stop, to the end', () => {
    const points = tripPoints(initialTripState, route);
    expect(points[0].kind).toBe('start');
    expect(points[points.length - 1].kind).toBe('end');
    expect(points.filter((p) => p.kind === 'stop')).toHaveLength(totalStops(initialTripState, route));
  });

  it('gives each day the range from where the previous day ended to where it ends itself', () => {
    const points = tripPoints(initialTripState, route);
    const days = dayCount(initialTripState, route);
    // day 1: start (0) -> three stops -> night in Gvarv (4)
    expect(dayRange(points, 1, days)).toEqual([0, 4]);
    // day 2: Gvarv (4) -> two stops -> night in Rauland (7)
    expect(dayRange(points, 2, days)).toEqual([4, 7]);
    // last day ends at the end city
    expect(dayRange(points, days, days)[1]).toBe(points.length - 1);
    // the ranges cover the whole trip without gaps
    for (let d = 2; d <= days; d++) expect(dayRange(points, d, days)[0]).toBe(dayRange(points, d - 1, days)[1]);
  });
});

describe('a trip with fewer days than the planned route', () => {
  const three: TripState = { ...initialTripState, days: 3 };

  it('still reaches the destination and keeps every stop', () => {
    const plans = tripDays(three, route);
    expect(plans).toHaveLength(3);
    expect(plans[0].from).toBe('Oslo');
    expect(plans[2].to).toBe('Bergen');
    expect(totalStops(three, route)).toBe(totalStops(initialTripState, route));
    expect(plans.reduce((n, d) => n + d.km, 0)).toBe(route.days.reduce((n, d) => n + d.km, 0));
  });

  it('joins days so the longest one is as short as possible', () => {
    expect(tripDays(three, route).map((d) => `${d.from} → ${d.to}`)).toEqual(['Oslo → Gvarv', 'Gvarv → Odda', 'Odda → Bergen']);
  });
});

describe('stops on the route', () => {
  it('puts an added stop where it lies along the drive, not last', () => {
    // the bakery is in Kongsberg, before the stops at Notodden and Gvarv
    const s = tripReducer(initialTripState, { type: 'addStop', stopId: 'mjosey', day: 1 });
    expect(dayStops(s, route, 1)).toEqual(['mjosey', 'kongsberg', 'heddal', 'lindheim']);
  });

  it('removes a stop and offers it as a suggestion again', () => {
    let s = tripReducer(initialTripState, { type: 'removeStop', stopId: 'heddal' });
    expect(dayStops(s, route, 1)).toEqual(['kongsberg', 'lindheim']);
    expect(daySuggestions(s, route, 1)).toContain('heddal');
    s = tripReducer(s, { type: 'addStop', stopId: 'heddal', day: 1 });
    expect(dayStops(s, route, 1)).toEqual(['kongsberg', 'heddal', 'lindheim']);
    expect(s.removed).toEqual([]);
  });

  it('only puts stops that fit the chosen interests on the route', () => {
    const s: TripState = { ...initialTripState, interests: ['natur', 'bade'] };
    expect(dayStops(s, route, 1)).toEqual([]);
    expect(dayStops(s, route, 2)).toEqual(['gausta']);
    expect(dayStops(s, route, 4)).toContain('eidfjord');
    // the rest are still offered
    expect(daySuggestions(s, route, 1)).toEqual(expect.arrayContaining(['kongsberg', 'heddal', 'lindheim', 'mjosey']));
  });

  it('never puts a paid placement on the route by itself', () => {
    const s: TripState = { ...initialTripState, interests: ['mat'] };
    expect(dayStops(s, route, 1)).toEqual(['lindheim']);
    // it is suggested first, because it fits the interest
    expect(daySuggestions(s, route, 1)[0]).toBe('mjosey');
  });

  it('lists chosen interests that no stop on the route covers', () => {
    const s: TripState = { ...initialTripState, interests: ['mat', 'familie'] };
    expect(unmetInterests(s, route)).toEqual(['familie']);
  });
});
