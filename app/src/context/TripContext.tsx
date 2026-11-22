import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import { config } from '../config';
import { OSLO_BERGEN } from '../data/catalog';
import { initialTripState, restoreTripState, tripReducer, type TripAction, type TripState } from '../domain/trip';
import type { RouteTemplate } from '../types';

interface TripContextValue {
  state: TripState;
  dispatch: Dispatch<TripAction>;
  /** Planned route for the current from/to. Only Oslo → Bergen exists so far. */
  route: RouteTemplate;
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

  const value = useMemo(() => ({ state, dispatch, route: OSLO_BERGEN }), [state]);
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip(): TripContextValue {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used inside <TripProvider>');
  return ctx;
}
