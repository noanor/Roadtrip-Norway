import { cityLocation, INTERESTS, VEHICLES } from '../data/catalog';
import { STOPS } from '../data/stops';
import type { InterestId, LatLng, RouteTemplate, Vehicle } from '../types';

// ---------- state ----------

export interface TripState {
  from: string;
  to: string;
  via: string[];
  days: number;
  flexible: boolean;
  vehicle: Vehicle;
  interests: InterestId[];
  activeDay: number;
  /** Stops the traveller added themselves, per day. */
  added: Record<number, string[]>;
  saved: string[];
  lastAdded: string | null;
}

export const MIN_DAYS = 1;
export const MAX_DAYS = 5;

export const initialTripState: TripState = {
  from: 'Oslo',
  to: 'Bergen',
  via: [],
  days: 5,
  flexible: true,
  vehicle: 'Bil',
  interests: ['mat', 'historie'],
  activeDay: 1,
  added: {},
  saved: ['gausta'],
  lastAdded: null,
};

export type TripAction =
  | { type: 'setFrom'; value: string }
  | { type: 'setTo'; value: string }
  | { type: 'setRoute'; from: string; to: string }
  | { type: 'swap' }
  | { type: 'addVia' }
  | { type: 'setVia'; index: number; value: string }
  | { type: 'removeVia'; index: number }
  | { type: 'changeDays'; delta: number }
  | { type: 'toggleFlexible' }
  | { type: 'setVehicle'; value: Vehicle }
  | { type: 'toggleInterest'; id: InterestId }
  | { type: 'setActiveDay'; day: number }
  | { type: 'addStop'; stopId: string; day: number }
  | { type: 'toggleSaved'; stopId: string };

export function tripReducer(state: TripState, action: TripAction): TripState {
  switch (action.type) {
    case 'setFrom':
      return { ...state, from: action.value };
    case 'setTo':
      return { ...state, to: action.value };
    case 'setRoute':
      return { ...state, from: action.from, to: action.to };
    case 'swap':
      return { ...state, from: state.to, to: state.from };
    case 'addVia':
      return { ...state, via: [...state.via, ''] };
    case 'setVia':
      return { ...state, via: state.via.map((v, i) => (i === action.index ? action.value : v)) };
    case 'removeVia':
      return { ...state, via: state.via.filter((_, i) => i !== action.index) };
    case 'changeDays': {
      const days = Math.max(MIN_DAYS, Math.min(MAX_DAYS, state.days + action.delta));
      return { ...state, days, activeDay: Math.min(state.activeDay, days) };
    }
    case 'toggleFlexible':
      return { ...state, flexible: !state.flexible };
    case 'setVehicle':
      return { ...state, vehicle: action.value };
    case 'toggleInterest':
      return {
        ...state,
        interests: state.interests.includes(action.id)
          ? state.interests.filter((i) => i !== action.id)
          : [...state.interests, action.id],
      };
    case 'setActiveDay':
      return { ...state, activeDay: action.day, lastAdded: null };
    case 'addStop': {
      const current = state.added[action.day] ?? [];
      const added = current.includes(action.stopId)
        ? state.added
        : { ...state.added, [action.day]: [...current, action.stopId] };
      return { ...state, added, activeDay: action.day, lastAdded: action.stopId };
    }
    case 'toggleSaved':
      return {
        ...state,
        saved: state.saved.includes(action.stopId)
          ? state.saved.filter((s) => s !== action.stopId)
          : [...state.saved, action.stopId],
      };
  }
}

// ---------- restoring saved state ----------

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isStopId = (v: unknown): v is string => typeof v === 'string' && v in STOPS;
const clampInt = (v: unknown, min: number, max: number, fallback: number) =>
  typeof v === 'number' && Number.isFinite(v) ? Math.max(min, Math.min(max, Math.round(v))) : fallback;

/**
 * Turns whatever was saved in the browser into a valid state. Saved data can be from an older
 * version of the app or edited by hand, so every field is checked and unknown stops are dropped.
 */
