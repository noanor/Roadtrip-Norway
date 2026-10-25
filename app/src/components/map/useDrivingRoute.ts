import { useEffect, useMemo, useState } from 'react';
import { fetchDrivingRoute, type DrivingRoute } from '../../services/routing';
import type { LatLng } from '../../types';

/** Loads the real driving route for the points. Null while loading or when routing is unavailable. */
export function useDrivingRoute(points: LatLng[]): DrivingRoute | null {
  const key = useMemo(() => points.map((p) => p.join(',')).join(';'), [points]);
  const [result, setResult] = useState<{ key: string; route: DrivingRoute | null } | null>(null);

  useEffect(() => {
    let active = true;
    fetchDrivingRoute(points).then((route) => {
      if (active) setResult({ key, route });
    });
    return () => {
      active = false;
    };
    // points is tracked through key, so a new array with the same coordinates doesn't refetch
  }, [key]);

  return result?.key === key ? result.route : null;
}
