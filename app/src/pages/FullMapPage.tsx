import { useState } from 'react';
import { Icon } from '../components/Icon';
import { useBack } from '../hooks/useBack';
import { TripMap } from '../components/map/TripMap';
import { useTripMap } from '../components/map/useTripMap';
import { useToast } from '../context/ToastContext';
import { useTrip } from '../context/TripContext';
import { dayCount, dayPlan, totalStops } from '../domain/trip';
import type { LatLng } from '../types';

export function FullMapPage() {
  const { state, dispatch, route } = useTrip();
  const back = useBack('/rute');
  const toast = useToast();
  /** null = whole trip */
  const [day, setDay] = useState<number | null>(state.activeDay);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [userPosition, setUserPosition] = useState<LatLng | null>(null);
  const map = useTripMap(day, showSuggestions);
  const days = dayCount(state, route);

  const selectDay = (d: number | null) => {
    setDay(d);
    if (d !== null) dispatch({ type: 'setActiveDay', day: d });
  };

  const locate = () => {
    if (!navigator.geolocation) {
      toast('Posisjon støttes ikke i denne nettleseren');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => setUserPosition([p.coords.latitude, p.coords.longitude]),
      () => toast('Fikk ikke tilgang til posisjonen din'),
      { timeout: 8000 },
    );
  };

  return (
    <div className="fullmap">
      <TripMap
        mode="full"
        day={day}
        points={map.points}
        range={map.range}
        suggestions={map.suggestions}
        route={map.drivingRoute}
        startLabel={map.startLabel}
        endLabel={map.endLabel}
        userPosition={userPosition}
        onOpenStop={map.onOpenStop}
        onAddStop={(id) => {
          const added = map.onAddStop(id);
          if (day !== null) setDay(added);
        }}
      />
      <div className="map-top">
        <button className="iconbtn light" aria-label="Tilbake" onClick={back}>
          <Icon name="back" />
        </button>
        <div className="map-title">
          <b>
            {state.from} → {state.to}
          </b>
          <small>{day !== null ? `Dag ${day} · ${dayPlan(route, day)?.title}` : `Hele turen · ${totalStops(state, route)} stopp`}</small>
        </div>
      </div>
      <div className="map-chips">
        <button className={`chip ${day === null ? 'on' : ''}`} onClick={() => selectDay(null)}>
          Hele turen
        </button>
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => (
          <button key={d} className={`chip ${day === d ? 'on' : ''}`} onClick={() => selectDay(d)}>
            Dag {d}
          </button>
        ))}
        <button className={`chip ${showSuggestions ? 'on' : ''}`} aria-pressed={showSuggestions} onClick={() => setShowSuggestions((s) => !s)}>
          <Icon name="plus" /> Forslag
        </button>
      </div>
      <button className="iconbtn light locate" aria-label="Vis min posisjon" onClick={locate}>
        <Icon name="locate" />
      </button>
    </div>
  );
}
