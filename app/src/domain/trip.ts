import { cityLocation, INTERESTS, knownPlace, VEHICLE_SPEED_FACTOR, VEHICLES } from '../data/catalog';
import { STOPS } from '../data/stops';
import type { AppNotification, DayPlan, InterestId, LatLng, Profile, RouteTemplate, Vehicle } from '../types';

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
  /** Stops the traveller added themselves. Always on the route. */
  added: string[];
  /** Stops the traveller took off the route. They show up as suggestions again. */
  removed: string[];
  /** Longest drive the traveller wants in one day. Longer days get a warning. */
  maxDriveHours: number;
  saved: string[];
  lastAdded: string | null;
  /** Answers from owners, newest first. */
  notifications: AppNotification[];
  profile: Profile | null;
}

export const MIN_DAYS = 1;
export const MAX_DAYS = 5;
export const MIN_DRIVE_HOURS = 2;
export const MAX_DRIVE_HOURS = 8;

export const initialTripState: TripState = {
  from: 'Oslo',
  to: 'Bergen',
  via: [],
  days: 5,
  flexible: true,
  vehicle: 'Bil',
  interests: [],
  activeDay: 1,
  added: [],
  removed: [],
  maxDriveHours: 4,
  saved: [],
  lastAdded: null,
  notifications: [],
  profile: null,
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
  | { type: 'setDays'; days: number }
  | { type: 'toggleFlexible' }
  | { type: 'setVehicle'; value: Vehicle }
  | { type: 'toggleInterest'; id: InterestId }
  | { type: 'setActiveDay'; day: number }
  | { type: 'addStop'; stopId: string; day: number }
  | { type: 'removeStop'; stopId: string }
  | { type: 'changeMaxDrive'; delta: number }
  | { type: 'toggleSaved'; stopId: string }
  | { type: 'addNotification'; notification: AppNotification }
  | { type: 'markNotificationsRead' }
  | { type: 'signIn'; profile: Profile }
  | { type: 'signOut' };

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
    case 'changeDays':
    case 'setDays': {
      const wanted = action.type === 'setDays' ? action.days : state.days + action.delta;
      const days = Math.max(MIN_DAYS, Math.min(MAX_DAYS, wanted));
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
    case 'addStop':
      return {
        ...state,
        added: state.added.includes(action.stopId) ? state.added : [...state.added, action.stopId],
        removed: state.removed.filter((s) => s !== action.stopId),
        activeDay: action.day,
        lastAdded: action.stopId,
      };
    case 'removeStop':
      return {
        ...state,
        added: state.added.filter((s) => s !== action.stopId),
        removed: state.removed.includes(action.stopId) ? state.removed : [...state.removed, action.stopId],
        lastAdded: null,
      };
    case 'changeMaxDrive':
      return {
        ...state,
        maxDriveHours: Math.max(MIN_DRIVE_HOURS, Math.min(MAX_DRIVE_HOURS, state.maxDriveHours + action.delta)),
      };
    case 'toggleSaved':
      return {
        ...state,
        saved: state.saved.includes(action.stopId)
          ? state.saved.filter((s) => s !== action.stopId)
          : [...state.saved, action.stopId],
      };
    case 'addNotification':
      return { ...state, notifications: [action.notification, ...state.notifications] };
    case 'markNotificationsRead':
      return { ...state, notifications: state.notifications.map((n) => (n.read ? n : { ...n, read: true })) };
    case 'signIn':
      return { ...state, profile: { name: action.profile.name.trim(), email: action.profile.email.trim() } };
    case 'signOut':
      return { ...state, profile: null };
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

  // Older versions saved added stops per day ({ 1: ['mjosey'] }); the day is now worked out from the route.
  const addedRaw: unknown[] = Array.isArray(raw.added)
    ? raw.added
    : isObject(raw.added)
      ? Object.values(raw.added).flatMap((ids) => (Array.isArray(ids) ? ids : []))
      : [];
  const added = [...new Set(addedRaw.filter(isStopId))];
  const removed = Array.isArray(raw.removed) ? raw.removed.filter(isStopId).filter((id) => !added.includes(id)) : [];

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
    removed,
    maxDriveHours: clampInt(raw.maxDriveHours, MIN_DRIVE_HOURS, MAX_DRIVE_HOURS, s.maxDriveHours),
    saved: Array.isArray(raw.saved) ? raw.saved.filter(isStopId) : s.saved,
    lastAdded: null,
    notifications: Array.isArray(raw.notifications) ? raw.notifications.filter(isNotification) : s.notifications,
    profile: isObject(raw.profile) && typeof raw.profile.name === 'string' && typeof raw.profile.email === 'string' && raw.profile.name.trim()
      ? { name: raw.profile.name, email: raw.profile.email }
      : s.profile,
  };
}

function isNotification(v: unknown): v is AppNotification {
  return (
    isObject(v) &&
    typeof v.id === 'string' &&
    isStopId(v.stopId) &&
    typeof v.question === 'string' &&
    typeof v.answer === 'string' &&
    typeof v.at === 'string' &&
    typeof v.read === 'boolean'
  );
}

