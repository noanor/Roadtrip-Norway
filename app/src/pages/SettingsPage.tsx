import { Icon } from '../components/Icon';
import { useBack } from '../hooks/useBack';
import { useTrip } from '../context/TripContext';
import { MAX_DRIVE_HOURS, MIN_DRIVE_HOURS } from '../domain/trip';

export function SettingsPage() {
  const { state, dispatch } = useTrip();
  const back = useBack('/profil');

  return (
    <>
      <div className="topbar">
        <button className="iconbtn light" aria-label="Tilbake" onClick={back}>
          <Icon name="back" />
        </button>
      </div>
      <div className="plain-h flush">
        <h1 className="display">Innstillinger</h1>
      </div>
      <div className="textpage">
        <div className="card">
          <div className="setting">
            <b>Maks kjøring per dag</b>
            <div className="stepper">
              <button aria-label="Kortere kjøredager" disabled={state.maxDriveHours <= MIN_DRIVE_HOURS} onClick={() => dispatch({ type: 'changeMaxDrive', delta: -1 })}>
                <Icon name="minus" />
              </button>
              <output>{state.maxDriveHours} t</output>
              <button aria-label="Lengre kjøredager" disabled={state.maxDriveHours >= MAX_DRIVE_HOURS} onClick={() => dispatch({ type: 'changeMaxDrive', delta: 1 })}>
                <Icon name="plus" />
              </button>
            </div>
          </div>
          <p className="muted setting-help">
            Dager med lengre kjøretid enn dette blir markert i ruten.
          </p>
        </div>
      </div>
    </>
  );
}
