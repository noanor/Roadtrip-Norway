import { describe, expect, it } from 'vitest';
import { OSLO_BERGEN } from '../data/catalog';
import {
  dayCount,
  dayRange,
  dayStops,
  daySuggestions,
  initialTripState,
  isOnRoute,
  MAX_DAYS,
  totalStops,
  tripPoints,
  tripReducer,
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
    expect(s.added[2]).toEqual(['rauland']);
    expect(s.activeDay).toBe(2);
    expect(s.lastAdded).toBe('rauland');
  });

  it('toggles interests and saved stops', () => {
    let s = tripReducer(initialTripState, { type: 'toggleInterest', id: 'mat' });
    expect(s.interests).not.toContain('mat');
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

  it('gives each day the range from the previous day\'s last stop to its own last stop', () => {
    const points = tripPoints(initialTripState, route);
    const days = dayCount(initialTripState, route);
    // day 1: start (0) → lindheim (3)
    expect(dayRange(points, 1, days)).toEqual([0, 3]);
    // day 2: lindheim (3) → gausta (5)
    expect(dayRange(points, 2, days)).toEqual([3, 5]);
    // last day ends at the end city
    expect(dayRange(points, days, days)[1]).toBe(points.length - 1);
  });
});
