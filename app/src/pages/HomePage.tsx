import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { StopArt } from '../components/StopArt';
import { useToast } from '../context/ToastContext';
import { useTrip } from '../context/TripContext';
import { EXPLORE_ROUTES, POPULAR_ROUTES, VEHICLES } from '../data/catalog';
import { DAY_TRIP_IDS, STOPS } from '../data/stops';

export function HomePage() {
  const { state, dispatch } = useTrip();
  const [tab, setTab] = useState<'plan' | 'explore'>('plan');
  const navigate = useNavigate();
  const toast = useToast();

  const findRoutes = () => {
    if (!state.from.trim() || !state.to.trim()) {
      toast('Fyll inn både fra og til');
      return;
    }
    navigate('/interesser');
  };

  return (
    <>
      <div className="hero">
        <div className="topbar">
          <div className="brand">
            <span className="mark">
              <Icon name="car" />
            </span>
            Roadtrip Norway
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="iconbtn" aria-label="Varsler" onClick={() => toast('Ingen nye varsler')}>
              <Icon name="bell" />
            </button>
            <button className="iconbtn" aria-label="Profil" onClick={() => navigate('/profil')}>
              <Icon name="user" />
            </button>
          </div>
        </div>
        <h1 className="display">Planlegg bilturen din i Norge</h1>
        <p>Finn stoppene som gjør turen verdt det: lokalmat, utsikt og historie langs veien.</p>
      </div>

      <div className="planner">
        <div className="seg" role="tablist">
          <button role="tab" aria-selected={tab === 'plan'} className={tab === 'plan' ? 'on' : ''} onClick={() => setTab('plan')}>
            Planlegg rute
          </button>
          <button role="tab" aria-selected={tab === 'explore'} className={tab === 'explore' ? 'on' : ''} onClick={() => setTab('explore')}>
            Utforsk
          </button>
        </div>

        {tab === 'plan' ? (
          <>
            <div className="fields">
              <label className="field">
                <span className="lbl">Fra</span>
                <input id="from" value={state.from} onChange={(e) => dispatch({ type: 'setFrom', value: e.target.value })} aria-label="Fra" />
              </label>
              <button className="swap" aria-label="Bytt fra og til" onClick={() => dispatch({ type: 'swap' })}>
                <Icon name="swap" />
              </button>
              {state.via.map((v, i) => (
                <label className="field" key={i}>
                  <span className="lbl">Via</span>
                  <input
                    id={`via${i}`}
                    value={v}
                    placeholder="Sted underveis"
                    aria-label="Stopp underveis"
                    autoFocus={v === '' && i === state.via.length - 1}
                    onChange={(e) => dispatch({ type: 'setVia', index: i, value: e.target.value })}
                  />
                  <button aria-label="Fjern stopp" onClick={() => dispatch({ type: 'removeVia', index: i })}>
                    <Icon name="minus" />
                  </button>
                </label>
              ))}
              <label className="field">
                <span className="lbl">Til</span>
                <input id="to" value={state.to} onChange={(e) => dispatch({ type: 'setTo', value: e.target.value })} aria-label="Til" />
              </label>
            </div>
            <button className="addstop" onClick={() => dispatch({ type: 'addVia' })}>
              <Icon name="plus" /> Legg til stopp underveis
            </button>
            <div className="row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600 }}>Antall dager</span>
                <div className="stepper">
                  <button aria-label="Færre dager" onClick={() => dispatch({ type: 'changeDays', delta: -1 })}>
                    <Icon name="minus" />
                  </button>
                  <output>{state.days}</output>
                  <button aria-label="Flere dager" onClick={() => dispatch({ type: 'changeDays', delta: 1 })}>
                    <Icon name="plus" />
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600 }}>Fleksibel</span>
                <button
                  className={`toggle ${state.flexible ? 'on' : ''}`}
                  role="switch"
                  aria-checked={state.flexible}
                  aria-label="Fleksible datoer"
                  onClick={() => dispatch({ type: 'toggleFlexible' })}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="eyebrow">Biltype</span>
              <div className="chips">
                {VEHICLES.map((v) => (
                  <button
                    key={v}
                    className={`chip ${state.vehicle === v ? 'on' : ''}`}
                    aria-pressed={state.vehicle === v}
                    onClick={() => dispatch({ type: 'setVehicle', value: v })}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <button className="cta" onClick={findRoutes}>
              Finn ruter nå <Icon name="arrow" />
            </button>
          </>
        ) : (
          <div className="explore-list">
            {EXPLORE_ROUTES.map((r) => (
              <button
                key={r.title}
                className="explore-item"
                onClick={() => {
                  dispatch({ type: 'setRoute', from: r.from, to: r.to });
                  navigate('/interesser');
                }}
              >
                <span className="art">
                  <StopArt kind={r.art} />
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <b>{r.title}</b>
                  <span>{r.subtitle}</span>
                </span>
                <Icon name="chev" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="section-h">
        <h2>Populære ruter</h2>
      </div>
      <div className="hscroll">
        {POPULAR_ROUTES.map(([from, to]) => (
          <button
            key={`${from}-${to}`}
            className="chip"
            onClick={() => {
              dispatch({ type: 'setRoute', from, to });
              setTab('plan');
              toast(`${from} → ${to} er fylt inn`);
            }}
          >
            {from} → {to}
          </button>
        ))}
      </div>

      <div className="section-h">
        <h2>Perfekt for en dag</h2>
        <span className="muted" style={{ fontSize: 12 }}>
          Fra Oslo
        </span>
      </div>
      <div className="hscroll">
        {DAY_TRIP_IDS.map((id) => (
          <button key={id} className="daycard" onClick={() => navigate(`/stopp/${id}`)}>
            <div className="art">
              <StopArt kind={STOPS[id].art} />
            </div>
            <div className="t">
              {STOPS[id].name}
              <small>{STOPS[id].travelHint}</small>
            </div>
          </button>
        ))}
      </div>
      <div className="spacer" />
    </>
  );
}