// ---------- selectors ----------

export const dayCount = (state: TripState, route: RouteTemplate) => Math.min(state.days, route.days.length);

/** Sizes of `groups` runs of consecutive days, chosen so the longest run is as short as possible. */
function splitEvenly(kms: number[], groups: number): number[] {
  if (groups <= 1) return [kms.length];
  let best: { sizes: number[]; longest: number } | null = null;
  let first = 0;
  for (let size = 1; size <= kms.length - (groups - 1); size++) {
    first += kms[size - 1];
    const rest = splitEvenly(kms.slice(size), groups - 1);
    let offset = size;
    let longest = first;
    for (const n of rest) {
      longest = Math.max(longest, kms.slice(offset, offset + n).reduce((a, b) => a + b, 0));
      offset += n;
    }
    if (!best || longest < best.longest) best = { sizes: [size, ...rest], longest };
  }
  return best!.sizes;
}

/**
 * The route cut into the number of days the traveller asked for. With fewer days than the template
 * has, neighbouring days are joined, so the trip always reaches the destination.
 */
export function tripDays(state: TripState, route: RouteTemplate): DayPlan[] {
  const sizes = splitEvenly(route.days.map((d) => d.km), dayCount(state, route));
  let offset = 0;
  return sizes.map((size, i) => {
    const part = route.days.slice(offset, offset + size);
    offset += size;
    const last = part[part.length - 1];
    return {
      day: i + 1,
      from: part[0].from,
      to: last.to,
      toLocation: last.toLocation,
      km: part.reduce((n, d) => n + d.km, 0),
      minutes: part.reduce((n, d) => n + d.minutes, 0),
      stops: part.flatMap((d) => d.stops),
      suggestions: part.flatMap((d) => d.suggestions),
    };
  });
}

export const dayPlan = (state: TripState, route: RouteTemplate, day: number): DayPlan | undefined =>
  tripDays(state, route)[day - 1];

export const dayTitle = (plan: DayPlan) => `${plan.from} → ${plan.to}`;

/** False when the stop is marked as unsuitable for the chosen vehicle (narrow road, no parking). */
export const suitsVehicle = (state: TripState, stopId: string) => !STOPS[stopId]?.notFor?.includes(state.vehicle);

/** Driving time for the chosen vehicle: motorhomes and caravans take longer on the same road. */
export const driveMinutes = (state: TripState, minutes: number) => minutes * VEHICLE_SPEED_FACTOR[state.vehicle];

/** The places the traveller wants to pass through, as known place names. Empty fields are left out. */
export const viaPlaces = (state: TripState): string[] =>
  state.via.map((v) => knownPlace(v)).filter((v): v is string => v !== undefined);

/** Typed places the planner does not know, in the order they were written: from, via, to. */
export const unknownPlaces = (state: TripState): string[] =>
  [state.from, ...state.via, state.to].filter((v) => v.trim() !== '' && !knownPlace(v)).map((v) => v.trim());

export const unreadCount = (state: TripState) => state.notifications.filter((n) => !n.read).length;

/** True when the stop is one of the things the traveller asked for. */
export const matchesInterests = (state: TripState, stopId: string) => {
  const stop = STOPS[stopId];
  return stop !== undefined && state.interests.includes(stop.interest);
};

/** Interests the traveller chose that no stop along this route covers. */
export function unmetInterests(state: TripState, route: RouteTemplate): InterestId[] {
  const covered = new Set(route.days.flatMap((d) => [...d.stops, ...d.suggestions]).map((id) => STOPS[id]?.interest));
  return state.interests.filter((i) => !covered.has(i));
}

function isIncluded(state: TripState, plan: DayPlan, stopId: string): boolean {
  if (!suitsVehicle(state, stopId)) return false;
  if (state.added.includes(stopId)) return true;
  if (state.removed.includes(stopId)) return false;
  // nothing chosen yet: show the standard route
  if (state.interests.length === 0) return plan.stops.includes(stopId);
  // paid placements are never put on the route for the traveller, only suggested
  return matchesInterests(state, stopId) && !STOPS[stopId].sponsored;
}

/** Rough distance between two points. Only used to compare detours, so flat maths is good enough. */
function distance([lat1, lng1]: LatLng, [lat2, lng2]: LatLng): number {
  const x = (lng2 - lng1) * Math.cos(((lat1 + lat2) / 2) * (Math.PI / 180));
  return Math.hypot(lat2 - lat1, x);
}

/** Where a day starts and ends: last night's place and tonight's (or the trip's own start and end). */
function dayEnds(state: TripState, plans: DayPlan[], day: number): [LatLng, LatLng] {
  const start = day === 1 ? cityLocation(state.from, 'from') : plans[day - 2].toLocation;
  const end = day === plans.length ? cityLocation(state.to, 'to') : plans[day - 1].toLocation;
  return [start, end];
}

