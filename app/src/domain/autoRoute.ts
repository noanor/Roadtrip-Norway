import { CITIES } from '../data/catalog';
import { STOPS } from '../data/stops';
import type { DayPlan, LatLng, RouteTemplate } from '../types';

// «Ferdig dagsplan» for places without a hand-picked trip: stops from our own catalogue that lie
// along the drive, split into days by driving time. Plain maths on the route line, no map library.

/** The drive as a line, with its real (or estimated) length and time. */
export interface RouteLine {
  points: LatLng[];
  km: number;
  minutes: number;
}

/** How far from the road a stop may lie and still be suggested. */
export const NEAR_KM = 12;
/** Stops this close to the road are put on the route by default, not only suggested. */
const ON_ROUTE_KM = 5;
/** Shorter drives than this get fewer days than asked for: nobody wants a day of 20 minutes. */
const MIN_MINUTES_PER_DAY = 60;
/** How far from where a day ideally ends we look for a place to sleep: a share of the day, within limits. */
const NIGHT_SEARCH_SHARE = 0.3;
const NIGHT_SEARCH_MIN_KM = 30;
const NIGHT_SEARCH_MAX_KM = 60;
/** Rough road distance and speed when the routing service can't be reached. */
const ROAD_FACTOR = 1.25;
const AVERAGE_KMH = 70;

// Flat projection to kilometres. Good enough within Norway for comparing distances along one drive.
const KM_PER_DEG_LAT = 110.57;
const toXY = ([lat, lng]: LatLng, cosLat: number): [number, number] => [lng * 111.32 * cosLat, lat * KM_PER_DEG_LAT];

/** Straight lines between the places, with estimated road distance and time. Used when offline. */
export function straightLine(points: LatLng[]): RouteLine {
  const cosLat = Math.cos((points[0][0] * Math.PI) / 180);
  let km = 0;
  for (let i = 1; i < points.length; i++) {
    const [ax, ay] = toXY(points[i - 1], cosLat);
    const [bx, by] = toXY(points[i], cosLat);
    km += Math.hypot(bx - ax, by - ay);
  }
  const roadKm = km * ROAD_FACTOR;
  return { points, km: roadKm, minutes: (roadKm / AVERAGE_KMH) * 60 };
}

interface Candidate {
  id: string;
  /** Kilometres from the start, along the drive. */
  at: number;
  /** Kilometres from the road. */
  off: number;
}

/** Measures the line and finds, for any point, how far along it and how far off it it lies. */
function measure(line: RouteLine) {
  const cosLat = Math.cos((line.points[0][0] * Math.PI) / 180);
  const xy = line.points.map((p) => toXY(p, cosLat));
  const cum = [0];
  for (let i = 1; i < xy.length; i++) cum.push(cum[i - 1] + Math.hypot(xy[i][0] - xy[i - 1][0], xy[i][1] - xy[i - 1][1]));
  const length = cum[cum.length - 1];
  // the line is drawn shorter than the road it stands for; scale positions to the road's kilometres
  const scale = length > 0 ? line.km / length : 1;

  const locate = (p: LatLng): { at: number; off: number } => {
    const [px, py] = toXY(p, cosLat);
    let best = { at: 0, off: Math.hypot(px - xy[0][0], py - xy[0][1]) };
    for (let i = 1; i < xy.length; i++) {
      const [ax, ay] = xy[i - 1];
      const dx = xy[i][0] - ax;
      const dy = xy[i][1] - ay;
      const len2 = dx * dx + dy * dy;
      const t = len2 ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2)) : 0;
      const off = Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
      if (off < best.off) best = { at: (cum[i - 1] + t * (cum[i] - cum[i - 1])) * scale, off };
    }
    return best;
  };

  const pointAt = (km: number): LatLng => {
    const target = km / scale;
    for (let i = 1; i < cum.length; i++) {
      if (cum[i] >= target) {
        const t = cum[i] === cum[i - 1] ? 0 : (target - cum[i - 1]) / (cum[i] - cum[i - 1]);
        const [a, b] = [line.points[i - 1], line.points[i]];
        return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
      }
    }
    return line.points[line.points.length - 1];
  };

  return { locate, pointAt };
}

