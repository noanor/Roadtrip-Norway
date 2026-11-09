import { config } from '../config';
import type { LatLng } from '../types';

export interface DrivingRoute {
  geometry: LatLng[];
  /** For each requested waypoint, its index in `geometry`. */
  waypointIndex: number[];
  legs: { km: number; minutes: number }[];
}

interface OsrmResponse {
  code: string;
  routes: { geometry: { coordinates: [number, number][] }; legs: { distance: number; duration: number }[] }[];
  waypoints: { location: [number, number] }[];
}

const cache = new Map<string, Promise<DrivingRoute | null>>();

/** Driving route through all points via an OSRM server. Resolves to null when the server can't be reached. */
export function fetchDrivingRoute(points: LatLng[]): Promise<DrivingRoute | null> {
  const key = points.map((p) => p.join(',')).join(';');
  let pending = cache.get(key);
  if (!pending) {
    pending = requestRoute(points).then((route) => {
      // don't remember failures, so the next render can try again (e.g. after going back online)
      if (!route) cache.delete(key);
      return route;
    });
    cache.set(key, pending);
  }
  return pending;
}

async function requestRoute(points: LatLng[]): Promise<DrivingRoute | null> {
  if (points.length < 2) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const coords = points.map(([lat, lng]) => `${lng},${lat}`).join(';');
    const res = await fetch(`${config.routingUrl}/route/v1/driving/${coords}?overview=full&geometries=geojson`, {
      signal: controller.signal,
    });
    const json = (await res.json()) as OsrmResponse;
    if (json.code !== 'Ok' || !json.routes.length) return null;
    const route = json.routes[0];
    const geometry = route.geometry.coordinates.map(([lng, lat]) => [lat, lng] as LatLng);
    return {
      geometry,
      waypointIndex: snapWaypoints(geometry, json.waypoints.map(({ location: [lng, lat] }) => [lat, lng] as LatLng)),
      legs: route.legs.map((l) => ({ km: l.distance / 1000, minutes: l.duration / 60 })),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Nearest geometry index for each waypoint, scanning forward so the order is kept. */
export function snapWaypoints(geometry: LatLng[], waypoints: LatLng[]): number[] {
  const result: number[] = [];
  let from = 0;
  for (const [lat, lng] of waypoints) {
    let best = from;
    let bestDist = Infinity;
    for (let i = from; i < geometry.length; i++) {
      const d = (geometry[i][0] - lat) ** 2 + (geometry[i][1] - lng) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    result.push(best);
    from = best;
  }
  return result;
}

/** Total distance and duration for legs [from, to). */
export function sumLegs(route: DrivingRoute, from: number, to: number) {
  return route.legs.slice(from, to).reduce((s, l) => ({ km: s.km + l.km, minutes: s.minutes + l.minutes }), { km: 0, minutes: 0 });
}

export function formatDuration(minutes: number): string {
  const m = Math.round(minutes);
  return `${Math.floor(m / 60)} t ${String(m % 60).padStart(2, '0')} min`;
}