/** Stops on the route for one day, in driving order. */
export function dayStops(state: TripState, route: RouteTemplate, day: number): string[] {
  const plans = tripDays(state, route);
  const plan = plans[day - 1];
  if (!plan) return [];
  const [start, end] = dayEnds(state, plans, day);
  // planned stops keep their order; every other stop goes where it adds the shortest detour
  const order = plan.stops.filter((id) => isIncluded(state, plan, id));
  for (const id of plan.suggestions.filter((s) => isIncluded(state, plan, s))) {
    const here = STOPS[id].location;
    const path = [start, ...order.map((s) => STOPS[s].location), end];
    let at = 0;
    let shortest = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      const detour = distance(path[i], here) + distance(here, path[i + 1]) - distance(path[i], path[i + 1]);
      if (detour < shortest) {
        shortest = detour;
        at = i;
      }
    }
    order.splice(at, 0, id);
  }
  return order;
}

/** Stops along the day's drive that are not on the route. The ones that fit the traveller's interests come first. */
export function daySuggestions(state: TripState, route: RouteTemplate, day: number): string[] {
  const plan = dayPlan(state, route, day);
  if (!plan) return [];
  const off = [...plan.suggestions, ...plan.stops].filter((id) => suitsVehicle(state, id) && !isIncluded(state, plan, id));
  return [...off.filter((id) => matchesInterests(state, id)), ...off.filter((id) => !matchesInterests(state, id))];
}

export function totalStops(state: TripState, route: RouteTemplate): number {
  let n = 0;
  for (let d = 1; d <= dayCount(state, route); d++) n += dayStops(state, route, d).length;
  return n;
}

export function totalKm(state: TripState, route: RouteTemplate): number {
  return tripDays(state, route).reduce((n, d) => n + d.km, 0);
}

/** The day a stop belongs to (on the route or suggested), or null if it is not along the route. */
export function dayOfStop(state: TripState, route: RouteTemplate, stopId: string): number | null {
  const plan = tripDays(state, route).find((d) => d.stops.includes(stopId) || d.suggestions.includes(stopId));
  return plan ? plan.day : null;
}

export const isOnRoute = (state: TripState, route: RouteTemplate, stopId: string) => {
  const day = dayOfStop(state, route, stopId);
  return day !== null && dayStops(state, route, day).includes(stopId);
};

// ---------- map geometry ----------

export interface TripPoint {
  location: LatLng;
  /** `night` is where one day ends and the next one starts; `via` is a place the traveller chose to pass. */
  kind: 'start' | 'end' | 'stop' | 'night' | 'via';
  stopId?: string;
  day?: number;
  /** Position within its day, starting at 0. */
  index?: number;
  /** Place name, for `night` and `via` points. */
  label?: string;
}

/** Ordered waypoints for the whole trip: start, every stop day by day with the night stops between, end. */
export function tripPoints(state: TripState, route: RouteTemplate): TripPoint[] {
  const plans = tripDays(state, route);
  const points: TripPoint[] = [{ location: cityLocation(state.from, 'from'), kind: 'start' }];
  for (const plan of plans) {
    dayStops(state, route, plan.day).forEach((stopId, index) => {
      points.push({ location: STOPS[stopId].location, kind: 'stop', stopId, day: plan.day, index });
    });
    if (plan.day < plans.length) points.push({ location: plan.toLocation, kind: 'night', day: plan.day, label: plan.to });
  }
  points.push({ location: cityLocation(state.to, 'to'), kind: 'end' });
  return insertVia(points, viaPlaces(state), plans.length);
}

/**
 * Puts each via place into the drive where it adds the shortest detour. A later via never goes before an
 * earlier one, so the places are passed in the order the traveller wrote them.
 */
function insertVia(points: TripPoint[], via: string[], days: number): TripPoint[] {
  const result = [...points];
  let earliest = 0;
  for (const name of via) {
    const here = cityLocation(name, 'to');
    let at = earliest;
    let shortest = Infinity;
    for (let i = earliest; i < result.length - 1; i++) {
      const a = result[i].location;
      const b = result[i + 1].location;
      const detour = distance(a, here) + distance(here, b) - distance(a, b);
      if (detour < shortest) {
        shortest = detour;
        at = i;
      }
    }
    const next = result[at + 1];
    const day = next.kind === 'end' ? days : (next.day ?? days);
    result.splice(at + 1, 0, { location: here, kind: 'via', day, label: name });
    earliest = at + 1;
  }
  return result;
}

/** Waypoint index range for one day: from where the previous day ended to where this one ends. */
export function dayRange(points: TripPoint[], day: number, days: number): [number, number] {
  const night = (d: number) => points.findIndex((p) => p.kind === 'night' && p.day === d);
  const start = day <= 1 ? 0 : night(day - 1);
  const end = day >= days ? points.length - 1 : night(day);
  if (start < 0 || end < 0) return [0, points.length - 1];
  return [start, end];
}
