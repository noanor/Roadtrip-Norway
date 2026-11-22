import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import { config } from '../config';
import { findRoute } from '../data/routes';
import { initialTripState, restoreTripState, tripReducer, type TripAction, type TripState } from '../domain/trip';
import type { RouteTemplate } from '../types';

interface TripContextValue {
  state: TripState;
  dispatch: Dispatch<TripAction>;
  /** Planned trip for the current from/to, or null when none is planned between those places yet. */
  route: RouteTemplate | null;
}

const TripContext = createContext<TripContextValue | null>(null);

function loadState(): TripState {
  try {
    const raw = localStorage.getItem(config.storageKey);
    if (raw) return restoreTripState(JSON.parse(raw));
  } catch {
    // storage unavailable or corrupt: start fresh
  }
  return initialTripState;
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tripReducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(state));
    } catch {
      // ignore: the trip still works for this session
    }
  }, [state]);

  const route = useMemo(() => findRoute(state.from, state.to), [state.from, state.to]);
  const value = useMemo(() => ({ state, dispatch, route }), [state, route]);
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip(): TripContextValue {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used inside <TripProvider>');
  return ctx;
}
