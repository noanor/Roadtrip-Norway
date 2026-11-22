import { useEffect, useMemo, useState } from 'react';
import { cityLocation, knownPlace } from '../data/catalog';
import { autoRoute, straightLine, type RouteLine } from '../domain/autoRoute';
import { fetchDrivingRoute } from '../services/routing';
import type { LatLng, RouteTemplate } from '../types';

/**
 * A trip the app plans itself between two known places (through the via places). It is ready at
 * once from straight lines, and is redone along the real road when the routing service answers.
 * Null when `active` is false or a place is unknown.
 */
export function useAutoRoute(active: boolean, from: string, to: string, via: string[], days: number): RouteTemplate | null {
  const plan = useMemo(() => {
    const start = knownPlace(from);
    const end = knownPlace(to);
    if (!active || !start || !end) return null;
    const stops = via.map((v) => cityLocation(v)).filter((p): p is LatLng => p !== undefined);
    const points = [cityLocation(start)!, ...stops, cityLocation(end)!];
    return { start, end, points, key: points.map((p) => p.join(',')).join(';') };
  }, [active, from, to, via]);

  const [road, setRoad] = useState<{ key: string; line: RouteLine } | null>(null);

  useEffect(() => {
    if (!plan) return;
    let current = true;
    fetchDrivingRoute(plan.points).then((route) => {
      if (!current || !route) return;
      const km = route.legs.reduce((n, l) => n + l.km, 0);
      const minutes = route.legs.reduce((n, l) => n + l.minutes, 0);
      setRoad({ key: plan.key, line: { points: route.geometry, km, minutes } });
    });
    return () => {
      current = false;
    };
  }, [plan]);

  return useMemo(() => {
    if (!plan) return null;
    const line = road?.key === plan.key ? road.line : straightLine(plan.points);
    return autoRoute(plan.start, plan.end, plan.points[0], plan.points[plan.points.length - 1], line, days);
  }, [plan, road, days]);
}
