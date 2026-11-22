import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { useTrip } from '../../context/TripContext';
import { STOPS } from '../../data/stops';
import { dayCount, dayOfStop, dayRange, daySuggestions, tripPoints } from '../../domain/trip';
import type { RouteTemplate } from '../../types';
import { useDrivingRoute } from './useDrivingRoute';

/** Everything a page needs to render <TripMap> for one day (or the whole trip when day is null). */
export function useTripMap(route: RouteTemplate, day: number | null, showSuggestions = true) {
  const { state, dispatch } = useTrip();
  const navigate = useNavigate();
  const toast = useToast();
  const days = dayCount(state, route);

  const points = useMemo(() => tripPoints(state, route), [state, route]);
  const locations = useMemo(() => points.map((p) => p.location), [points]);
  const drivingRoute = useDrivingRoute(locations);
  const range = dayRange(points, day ?? state.activeDay, days);

  const suggestions: string[] = [];
  if (showSuggestions) {
    for (let d = 1; d <= days; d++) if (day === null || d === day) suggestions.push(...daySuggestions(state, route, d));
  }

  return {
    points,
    range,
    suggestions,
    drivingRoute,
    startLabel: route.from,
    endLabel: route.to,
    onOpenStop: (stopId: string) => navigate(`/stopp/${stopId}`, { state: { from: 'route' } }),
    /** Adds the stop to its day and returns that day. */
    onAddStop: (stopId: string): number => {
      const target = dayOfStop(state, route, stopId) ?? state.activeDay;
      dispatch({ type: 'addStop', stopId, day: target });
      toast(`${STOPS[stopId].name} er lagt til ${state.flexible ? `dag ${target}` : 'i ruten'}`);
      return target;
    },
  };
}
