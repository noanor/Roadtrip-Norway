import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useBack } from '../hooks/useBack';
import { StopMap } from '../components/map/StopMap';
import { StopArt } from '../components/StopArt';
import { useToast } from '../context/ToastContext';
import { useTrip } from '../context/TripContext';
import { findRoute, routeWithStop } from '../data/routes';
import { getStop, priceLabel } from '../data/stops';
import { dayOfStop, isOnRoute, suitsVehicle } from '../domain/trip';
import { askOwner, getReviews, waitForOwnerAnswer } from '../services/api';
import type { Review } from '../types';

export function StopDetailPage() {
  const { stopId = '' } = useParams();
  const stop = getStop(stopId);
  const { state, dispatch, route } = useTrip();
  const navigate = useNavigate();
  const back = useBack('/rute');
  const toast = useToast();
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [question, setQuestion] = useState<'idle' | 'writing' | 'sending' | 'sent'>('idle');
  const [questionText, setQuestionText] = useState('');

  useEffect(() => {
    let active = true;
    setReviews(null);
    getReviews(stopId).then((r) => active && setReviews(r));
    return () => {
      active = false;
    };
  }, [stopId]);

  if (!stop) {
    return (
      <div className="plain-h">
        <h1 className="display">Fant ikke stoppet</h1>
        <p className="muted">
          Stoppet finnes ikke lenger. <Link to="/rute">Gå til ruten</Link>
        </p>
      </div>
    );
  }

  const day = route ? dayOfStop(state, route, stop.id) : null;
  const price = priceLabel(stop);
  const added = route ? isOnRoute(state, route, stop.id) : false;
  // Not along the current trip: offer a day trip from Oslo, or the planned trip that passes it.
  const trip = day === null ? (findRoute('Oslo', stop.place) ?? routeWithStop(stop.id)) : undefined;
  const isDayTrip = trip?.from === 'Oslo' && trip.days.length === 1;
  const saved = state.saved.includes(stop.id);
  const fits = suitsVehicle(state, stop.id);
  const answers = state.notifications.filter((n) => n.stopId === stop.id);
  const waiting = question === 'sent' && !answers.some((n) => n.question === questionText);

  const toggleSaved = () => {
    dispatch({ type: 'toggleSaved', stopId: stop.id });
    toast(saved ? 'Fjernet fra lagret' : 'Lagret');
  };

  const addToRoute = () => {
    if (day === null) return;
    dispatch({ type: 'addStop', stopId: stop.id, day });
    // stay on the page: the traveller may want to read on, save or ask the owner
    toast(`${stop.name} er lagt til ${state.flexible ? `dag ${day}` : 'i ruten'}`);
  };

  const removeFromRoute = () => {
    dispatch({ type: 'removeStop', stopId: stop.id });
    toast(`${stop.name} er fjernet fra ruten`);
  };

  const submitQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setQuestion('sending');
    const asked = questionText;
    await askOwner(stop.id, asked);
    setQuestion('sent');
    // Keeps waiting after the traveller leaves the page: the answer arrives as a notification.
    waitForOwnerAnswer(stop.id, stop.name, asked).then((answer) => {
      dispatch({
        type: 'addNotification',
        notification: { id: `n_${Date.now()}`, stopId: stop.id, question: asked, answer, at: new Date().toISOString(), read: false },
      });
      toast(`${stop.name} har svart på spørsmålet ditt`);
    });
  };

  return (
    <>
      <div className="d-hero">
        <StopArt kind={stop.art} />
        <div className="tools">
          <button className="iconbtn light" aria-label="Tilbake" onClick={back}>
            <Icon name="back" />
          </button>
        </div>
      </div>

      <div className="d-body">
        {stop.sponsored && (
          <div>
            <span className="badge ad flat">
              Annonse
            </span>
            <p className="adnote">
              Stedet betaler for å bli fremhevet. <button onClick={() => navigate('/pris')}>Les mer</button>
            </p>
          </div>
        )}
        <div>
          <h1 className="display">{stop.name}</h1>
          <div className="rating">
            <Icon name="star" />
            <b className="ink">{String(stop.rating).replace('.', ',')}</b> ({stop.reviewCount}) · {stop.type} · {stop.place}
          </div>
        </div>

        <div className="d-actions">
          {!fits ? (
            <button className="cta green" disabled>
              <Icon name="warn" /> Passer ikke for {state.vehicle.toLowerCase()}
            </button>
          ) : day === null ? (
            trip && (
              <button
                className="cta green"
                onClick={() => {
                  dispatch({ type: 'setRoute', from: trip.from, to: trip.to });
                  dispatch({ type: 'setDays', days: trip.days.length });
                  navigate('/interesser');
                }}
              >
                <Icon name="route" /> {isDayTrip ? 'Planlegg dagstur hit' : `Planlegg ${trip.from} → ${trip.to}`}
              </button>
            )
          ) : added ? (
            <button className="cta outline" onClick={removeFromRoute}>
              <Icon name="close" /> Fjern fra ruten
            </button>
          ) : (
            <button className="cta green" onClick={addToRoute}>
              <Icon name="plus" /> Legg til i ruten
            </button>
          )}
          <button className={`sq ${saved ? 'on' : ''}`} aria-label={saved ? 'Fjern fra lagret' : 'Lagre'} aria-pressed={saved} onClick={toggleSaved}>
            <Icon name="bookmark" />
          </button>
        </div>

        <p className="d-desc">{stop.description}</p>
        <StopMap stop={stop} />
        <div className="facts">
          <div>
            <small>Åpent i dag</small>
            <b>{stop.openingHours}</b>
          </div>
          <div>
            <small>Fra ruten</small>
            <b>{stop.distanceFromRoute}</b>
          </div>
          <div>
            <small>{price.heading}</small>
            <b>{price.value}</b>
          </div>
        </div>

        <div>
          <div className="eyebrow label">
            Anmeldelser
            {reviews && reviews.length > 0 && ` · viser ${reviews.length} av ${stop.reviewCount}`}
          </div>
          <div className="stack">
            {reviews && reviews.length === 0 && <p className="adnote">Ingen anmeldelser å vise ennå.</p>}
            {(reviews ?? []).map((r) => (
              <div className="review" key={r.author}>
                <header>
                  <span className="avatar">{r.initials}</span>
                  {r.author}
                  <span className="muted score">
                    <Icon name="star" /> {r.rating}
                  </span>
                </header>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ask">
          {answers.map((n) => (
            <div className="review" key={n.id}>
              <b>Du spurte: {n.question}</b>
              <p>{n.answer}</p>
            </div>
          ))}
          {waiting ? (
            <div className="review">
              <b>Spørsmålet er sendt</b>
              <p className="muted">{stop.name} svarer vanligvis innen en dag. Svaret dukker opp her og under Varsler.</p>
            </div>
          ) : question === 'idle' || question === 'sent' ? (
            <button
              className="btn-outline"
              onClick={() => {
                setQuestionText('');
                setQuestion('writing');
              }}
            >
              {answers.length ? 'Nytt spørsmål til eieren?' : 'Spørsmål til eieren?'}
            </button>
          ) : (
            <form className="stack" onSubmit={submitQuestion}>
              <textarea
                id="askText"
                autoFocus
                required
                placeholder="F.eks. har dere glutenfritt brød?"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
              <button className="cta green" type="submit" disabled={question === 'sending'}>
                {question === 'sending' ? 'Sender …' : 'Send spørsmål'}
              </button>
            </form>
          )}
        </div>

      </div>
    </>
  );
}
