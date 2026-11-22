import { StopListItem } from '../components/StopListItem';
import { useTrip } from '../context/TripContext';
import { getStop } from '../data/stops';

export function SavedPage() {
  const { state } = useTrip();
  const stops = state.saved.map(getStop).filter((s) => s !== undefined);

  return (
    <>
      <div className="plain-h">
        <h1 className="display">Lagret</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Steder du vil huske til neste tur.
        </p>
      </div>
      <div className="list" style={{ paddingTop: 8 }}>
        {stops.length ? (
          stops.map((s) => <StopListItem key={s.id} stop={s} />)
        ) : (
          <div className="empty">Trykk på bokmerket på et stopp for å lagre det her.</div>
        )}
      </div>
      <div className="spacer" />
    </>
  );
}
