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
        <span className="muted" style={{ fontWeight: 600, fontSize: 12 }}>
          Steg 2 av 3
        </span>
      </div>
      <div className="progress">
        <i />
      </div>
      <div className="pad" style={{ paddingTop: 18 }}>
        <h1 className="display" style={{ fontSize: 30 }}>
          Hva vil dere oppleve på turen?
        </h1>
        <p className="muted" style={{ margin: '8px 0 0', lineHeight: 1.45 }}>
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
            navigate('/rute');
          }}
        >
          Vis forslag til rute ({count} valgt) <Icon name="arrow" />
        </button>
      </div>
    </>
  );
}
