import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';

/** Shown instead of a trip when there is no planned trip between the chosen places. */
export function NoRoute() {
  const { state } = useTrip();
  const navigate = useNavigate();
  return (
    <div className="plain-h">
      <h1 className="display">Ingen ferdig tur ennå</h1>
      <p className="muted" style={{ lineHeight: 1.5 }}>
        Vi har ikke laget en tur fra {state.from || '…'} til {state.to || '…'} ennå. Velg en av de populære turene på forsiden.
      </p>
      <button className="cta" onClick={() => navigate('/')}>
        Til forsiden
      </button>
    </div>
  );
}
