import { describe, expect, it } from 'vitest';
import { OSLO_BERGEN } from '../data/catalog';
import {
  dayCount,
  dayRange,
  initialTripState,
  MAX_DAYS,
  MIN_DAYS,
  restoreTripState,
  totalStops,
  tripPoints,
  tripReducer,
  type TripState,
} from './trip';

const route = OSLO_BERGEN;

describe('tripReducer edge cases', () => {
  it('swapping twice gives the original route', () => {
    const s = tripReducer(tripReducer(initialTripState, { type: 'swap' }), { type: 'swap' });
    expect([s.from, s.to]).toEqual([initialTripState.from, initialTripState.to]);
  });

  it('never goes below the minimum number of days', () => {
    const s = tripReducer(initialTripState, { type: 'changeDays', delta: -100 });
    expect(s.days).toBe(MIN_DAYS);
    expect(s.activeDay).toBe(MIN_DAYS);
  });

  it('ignores via edits and removals at indices that do not exist', () => {
    const one = tripReducer(initialTripState, { type: 'addVia' });
    expect(tripReducer(one, { type: 'setVia', index: 5, value: 'Gol' }).via).toEqual(['']);
    expect(tripReducer(one, { type: 'removeVia', index: -1 }).via).toEqual(['']);
  });

  it('keeps added stops when days are reduced, but leaves them out of the trip', () => {
    let s = tripReducer(initialTripState, { type: 'addStop', stopId: 'floyen', day: 5 });
    const before = totalStops(s, route);
    s = tripReducer(s, { type: 'changeDays', delta: -3 });
    expect(s.added[5]).toEqual(['floyen']);
    expect(tripPoints(s, route).some((p) => p.stopId === 'floyen')).toBe(false);
    expect(totalStops(s, route)).toBeLessThan(before);
  });

  it('a one-day trip spans from start to end', () => {
    const s: TripState = { ...initialTripState, days: 1 };
    const points = tripPoints(s, route);
    expect(dayRange(points, 1, dayCount(s, route))).toEqual([0, points.length - 1]);
  });

  it('falls back to Oslo and Bergen for unknown or empty places', () => {
    const s: TripState = { ...initialTripState, from: '   ', to: 'Atlantis' };
    const points = tripPoints(s, route);
    expect(points[0].location).toEqual([59.913, 10.752]);
    expect(points[points.length - 1].location).toEqual([60.392, 5.324]);
  });

  it('matches known places regardless of case and surrounding spaces', () => {
    const s: TripState = { ...initialTripState, to: '  bergen ' };
    const points = tripPoints(s, route);
    expect(points[points.length - 1].location).toEqual([60.392, 5.324]);
  });
});

describe('restoreTripState (data saved in the browser)', () => {
  it('returns the initial state for anything that is not an object', () => {
    for (const raw of [null, undefined, 42, 'x', [], true]) {
      expect(restoreTripState(raw)).toEqual(initialTripState);
    }
  });

  it('clamps days and the active day to valid values', () => {
    expect(restoreTripState({ days: 99, activeDay: 42 })).toMatchObject({ days: MAX_DAYS, activeDay: MAX_DAYS });
    expect(restoreTripState({ days: 0, activeDay: -3 })).toMatchObject({ days: MIN_DAYS, activeDay: MIN_DAYS });
    expect(restoreTripState({ days: 3, activeDay: 5 })).toMatchObject({ days: 3, activeDay: 3 });
    expect(restoreTripState({ days: 'mange', activeDay: Number.NaN })).toMatchObject({
      days: initialTripState.days,
      activeDay: 1,
    });
  });

  it('drops stops, interests and vehicles that no longer exist', () => {
    const s = restoreTripState({
      added: { 1: ['mjosey', 'ghost'], 9: ['floyen'], x: ['late'], 2: 'rauland' },
      saved: ['gausta', 'ghost', 7],
      interests: ['mat', 'shopping'],
      vehicle: 'Traktor',
    });
    expect(s.added).toEqual({ 1: ['mjosey'] });
    expect(s.saved).toEqual(['gausta']);
    expect(s.interests).toEqual(['mat']);
    expect(s.vehicle).toBe(initialTripState.vehicle);
  });

  it('keeps valid saved values and never restores the transient highlight', () => {
    const saved: TripState = {
      ...initialTripState,
      from: 'Stavanger',
      via: ['Gol'],
      flexible: false,
      vehicle: 'Bobil',
      lastAdded: 'mjosey',
    };
    expect(restoreTripState(JSON.parse(JSON.stringify(saved)))).toEqual({ ...saved, lastAdded: null });
  });
});
