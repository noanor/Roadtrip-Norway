import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useBack } from '../hooks/useBack';
import { useTrip } from '../context/TripContext';
import { INTERESTS } from '../data/catalog';

export function InterestsPage() {
  const { state, dispatch } = useTrip();
  const navigate = useNavigate();
  const back = useBack('/');
  const count = state.interests.length;

  return (
    <>
      <div className="topbar">
        <button className="iconbtn light" aria-label="Tilbake" onClick={back}>
          <Icon name="back" />
        </button>
        <span className="step">
          Steg 2 av 3
        </span>
      </div>
      <div className="progress">
        <i />
      </div>
      <div className="pad intro">
        <h1 className="display">
          Hva vil dere oppleve på turen?
        </h1>
        <p className="muted lead">
          Velg så mange du vil. Vi foreslår stopp langs {state.from} → {state.to} som passer dere.
        </p>
      </div>
      <div className="int-grid">
        {INTERESTS.map((i) => {
          const on = state.interests.includes(i.id);
          return (
            <button key={i.id} className={`int ${on ? 'on' : ''}`} aria-pressed={on} onClick={() => dispatch({ type: 'toggleInterest', id: i.id })}>
              <Icon name={i.icon} />
              <span>{i.label}</span>
              <span className="tick">{on && <Icon name="check" />}</span>
            </button>
          );
        })}
      </div>
      <div className="sticky-foot">
        <button
          className="cta"
          disabled={count === 0}
          onClick={() => {
            dispatch({ type: 'setActiveDay', day: 1 });
            navigate('/rute', { state: { step: 3 } });
          }}
        >
          Vis forslag til rute ({count} valgt) <Icon name="arrow" />
        </button>
      </div>
    </>
  );
}
