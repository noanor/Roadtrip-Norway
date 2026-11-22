import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { StopArt } from '../components/StopArt';
import { useToast } from '../context/ToastContext';
import { useTrip } from '../context/TripContext';
import { EXPLORE_ROUTES, knownPlace, PLACE_NAMES, VEHICLES } from '../data/catalog';
import { DAY_TRIP_IDS, STOPS } from '../data/stops';
import { MAX_DAYS, MIN_DAYS, unknownPlaces, unreadCount } from '../domain/trip';
import logo from '../assets/logo.png';
import wordmark from '../assets/wordmark.png';

// One task per screen: the planner asks only where and how long. Vehicle and day plan are
// tucked under «Flere valg» with their current values in the summary, so nothing is hidden.
export function HomePage() {
  const { state, dispatch, route } = useTrip();
  const navigate = useNavigate();
  const toast = useToast();
  const unread = unreadCount(state);
  const [moreOpen, setMoreOpen] = useState(false);
  const bothKnown = !!knownPlace(state.from) && !!knownPlace(state.to);
  const noTrip = bothKnown && !route;

  const next = () => {
    if (!state.from.trim() || !state.to.trim()) {
      toast('Fyll inn både fra og til');
      return;
    }
    const unknown = unknownPlaces(state);
    if (unknown.length) {
      toast(`Vi kjenner ikke igjen «${unknown[0]}». Velg et sted fra listen.`);
      return;
    }
    if (!route) {
      toast('Vi har ingen ferdig tur mellom disse stedene ennå');
      return;
    }
    // the names as the trip spells them, so headings read «Oslo», not «oslo »
    dispatch({ type: 'setRoute', from: route.from, to: route.to });
    navigate('/interesser');
  };

  const summary = `${state.vehicle} · ${state.flexible ? 'kan legge til en dag' : 'låst antall dager'}`;

  return (
    <>
      <div className="hero">
        <div className="topbar">
          <div className="brand">
            <img className="logo" src={logo} alt="" />
            <img className="wordmark" src={wordmark} alt="Roadtrip Norway" />
          </div>
          <button className="iconbtn bell" aria-label={unread ? `Varsler, ${unread} nye` : 'Varsler'} onClick={() => navigate('/varsler')}>
            <Icon name="bell" />
            {unread > 0 && <span className="badge-dot" />}
          </button>
        </div>
        <h1 className="display">Planlegg bilturen din i Norge</h1>
        <p>Finn stoppene som gjør turen verdt det: lokalmat, utsikt og historie langs veien.</p>
      </div>

      <section className="planner" aria-labelledby="plannerTitle">
        <div className="planner-h">
          <h2 id="plannerTitle">Hvor skal dere?</h2>
          <span className="muted">Steg 1 av 3</span>
        </div>

        <div className="fields">
          <label className="field">
            <span className="lbl">Fra</span>
            <input id="from" list="places" autoComplete="off" value={state.from} onChange={(e) => dispatch({ type: 'setFrom', value: e.target.value })} aria-label="Fra" />
          </label>
          <button className="swap" aria-label="Bytt fra og til" onClick={() => dispatch({ type: 'swap' })}>
            <Icon name="swap" />
          </button>
          {state.via.map((v, i) => (
            <label className="field via" key={i}>
              <span className="lbl">Via</span>
              <input
                id={`via${i}`}
                list="places"
                autoComplete="off"
                value={v}
                placeholder="Sted underveis"
                aria-label="Stopp underveis"
                autoFocus={v === '' && i === state.via.length - 1}
                onChange={(e) => dispatch({ type: 'setVia', index: i, value: e.target.value })}
              />
              <button className="rm" aria-label="Fjern stopp" onClick={() => dispatch({ type: 'removeVia', index: i })}>
                <Icon name="minus" />
              </button>
            </label>
          ))}
          <label className="field">
            <span className="lbl">Til</span>
            <input id="to" list="places" autoComplete="off" value={state.to} onChange={(e) => dispatch({ type: 'setTo', value: e.target.value })} aria-label="Til" />
          </label>
        </div>
        {noTrip && (
          <p className="note-inline" role="status">
            Vi har ingen ferdig tur fra {knownPlace(state.from)} til {knownPlace(state.to)} ennå. Velg en av de populære turene under.
          </p>
        )}
        <datalist id="places">
          {PLACE_NAMES.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
        <button className="addstop" onClick={() => dispatch({ type: 'addVia' })}>
          <Icon name="plus" /> Legg til stopp underveis
        </button>

        <div className="row">
          <span className="row-label">Antall dager</span>
          <div className="stepper">
            <button aria-label="Færre dager" disabled={state.days <= MIN_DAYS} onClick={() => dispatch({ type: 'changeDays', delta: -1 })}>
              <Icon name="minus" />
            </button>
            <output>{state.days}</output>
            <button aria-label="Flere dager" disabled={state.days >= MAX_DAYS} onClick={() => dispatch({ type: 'changeDays', delta: 1 })}>
              <Icon name="plus" />
            </button>
          </div>
        </div>

        <button className="more" aria-expanded={moreOpen} aria-controls="moreOptions" onClick={() => setMoreOpen((o) => !o)}>
          <span>
            <b>Flere valg</b>
            <small>{summary}</small>
          </span>
          <Icon name="chev" className={moreOpen ? 'up' : 'down'} />
        </button>

        {moreOpen && (
          <div className="more-body" id="moreOptions">
            <div className="opt">
              <span className="row-label">Biltype</span>
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
            <div className="opt">
              <div className="row">
                <span className="row-label" id="flexLabel">
                  Ferdig dagsplan
                </span>
                <button
                  className={`toggle ${state.flexible ? 'on' : ''}`}
                  role="switch"
                  aria-checked={state.flexible}
                  aria-labelledby="flexLabel"
                  aria-describedby="flexHelp"
                  onClick={() => dispatch({ type: 'toggleFlexible' })}
                />
              </div>
              <p className="help" id="flexHelp">
                {state.flexible
                  ? 'Vi kan foreslå å legge til en dag hvis en kjøredag blir for lang.'
                  : `Turen er låst til ${state.days} ${state.days > 1 ? 'dager' : 'dag'}.`}
              </p>
            </div>
          </div>
        )}

        <button className="cta" onClick={next}>
          Neste: velg interesser <Icon name="arrow" />
        </button>
      </section>

      <div className="section-h">
        <h2>Populære turer</h2>
      </div>
      <div className="explore-list pad">
        {EXPLORE_ROUTES.map((r) => (
          <button
            key={r.title}
            className="explore-item"
            onClick={() => {
              dispatch({ type: 'setRoute', from: r.from, to: r.to });
              dispatch({ type: 'setDays', days: r.days });
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

      <div className="section-h">
        <h2>Perfekt for en dag</h2>
        <span className="muted">Fra Oslo</span>
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
