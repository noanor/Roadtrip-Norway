import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useBack } from '../hooks/useBack';
import { StopMap } from '../components/map/StopMap';
import { StopArt } from '../components/StopArt';
import { useToast } from '../context/ToastContext';
import { useTrip } from '../context/TripContext';
import { getStop } from '../data/stops';
import { dayOfStop, isOnRoute } from '../domain/trip';
import { askOwner, getReviews } from '../services/api';
import type { Review } from '../types';

export function StopDetailPage() {
  const { stopId = '' } = useParams();
  const stop = getStop(stopId);
  const { state, dispatch, route } = useTrip();
  const navigate = useNavigate();
  const back = useBack('/rute');
  const location = useLocation();
  const toast = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [question, setQuestion] = useState<'idle' | 'writing' | 'sending' | 'sent'>('idle');
  const [questionText, setQuestionText] = useState('');

  useEffect(() => {
    let active = true;
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

  const day = dayOfStop(route, stop.id);
  const added = isOnRoute(state, route, stop.id);
  const saved = state.saved.includes(stop.id);
  const cameFromRoute = (location.state as { from?: string } | null)?.from === 'route';

  const toggleSaved = () => {
    dispatch({ type: 'toggleSaved', stopId: stop.id });
    toast(saved ? 'Fjernet fra lagret' : 'Lagret');
  };

  const addToRoute = () => {
    if (day === null) return;
    dispatch({ type: 'addStop', stopId: stop.id, day });
    toast(`${stop.name} er lagt til dag ${day}`);
    // Figma flow: Stoppdetaljer → Rute & Kart 2
    if (cameFromRoute) navigate(-1);
    else navigate('/rute');
  };

  const submitQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setQuestion('sending');
    await askOwner(stop.id, questionText);
    setQuestion('sent');
  };

  return (
    <>
      <div className="d-hero">
        <StopArt kind={stop.art} />
        <div className="tools">
          <button className="iconbtn light" aria-label="Tilbake" onClick={back}>
            <Icon name="back" />
          </button>
          <button className="iconbtn light" aria-label={saved ? 'Fjern fra lagret' : 'Lagre'} onClick={toggleSaved}>
            <Icon name="bookmark" />
          </button>
        </div>
      </div>

      <div className="d-body">
        {stop.recommended && (
          <span className="badge y" style={{ alignSelf: 'flex-start', margin: 0 }}>
            Anbefalt stopp
          </span>
        )}
        <div>
          <h1 className="display">{stop.name}</h1>
          <div className="rating" style={{ marginTop: 6 }}>
            <Icon name="star" />
            <b style={{ color: 'var(--ink)' }}>{String(stop.rating).replace('.', ',')}</b> ({stop.reviewCount}) · {stop.type} · {stop.place}
          </div>
        </div>

        <div className="d-actions">
          {day === null ? (
            <button
              className="cta green"
              onClick={() => {
                dispatch({ type: 'setRoute', from: 'Oslo', to: stop.place });
                toast(`Dagstur til ${stop.place} er klar til planlegging`);
                navigate('/');
              }}
            >
              <Icon name="route" /> Planlegg dagstur hit
            </button>
          ) : added ? (
            <button
              className="cta green"
              onClick={() => {
                dispatch({ type: 'setActiveDay', day });
                navigate('/rute');
              }}
            >
              <Icon name="check" /> Lagt til i ruten
            </button>
          ) : (
            <button className="cta green" onClick={addToRoute}>
              <Icon name="plus" /> Legg til rute
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
            <small>Pris</small>
            <b>{stop.price}</b>
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            Fra følgere
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {reviews.map((r) => (
              <div className="review" key={r.author}>
                <header>
                  <span className="avatar">{r.initials}</span>
                  {r.author}
                  <span className="muted" style={{ fontWeight: 500, marginLeft: 'auto' }}>
                    <Icon name="star" /> {r.rating}
                  </span>
                </header>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ask">
          {question === 'sent' ? (
            <div className="review">
              <b>Spørsmålet er sendt</b>
              <p className="muted">{stop.name} svarer vanligvis innen en dag. Svaret dukker opp her.</p>
            </div>
          ) : question === 'idle' ? (
            <button className="btn-outline" onClick={() => setQuestion('writing')}>
              Spørsmål til eieren?
            </button>
          ) : (
            <form onSubmit={submitQuestion} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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

        <button className="owner-link" onClick={() => navigate('/for-aktorer')}>
          <Icon name="store" />
          <span>Driver du et sted langs veien? Bli synlig for bilturister.</span>
          <Icon name="chev" />
        </button>
      </div>
    </>
  );
}
