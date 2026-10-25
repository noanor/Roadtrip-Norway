import { describe, expect, it } from 'vitest';
import { formatDuration, snapWaypoints, sumLegs, type DrivingRoute } from './routing';

describe('routing helpers', () => {
  it('snaps waypoints to the nearest geometry point in order', () => {
    const geometry: [number, number][] = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    expect(snapWaypoints(geometry, [[0, 0.1], [0, 2.2], [0, 2.9]])).toEqual([0, 2, 3]);
  });

  it('sums legs in a half-open range', () => {
    const route: DrivingRoute = {
      geometry: [],
      waypointIndex: [],
      legs: [
        { km: 10, minutes: 15 },
        { km: 20, minutes: 30 },
        { km: 5, minutes: 5 },
      ],
    };
    expect(sumLegs(route, 0, 2)).toEqual({ km: 30, minutes: 45 });
  });

  it('formats minutes as hours and minutes', () => {
    expect(formatDuration(185)).toBe('3 t 05 min');
  });
});
