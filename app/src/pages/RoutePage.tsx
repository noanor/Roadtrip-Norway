import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useBack } from '../hooks/useBack';
import { TripMap } from '../components/map/TripMap';
import { useTripMap } from '../components/map/useTripMap';
import { StopListItem, SuggestionItem } from '../components/StopListItem';
import { useToast } from '../context/ToastContext';
import { useTrip } from '../context/TripContext';
import { STOPS } from '../data/stops';
import { dayCount, dayPlan, dayStops, daySuggestions, totalKm, totalStops } from '../domain/trip';
import { formatDuration, sumLegs } from '../services/routing';

export function RoutePage() {
  const { state, dispatch, route } = useTrip();
  const navigate = useNavigate();
  const back = useBack('/');
  const toast = useToast();
  const day = state.activeDay;
  const days = dayCount(state, route);
  const plan = dayPlan(route, day) ?? route.days[0];
  const map = useTripMap(day);

  // Prefer real driving numbers once the routing service has answered.
  const real = map.drivingRoute;
  const dayStats = real ? sumLegs(real, map.range[0], map.range[1]) : null;
  const totalRealKm = real ? sumLegs(real, 0, real.legs.length).km : null;
  const dayLabel = dayStats
    ? `${Math.round(dayStats.km)} km · ${formatDuration(dayStats.minutes)} kjøring`
    : `${plan.km} km · ${plan.driveTime} kjøring`;
  const tripLabel = totalRealKm !== null ? `${Math.round(totalRealKm)} km kjørevei` : `ca. ${totalKm(state, route)} km`;

  const isMatch = (id: string) => state.interests.includes(STOPS[id].interest);
  const isUserAdded = (id: string) => (state.added[day] ?? []).includes(id);

  return (
    <>
      <div className="route-head">
        <button className="iconbtn light" aria-label="Tilbake" onClick={back}>
          <Icon name="back" />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 className="display">
            {state.from} → {state.to}
          </h1>
          <div className="sub">
            {days} {days > 1 ? 'dager' : 'dag'} · {tripLabel} · {totalStops(state, route)} stopp
          </div>
        </div>
        <button className="iconbtn light" aria-label="Endre rute" onClick={() => navigate('/')}>
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

      <div className="days" role="tablist">
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => (
          <button key={d} role="tab" aria-selected={d === day} className={`day ${d === day ? 'on' : ''}`} onClick={() => dispatch({ type: 'setActiveDay', day: d })}>
            Dag {d}
          </button>
        ))}
      </div>
      <div className="dayinfo">
        Dag {day} · {plan.title} · {dayLabel}
      </div>

      <div className="list">
        {dayStops(state, route, day).map((id, i) => (
          <StopListItem
            key={id}
            stop={STOPS[id]}
            number={i + 1}
            from="route"
            highlight={state.lastAdded === id}
            badge={
              isUserAdded(id)
                ? { text: 'Lagt til av deg', tone: 'g' }
                : isMatch(id)
                  ? { text: 'Passer dine interesser', tone: 'y' }
                  : undefined
            }
          />
        ))}
      </div>

      {daySuggestions(state, route, day).length > 0 && (
        <>
          <div className="section-h" style={{ paddingTop: 18 }}>
            <h2 style={{ fontSize: 18 }}>Forslag langs veien</h2>
          </div>
          <div className="list">
            {daySuggestions(state, route, day).map((id) => (
              <SuggestionItem key={id} stop={STOPS[id]} onAdd={() => map.onAddStop(id)} />
            ))}
          </div>
        </>
      )}

      <div className="pad" style={{ paddingTop: 18, paddingBottom: 18 }}>
        {day < days ? (
          <button className="cta green" onClick={() => dispatch({ type: 'setActiveDay', day: day + 1 })}>
            Fortsett til dag {day + 1} <Icon name="arrow" />
          </button>
        ) : (
          <button className="cta" onClick={() => toast('Ruten er lagret under Mine ruter')}>
            Lagre ruten <Icon name="check" />
          </button>
        )}
      </div>
    </>
  );
}