/** Places with a name and a position: the known cities and the towns our stops are in. */
const NAMED_PLACES: [string, LatLng][] = [...Object.entries(CITIES), ...Object.values(STOPS).map((s) => [s.place, s.location] as [string, LatLng])];

/** Name for a night that isn't at one of our stops: the nearest named place, if there is one close by. */
function placeName(location: LatLng, at: number): string {
  const cosLat = Math.cos((location[0] * Math.PI) / 180);
  const [x, y] = toXY(location, cosLat);
  let best: { name: string; km: number } | null = null;
  for (const [name, p] of NAMED_PLACES) {
    const [cx, cy] = toXY(p, cosLat);
    const km = Math.hypot(cx - x, cy - y);
    if (km < 40 && (!best || km < best.km)) best = { name, km };
  }
  return best?.name ?? `Underveis, ${Math.round(at)} km`;
}

/**
 * A planned trip along `line`: every catalogue stop near the road, sorted by where it lies, and
 * the drive cut into `days` parts of about the same driving time. Each night is at a place to stay when
 * one lies close to where the part ends.
 */
export function autoRoute(from: string, to: string, fromLocation: LatLng, toLocation: LatLng, line: RouteLine, days: number): RouteTemplate {
  const { locate, pointAt } = measure(line);
  const candidates: Candidate[] = Object.values(STOPS)
    .map((s) => ({ id: s.id, ...locate(s.location) }))
    .filter((c) => c.off <= NEAR_KM)
    .sort((a, b) => a.at - b.at);

  const parts = Math.max(1, Math.min(days, Math.ceil(line.minutes / MIN_MINUTES_PER_DAY)));
  const nights: { at: number; name: string; location: LatLng }[] = [];
  for (let i = 1; i < parts; i++) {
    const ideal = (line.km * i) / parts;
    const window = Math.min(NIGHT_SEARCH_MAX_KM, Math.max(NIGHT_SEARCH_MIN_KM, (line.km / parts) * NIGHT_SEARCH_SHARE));
    const after = nights.length ? nights[nights.length - 1].at : 0;
    const stay = candidates
      .filter((c) => STOPS[c.id].interest === 'overnatting' && c.at > after && Math.abs(c.at - ideal) <= window)
      .sort((a, b) => Math.abs(a.at - ideal) - Math.abs(b.at - ideal))[0];
    if (stay) nights.push({ at: stay.at, name: STOPS[stay.id].place, location: STOPS[stay.id].location });
    else {
      const location = pointAt(ideal);
      nights.push({ at: ideal, name: placeName(location, ideal), location });
    }
  }

  const ends = [...nights, { at: line.km, name: to, location: toLocation }];
  let start = { at: 0, name: from };
  const plans: DayPlan[] = ends.map((end, i) => {
    // a place to stay where the day ends belongs to that day
    const inside = candidates.filter((c) => (i === 0 || c.at > start.at) && c.at <= end.at);
    // the best-rated stops right by the road are on the route; everything else is a suggestion
    const onRoute = new Set(
      inside
        .filter((c) => c.off <= ON_ROUTE_KM && !STOPS[c.id].sponsored)
        .sort((a, b) => STOPS[b.id].rating - STOPS[a.id].rating)
        .slice(0, 2)
        .map((c) => c.id),
    );
    const km = end.at - start.at;
    const day: DayPlan = {
      day: i + 1,
      from: start.name,
      to: end.name,
      toLocation: end.location,
      km: Math.round(km),
      minutes: line.km > 0 ? Math.round((line.minutes * km) / line.km) : 0,
      stops: inside.filter((c) => onRoute.has(c.id)).map((c) => c.id),
      suggestions: inside.filter((c) => !onRoute.has(c.id)).map((c) => c.id),
    };
    start = end;
    return day;
  });

  return { id: `auto:${from}-${to}`, from, to, fromLocation, toLocation, days: plans, auto: true };
}
