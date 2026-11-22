import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useToast } from '../context/ToastContext';
import { useTrip } from '../context/TripContext';
import { findRoute } from '../data/routes';
import { dayCount, totalStops, type SavedTrip, type TripState } from '../domain/trip';

const dateFormat = new Intl.DateTimeFormat('nb-NO', { day: 'numeric', month: 'short' });

/** «3 dager · 7 stopp», worked out the same way as on the route page. */
function tripSummary(state: TripState, trip: SavedTrip): string {
  const route = findRoute(trip.from, trip.to);
  if (!route) return `${trip.days} ${trip.days > 1 ? 'dager' : 'dag'}`;
  const s = { ...state, ...trip };
  const days = dayCount(s, route);
  const length = trip.flexible ? `${days} ${days > 1 ? 'dager' : 'dag'}` : 'Uten dagsplan';
  return `${length} · ${totalStops(s, route)} stopp · ${trip.vehicle}`;
}

export function TripsPage() {
  const { state, dispatch, route } = useTrip();
  const navigate = useNavigate();
  const toast = useToast();
  const [confirming, setConfirming] = useState<string | null>(null);
  const currentIsSaved = state.currentTripId !== null;

  const open = (id: string) => {
    dispatch({ type: 'openTrip', id });
    navigate('/rute');
  };

  return (
    <>
      <div className="plain-h">
        <h1 className="display">Mine ruter</h1>
      </div>

      {route && !currentIsSaved && (
        <div className="pad lead-card">
          <button className="trip-card current" onClick={() => navigate('/rute')}>
            <span className="txt">
              <small>Turen du planlegger nå · ikke lagret</small>
              <b>
                {route.from} → {route.to}
              </b>
            </span>
            <Icon name="chev" />
          </button>
        </div>
      )}

      <div className="trips">
        {state.savedTrips.length === 0 ? (
          <div className="empty">Ingen lagrede ruter ennå. Planlegg en tur og trykk «Lagre ruten» på siste dag.</div>
        ) : (
          state.savedTrips.map((trip) =>
            confirming === trip.id ? (
              <div key={trip.id} className="trip-card confirm" role="group" aria-label={`Slette ${trip.from} → ${trip.to}?`}>
                <span className="txt">
                  <b>Slette {trip.from} → {trip.to}?</b>
                  <small>Dette kan ikke angres.</small>
                </span>
                <button className="btn-outline" onClick={() => setConfirming(null)}>
                  Avbryt
                </button>
                <button
                  className="btn-danger"
                  onClick={() => {
                    dispatch({ type: 'deleteTrip', id: trip.id });
                    setConfirming(null);
                    toast('Ruten er slettet');
                  }}
                >
                  Slett
                </button>
              </div>
            ) : (
              <div key={trip.id} className={`trip-card ${trip.id === state.currentTripId ? 'current' : ''}`}>
                <button className="txt" onClick={() => open(trip.id)}>
                  {trip.id === state.currentTripId && <small>Åpen nå</small>}
                  <b>
                    {trip.from} → {trip.to}
                  </b>
                  <small>
                    {tripSummary(state, trip)} · lagret {dateFormat.format(new Date(trip.savedAt))}
                  </small>
                </button>
                <button className="rmmini" aria-label={`Slett ${trip.from} → ${trip.to}`} onClick={() => setConfirming(trip.id)}>
                  <Icon name="close" />
                </button>
              </div>
            ),
          )
        )}
      </div>
      <div className="spacer" />
    </>
  );
}
