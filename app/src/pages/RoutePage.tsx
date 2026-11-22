import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useBack } from '../hooks/useBack';
import { TripMap } from '../components/map/TripMap';
import { useTripMap } from '../components/map/useTripMap';
import { StopListItem, SuggestionItem } from '../components/StopListItem';
import { useToast } from '../context/ToastContext';
import { useTrip } from '../context/TripContext';
import { INTERESTS } from '../data/catalog';
import { STOPS } from '../data/stops';
import {
  dayCount,
  dayRange,
  dayStops,
  daySuggestions,
  dayTitle,
  driveMinutes,
  matchesInterests,
  MAX_DAYS,
  totalStops,
  tripDays,
  unmetInterests,
  viaPlaces,
} from '../domain/trip';
import { formatDuration, sumLegs } from '../services/routing';
import { NoRoute } from '../components/NoRoute';
import type { RouteTemplate } from '../types';

export function RoutePage() {
  const { route } = useTrip();
  return route ? <RouteView route={route} /> : <NoRoute />;
}

function RouteView({ route }: { route: RouteTemplate }) {
  const { state, dispatch } = useTrip();
  const navigate = useNavigate();
  const back = useBack('/');
  const toast = useToast();
  // arriving from the interests step: the last step of planning
  const lastStep = (useLocation().state as { step?: number } | null)?.step === 3;
  const [onlyServing, setOnlyServing] = useState(false);
  const days = dayCount(state, route);
  const plans = tripDays(state, route);
  const day = Math.min(state.activeDay, days);
  const plan = plans[day - 1];
  const map = useTripMap(route, day);

  // Real driving numbers once the routing service has answered, the planned ones until then.
  // The trip total is the sum of the days as shown, so the numbers always add up.
  const real = map.drivingRoute;
  const numbers = plans.map((p) => {
    if (!real) return { km: p.km, minutes: driveMinutes(state, p.minutes) };
    const [from, to] = dayRange(map.points, p.day, days);
    const sum = sumLegs(real, from, to);
    return { km: Math.round(sum.km), minutes: driveMinutes(state, sum.minutes) };
  });
  const totalKm = numbers.reduce((n, d) => n + d.km, 0);
  const tripLabel = real ? `${totalKm} km kjørevei` : `ca. ${totalKm} km`;
  const tooLong = (d: number) => numbers[d - 1].minutes > state.maxDriveHours * 60;
  const via = viaPlaces(state);
  // a trip the app planned is cut again for the new number of days; a hand-picked one has a fixed number
  const canAddDay = days < MAX_DAYS && (route.auto ? route.days.length === days : days < route.days.length);

  const stops = dayStops(state, route, day);
  const allSuggestions = daySuggestions(state, route, day);
  const canFilterServing = allSuggestions.some((id) => STOPS[id].serving);
  const suggestions = onlyServing && canFilterServing ? allSuggestions.filter((id) => STOPS[id].serving) : allSuggestions;
  const unmet = unmetInterests(state, route).map((id) => INTERESTS.find((i) => i.id === id)?.label ?? id);

  const withDays = state.flexible;

  const remove = (id: string) => {
    dispatch({ type: 'removeStop', stopId: id });
    toast(`${STOPS[id].name} er fjernet fra ${withDays ? `dag ${day}` : 'ruten'}`);
  };

  return (
    <>
      <div className="route-head">
        <button className="iconbtn light" aria-label="Tilbake" onClick={back}>
          <Icon name="back" />
        </button>
        <div className="grow">
          {lastStep && <span className="step">Steg 3 av 3</span>}
          <h1 className="display">
            {route.from} → {route.to}
          </h1>
          <div className="sub">
            {via.length > 0 && <>via {via.join(', ')} · </>}
            {withDays ? `${days} ${days > 1 ? 'dager' : 'dag'}` : 'Uten dagsplan'} · {tripLabel} · {totalStops(state, route)} stopp · {state.vehicle}
          </div>
        </div>
        <button className="iconbtn light" aria-label={withDays ? 'Endre fra, til og dager' : 'Endre fra og til'} onClick={() => navigate('/')}>
          <Icon name="edit" />
        </button>
      </div>

      <div className="mapwrap">
        <TripMap
          mode="route"
          day={day}
          points={map.points}
          range={map.range}
          suggestions={map.suggestions}
          route={map.drivingRoute}
          startLabel={map.startLabel}
          endLabel={map.endLabel}
          onOpenStop={map.onOpenStop}
          onAddStop={map.onAddStop}
        />
        <button className="maplabel" onClick={() => navigate('/rute/kart')}>
          <Icon name="expand" /> Åpne kart
        </button>
      </div>

      {withDays ? (
        <>
      <div className="days" role="tablist">
        {plans.map((p) => (
          <button
            key={p.day}
            role="tab"
            aria-selected={p.day === day}
            className={`day ${p.day === day ? 'on' : ''}`}
            title={tooLong(p.day) ? `Over ${state.maxDriveHours} timer kjøring` : undefined}
            onClick={() => dispatch({ type: 'setActiveDay', day: p.day })}
          >
            Dag {p.day}
            {tooLong(p.day) && <span className="dot" />}
          </button>
        ))}
      </div>
      <div className="dayinfo">
        <b>
          Dag {day} · {dayTitle(plan)}
        </b>
        <span>
          {numbers[day - 1].km} km · {formatDuration(numbers[day - 1].minutes)} kjøring
        </span>
      </div>
        </>
      ) : (
        <div className="dayinfo whole">
          <b>Hele turen</b>
          <span>
            {numbers[0].km} km · {formatDuration(numbers[0].minutes)} kjøring
          </span>
        </div>
      )}

      {withDays && tooLong(day) && (
        <div className="warnbox" role="note">
          <Icon name="warn" />
          <span>
            Lang kjøredag: over {state.maxDriveHours} timer bak rattet{state.vehicle !== 'Bil' && state.vehicle !== 'MC' ? ` med ${state.vehicle.toLowerCase()}` : ''}.{' '}
            {canAddDay ? (
              <>
                <button
                  onClick={() => {
                    dispatch({ type: 'changeDays', delta: 1 });
                    toast(`Turen er nå ${days + 1} dager`);
                  }}
                >
                  Legg til en dag
                </button>{' '}
                eller{' '}
              </>
            ) : (
              'Fjern et stopp eller '
            )}
            <button onClick={() => navigate('/innstillinger')}>endre grensen</button>
          </span>
        </div>
      )}

      {route.auto && (
        <p className="note">
          {allSuggestions.length + stops.length === 0
            ? 'Vi har ingen stopp i katalogen langs denne veien ennå.'
            : withDays
              ? 'Dagsplanen er laget automatisk med stopp vi kjenner langs veien.'
              : 'Forslagene er stopp vi kjenner langs veien.'}
        </p>
      )}

      {unmet.length > 0 && <p className="note">Vi har ingen stopp for {unmet.join(' eller ')} langs denne ruten ennå.</p>}

      <div className="list">
        {stops.length === 0 && (
          <div className="empty">
            {withDays ? 'Ingen stopp denne dagen ennå. Legg til fra forslagene under.' : 'Ingen stopp valgt ennå. Trykk + på forslagene under for å legge dem til.'}
          </div>
        )}
        {stops.map((id, i) => (
          <StopListItem
            key={id}
            stop={STOPS[id]}
            number={i + 1}
            from="route"
            highlight={state.lastAdded === id}
            onRemove={() => remove(id)}
            badge={
              state.added.includes(id)
                ? { text: 'Lagt til av deg', tone: 'g' }
                : matchesInterests(state, id)
                  ? { text: 'Passer dine interesser', tone: 'y' }
                  : undefined
            }
          />
        ))}
      </div>

      {allSuggestions.length > 0 && (
        <>
          <div className="section-h sub">
            <h2>Forslag langs veien</h2>
          </div>
          {canFilterServing && (
            <div className="filterchips">
              <button className={`chip ${onlyServing ? '' : 'on'}`} aria-pressed={!onlyServing} onClick={() => setOnlyServing(false)}>
                Alle
              </button>
              <button className={`chip ${onlyServing ? 'on' : ''}`} aria-pressed={onlyServing} onClick={() => setOnlyServing(true)}>
                Spisesteder
              </button>
            </div>
          )}
          <div className="list">
            {suggestions.map((id) => (
              <SuggestionItem key={id} stop={STOPS[id]} match={matchesInterests(state, id)} onAdd={() => map.onAddStop(id)} />
            ))}
          </div>
        </>
      )}

      {withDays && day < days && (
        <div className="pad foot">
          <button
            className="btn-outline"
            onClick={() => {
              dispatch({ type: 'setActiveDay', day: day + 1 });
              document.querySelector('.screen')?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Fortsett til dag {day + 1} <Icon name="arrow" />
          </button>
        </div>
      )}

      {/* floats at the bottom of the screen, so saving never needs scrolling */}
      <div className="sticky-foot">
        <button
          className="cta"
          onClick={() => {
            const update = state.currentTripId !== null;
            dispatch({ type: 'saveTrip', id: `trip_${Date.now()}`, savedAt: new Date().toISOString() });
            toast(update ? 'Den lagrede ruten er oppdatert' : 'Ruten er lagret under Ruter');
          }}
        >
          {state.currentTripId ? 'Lagre endringene' : 'Lagre ruten'} <Icon name="check" />
        </button>
      </div>
    </>
  );
}