export function restoreTripState(raw: unknown): TripState {
  if (!isObject(raw)) return initialTripState;
  const s = initialTripState;
  const days = clampInt(raw.days, MIN_DAYS, MAX_DAYS, s.days);

  const added: Record<number, string[]> = {};
  if (isObject(raw.added)) {
    for (const [key, ids] of Object.entries(raw.added)) {
      const day = Number(key);
      if (!Number.isInteger(day) || day < MIN_DAYS || day > MAX_DAYS || !Array.isArray(ids)) continue;
      const valid = ids.filter(isStopId);
      if (valid.length) added[day] = valid;
    }
  }

  return {
    from: typeof raw.from === 'string' ? raw.from : s.from,
    to: typeof raw.to === 'string' ? raw.to : s.to,
    via: Array.isArray(raw.via) ? raw.via.filter((v): v is string => typeof v === 'string') : s.via,
    days,
    flexible: typeof raw.flexible === 'boolean' ? raw.flexible : s.flexible,
    vehicle: VEHICLES.includes(raw.vehicle as Vehicle) ? (raw.vehicle as Vehicle) : s.vehicle,
    interests: Array.isArray(raw.interests)
      ? raw.interests.filter((i): i is InterestId => INTERESTS.some((known) => known.id === i))
      : s.interests,
    activeDay: clampInt(raw.activeDay, MIN_DAYS, days, MIN_DAYS),
    added,
    saved: Array.isArray(raw.saved) ? raw.saved.filter(isStopId) : s.saved,
    lastAdded: null,
  };
}

// ---------- selectors ----------

export const dayCount = (state: TripState, route: RouteTemplate) => Math.min(state.days, route.days.length);

export const dayPlan = (route: RouteTemplate, day: number) => route.days.find((d) => d.day === day);

export const dayStops = (state: TripState, route: RouteTemplate, day: number): string[] => [
  ...(dayPlan(route, day)?.stops ?? []),
  ...(state.added[day] ?? []),
];

export const daySuggestions = (state: TripState, route: RouteTemplate, day: number): string[] =>
  (dayPlan(route, day)?.suggestions ?? []).filter((id) => !(state.added[day] ?? []).includes(id));

export function totalStops(state: TripState, route: RouteTemplate): number {
  let n = 0;
  for (let d = 1; d <= dayCount(state, route); d++) n += dayStops(state, route, d).length;
  return n;
}

export function totalKm(state: TripState, route: RouteTemplate): number {
  let n = 0;
  for (let d = 1; d <= dayCount(state, route); d++) n += dayPlan(route, d)?.km ?? 0;
  return n;
}

/** The day a stop belongs to in the template (planned or suggested), or null if it is not on the route. */
export function dayOfStop(route: RouteTemplate, stopId: string): number | null {
  const plan = route.days.find((d) => d.stops.includes(stopId) || d.suggestions.includes(stopId));
  return plan ? plan.day : null;
}

export const isOnRoute = (state: TripState, route: RouteTemplate, stopId: string) => {
  const day = dayOfStop(route, stopId);
  return day !== null && dayStops(state, route, day).includes(stopId);
};

// ---------- map geometry ----------

export interface TripPoint {
  location: LatLng;
  kind: 'start' | 'end' | 'stop';
  stopId?: string;
  day?: number;
  /** Position within its day, starting at 0. */
  index?: number;
}

/** Ordered waypoints for the whole trip: start, every stop day by day, end. */
export function tripPoints(state: TripState, route: RouteTemplate): TripPoint[] {
  const points: TripPoint[] = [{ location: cityLocation(state.from, 'from'), kind: 'start' }];
  for (let d = 1; d <= dayCount(state, route); d++) {
    dayStops(state, route, d).forEach((stopId, index) => {
      const stop = STOPS[stopId];
      if (stop) points.push({ location: stop.location, kind: 'stop', stopId, day: d, index });
    });
  }
  points.push({ location: cityLocation(state.to, 'to'), kind: 'end' });
  return points;
}

/** Waypoint index range for one day: from the previous day's last stop to this day's last stop. */
export function dayRange(points: TripPoint[], day: number, days: number): [number, number] {
  let start = 0;
  points.forEach((p, i) => {
    if (p.day !== undefined && p.day < day) start = i;
  });
  const end = day === days ? points.length - 1 : points.map((p) => p.day).lastIndexOf(day);
  return [start, Math.max(start, end)];
}
