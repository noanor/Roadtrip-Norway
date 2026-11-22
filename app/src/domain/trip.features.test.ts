import { describe, expect, it } from 'vitest';
import { OSLO_BERGEN } from '../data/routes';
import {
  dayRange,
  planOf,
  dayStops,
  daySuggestions,
  driveMinutes,
  initialTripState,
  restoreTripState,
  suitsVehicle,
  tripDays,
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

describe('saved trips', () => {
  const save = (s: TripState, id: string) => tripReducer(s, { type: 'saveTrip', id, savedAt: '2026-11-22T10:00:00.000Z' });

  it('saves the trip and remembers it as the current one', () => {
    const s = save({ ...initialTripState, days: 3, interests: ['mat'], added: ['mjosey'] }, 't1');
    expect(s.savedTrips).toHaveLength(1);
    expect(s.savedTrips[0]).toMatchObject({ id: 't1', from: 'Oslo', to: 'Bergen', days: 3, interests: ['mat'], added: ['mjosey'] });
    expect(s.currentTripId).toBe('t1');
  });

  it('saving again updates the same trip instead of adding a copy', () => {
    let s = save(initialTripState, 't1');
    s = tripReducer(s, { type: 'addStop', stopId: 'mjosey', day: 1 });
    s = save(s, 't2');
    expect(s.savedTrips.map((t) => t.id)).toEqual(['t1']);
    expect(s.savedTrips[0].added).toEqual(['mjosey']);
  });

  it('a new start or end makes the next save a new trip', () => {
    let s = save(initialTripState, 't1');
    s = tripReducer(s, { type: 'setRoute', from: 'Skien', to: 'Dalen' });
    expect(s.currentTripId).toBeNull();
    s = save(s, 't2');
    expect(s.savedTrips.map((t) => t.id)).toEqual(['t2', 't1']);
  });

  it('opening a trip restores its stops and days exactly', () => {
    const planned: TripState = { ...initialTripState, days: 3, via: ['Kongsberg'], vehicle: 'Bobil', interests: ['natur'], added: ['mjosey'], removed: ['heddal'] };
    let s = save(planned, 't1');
    s = tripReducer(s, { type: 'setRoute', from: 'Skien', to: 'Dalen' });
    s = tripReducer(s, { type: 'setActiveDay', day: 2 });
    s = tripReducer(s, { type: 'openTrip', id: 't1' });
    expect(planOf(s)).toEqual(planOf(planned));
    expect(s.activeDay).toBe(1);
    expect(s.currentTripId).toBe('t1');
  });

  it('deletes a trip and forgets it as the current one', () => {
    let s = save(initialTripState, 't1');
    s = tripReducer(s, { type: 'deleteTrip', id: 't1' });
    expect(s.savedTrips).toEqual([]);
    expect(s.currentTripId).toBeNull();
  });

  it('survives a reload and drops broken trips', () => {
    const s = save({ ...initialTripState, added: ['mjosey'] }, 't1');
    const back = restoreTripState(JSON.parse(JSON.stringify({ ...s, savedTrips: [...s.savedTrips, { id: 'x' }, 'tull', { ...s.savedTrips[0], id: 't2', added: ['ghost', 'mjosey'], days: 99 }] })));
    expect(back.savedTrips.map((t) => t.id)).toEqual(['t1', 't2']);
    expect(back.savedTrips[0]).toEqual(s.savedTrips[0]);
    expect(back.savedTrips[1].added).toEqual(['mjosey']);
    expect(back.savedTrips[1].days).toBe(5);
    expect(back.currentTripId).toBe('t1');
    expect(restoreTripState({ currentTripId: 'ghost' }).currentTripId).toBeNull();
  });
});

describe('without a day plan', () => {
  it('the trip is one day from start to end, whatever number of days was chosen', () => {
    const s: TripState = { ...initialTripState, days: 4, flexible: false };
    expect(tripDays(s, route)).toHaveLength(1);
    expect(tripDays(s, route)[0]).toMatchObject({ from: 'Oslo', to: 'Bergen' });
    expect(dayStops(s, route, 1)).toEqual([]);
    expect(daySuggestions(s, route, 1)).toEqual(expect.arrayContaining(['kongsberg', 'bryggen']));
  });

  it('turning the day plan off goes back to day 1, and on again keeps the chosen days', () => {
    let s = tripReducer({ ...initialTripState, days: 3, activeDay: 3 }, { type: 'setFlexible', value: false });
    expect(s.activeDay).toBe(1);
    s = tripReducer(s, { type: 'setFlexible', value: true });
    expect(tripDays(s, route)).toHaveLength(3);
  });
});

describe('ads', () => {
  it('a paid placement is only suggested, also before any interests are chosen', () => {
    expect(dayStops(initialTripState, route, 5)).not.toContain('voss');
    expect(daySuggestions(initialTripState, route, 5)).toContain('voss');
  });

  it('a paid placement the traveller adds is on the route', () => {
    const s = tripReducer(initialTripState, { type: 'addStop', stopId: 'voss', day: 5 });
    expect(dayStops(s, route, 5)).toContain('voss');
  });
});
