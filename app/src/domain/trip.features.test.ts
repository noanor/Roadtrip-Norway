import { describe, expect, it } from 'vitest';
import { OSLO_BERGEN } from '../data/catalog';
import {
  dayRange,
  dayStops,
  daySuggestions,
  driveMinutes,
  initialTripState,
  restoreTripState,
  suitsVehicle,
  tripPoints,
  tripReducer,
  unknownPlaces,
  unreadCount,
  viaPlaces,
  type TripState,
} from './trip';

const route = OSLO_BERGEN;
const withVia = (...via: string[]): TripState => ({ ...initialTripState, via });

describe('via places', () => {
  it('ignores empty fields and matches names regardless of case', () => {
    expect(viaPlaces(withVia('', '  kongsberg ', 'Odda'))).toEqual(['Kongsberg', 'Odda']);
  });

  it('lists places the planner does not know', () => {
    expect(unknownPlaces({ ...withVia('Gol', ''), to: 'Bergen' })).toEqual(['Gol']);
    expect(unknownPlaces(initialTripState)).toEqual([]);
  });

  it('adds via places to the drive, in the order they were written, inside the right day', () => {
    const points = tripPoints(withVia('Kongsberg', 'Odda'), route);
    const via = points.filter((p) => p.kind === 'via');
    expect(via.map((p) => p.label)).toEqual(['Kongsberg', 'Odda']);
    expect(points.indexOf(via[0])).toBeLessThan(points.indexOf(via[1]));
    expect(via[0].day).toBe(1);
    const kongsberg = points.indexOf(via[0]);
    const [start, end] = dayRange(points, 1, 5);
    expect(kongsberg).toBeGreaterThan(start);
    expect(kongsberg).toBeLessThan(end);
  });

  it('leaves the waypoints unchanged without via places', () => {
    expect(tripPoints(withVia('', 'Ukjentby'), route)).toEqual(tripPoints(initialTripState, route));
  });
});

describe('vehicle', () => {
  it('makes the drive take longer with a motorhome or caravan', () => {
    expect(driveMinutes(initialTripState, 100)).toBe(100);
    expect(driveMinutes({ ...initialTripState, vehicle: 'Bobil' }, 100)).toBeCloseTo(115);
    expect(driveMinutes({ ...initialTripState, vehicle: 'Campingvogn' }, 100)).toBeCloseTo(120);
  });

  it('keeps stops that do not suit the vehicle off the route and out of the suggestions', () => {
    const bobil = tripReducer(initialTripState, { type: 'setVehicle', value: 'Bobil' });
    expect(suitsVehicle(initialTripState, 'gausta')).toBe(true);
    expect(suitsVehicle(bobil, 'gausta')).toBe(false);
    expect(dayStops(initialTripState, route, 2)).toContain('gausta');
    expect(dayStops(bobil, route, 2)).not.toContain('gausta');
    expect(daySuggestions(bobil, route, 2)).not.toContain('gausta');
  });

  it('drops an added stop that does not suit the new vehicle', () => {
    const added = tripReducer(initialTripState, { type: 'addStop', stopId: 'floyen', day: 5 });
    expect(dayStops(added, route, 5)).toContain('floyen');
    const caravan = tripReducer(added, { type: 'setVehicle', value: 'Campingvogn' });
    expect(dayStops(caravan, route, 5)).not.toContain('floyen');
  });
});

describe('notifications', () => {
  const answer = { id: 'n1', stopId: 'mjosey', question: 'Glutenfritt?', answer: 'Ja', at: '2026-11-22T10:00:00.000Z', read: false };

  it('adds the newest first and marks all as read', () => {
    let s = tripReducer(initialTripState, { type: 'addNotification', notification: answer });
    s = tripReducer(s, { type: 'addNotification', notification: { ...answer, id: 'n2' } });
    expect(s.notifications.map((n) => n.id)).toEqual(['n2', 'n1']);
    expect(unreadCount(s)).toBe(2);
    expect(unreadCount(tripReducer(s, { type: 'markNotificationsRead' }))).toBe(0);
  });

  it('restores valid notifications and drops broken ones', () => {
    const s = restoreTripState({ notifications: [answer, { ...answer, stopId: 'ghost' }, 'tull', { id: 'x' }] });
    expect(s.notifications).toEqual([answer]);
  });
});

describe('profile', () => {
  it('signs in with a trimmed name and signs out', () => {
    const s = tripReducer(initialTripState, { type: 'signIn', profile: { name: '  Kari Nordmann ', email: 'kari@example.com ' } });
    expect(s.profile).toEqual({ name: 'Kari Nordmann', email: 'kari@example.com' });
    expect(tripReducer(s, { type: 'signOut' }).profile).toBeNull();
  });

  it('restores a saved profile and ignores a broken one', () => {
    expect(restoreTripState({ profile: { name: 'Kari', email: 'k@example.com' } }).profile).toEqual({ name: 'Kari', email: 'k@example.com' });
    expect(restoreTripState({ profile: { name: '', email: 'k@example.com' } }).profile).toBeNull();
    expect(restoreTripState({ profile: 'Kari' }).profile).toBeNull();
  });
});
