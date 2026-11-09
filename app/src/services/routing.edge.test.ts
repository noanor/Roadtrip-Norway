import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchDrivingRoute, formatDuration, snapWaypoints, sumLegs } from './routing';
import type { LatLng } from '../types';

const okResponse = {
  code: 'Ok',
  routes: [
    {
      geometry: { coordinates: [[10, 59], [9.5, 59.5], [9, 60]] },
      legs: [
        { distance: 12000, duration: 900 },
        { distance: 8000, duration: 600 },
      ],
    },
  ],
  waypoints: [{ location: [10, 59] }, { location: [9.5, 59.5] }, { location: [9, 60] }],
};

// Unique coordinates per test so the module-level cache can't leak between tests.
let seq = 0;
const points = (): LatLng[] => {
  seq += 1;
  return [
    [59, 10 + seq / 1000],
    [59.5, 9.5],
    [60, 9],
  ];
};

const respond = (body: unknown) => vi.fn().mockResolvedValue({ json: () => Promise.resolve(body) });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchDrivingRoute', () => {
  it('does not call the server for fewer than two points', async () => {
    const fetch = respond(okResponse);
    vi.stubGlobal('fetch', fetch);
    expect(await fetchDrivingRoute([[59, 10]])).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('turns OSRM [lng, lat] into [lat, lng] and km/minutes', async () => {
    vi.stubGlobal('fetch', respond(okResponse));
    const route = await fetchDrivingRoute(points());
    expect(route?.geometry[0]).toEqual([59, 10]);
    expect(route?.waypointIndex).toEqual([0, 1, 2]);
    expect(route?.legs).toEqual([
      { km: 12, minutes: 15 },
      { km: 8, minutes: 10 },
    ]);
  });

  it('returns null when the server reports an error', async () => {
    vi.stubGlobal('fetch', respond({ code: 'NoRoute', routes: [], waypoints: [] }));
    expect(await fetchDrivingRoute(points())).toBeNull();
  });

  it('returns null for malformed responses', async () => {
    vi.stubGlobal('fetch', respond({ code: 'Ok' }));
    expect(await fetchDrivingRoute(points())).toBeNull();
  });

  it('returns null when offline, and tries again on the next call', async () => {
    const p = points();
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    expect(await fetchDrivingRoute(p)).toBeNull();

    vi.stubGlobal('fetch', respond(okResponse));
    expect(await fetchDrivingRoute(p)).not.toBeNull();
  });

  it('reuses a successful result instead of fetching again', async () => {
    const p = points();
    const fetch = respond(okResponse);
    vi.stubGlobal('fetch', fetch);
    await fetchDrivingRoute(p);
    await fetchDrivingRoute(p);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe('routing helpers at the edges', () => {
  it('handles empty geometry and no waypoints', () => {
    expect(snapWaypoints([], [])).toEqual([]);
    expect(snapWaypoints([], [[1, 1]])).toEqual([0]);
  });

  it('keeps waypoint order even when a later point is closer to an earlier segment', () => {
    const geometry: LatLng[] = [
      [0, 0],
      [0, 5],
      [0, 0.1],
    ];
    // the last waypoint must not snap back before the second one
    expect(snapWaypoints(geometry, [[0, 0], [0, 5], [0, 0]])).toEqual([0, 1, 2]);
  });

  it('sums nothing for empty or out-of-range leg ranges', () => {
    const route = { geometry: [], waypointIndex: [], legs: [{ km: 1, minutes: 1 }] };
    expect(sumLegs(route, 3, 9)).toEqual({ km: 0, minutes: 0 });
    expect(sumLegs(route, 1, 1)).toEqual({ km: 0, minutes: 0 });
  });

  it('rounds durations without producing 60 minutes', () => {
    expect(formatDuration(0)).toBe('0 t 00 min');
    expect(formatDuration(59.6)).toBe('1 t 00 min');
    expect(formatDuration(119.4)).toBe('1 t 59 min');
  });
});
