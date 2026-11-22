import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useTrip } from '../context/TripContext';
import { STOPS } from '../data/stops';
import { useBack } from '../hooks/useBack';

const timeFormat = new Intl.DateTimeFormat('nb-NO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

export function NotificationsPage() {
  const { state, dispatch } = useTrip();
  const navigate = useNavigate();
  const back = useBack('/');
  // what was unread when the page opened stays highlighted while it is open
  const [unread] = useState(() => new Set(state.notifications.filter((n) => !n.read).map((n) => n.id)));

  useEffect(() => {
    if (state.notifications.some((n) => !n.read)) dispatch({ type: 'markNotificationsRead' });
  }, [state.notifications, dispatch]);

  return (
    <>
      <div className="topbar">
        <button className="iconbtn light" aria-label="Tilbake" onClick={back}>
          <Icon name="back" />
        </button>
      </div>
      <div className="plain-h" style={{ paddingTop: 0 }}>
        <h1 className="display">Varsler</h1>
      </div>
      <div className="notes">
        {state.notifications.length === 0 ? (
          <div className="empty">Ingen varsler ennå. Når en eier svarer på et spørsmål fra deg, dukker svaret opp her.</div>
        ) : (
          state.notifications.map((n) => (
            <button key={n.id} className={`note-item ${unread.has(n.id) ? 'unread' : ''}`} onClick={() => navigate(`/stopp/${n.stopId}`)}>
              <b>{STOPS[n.stopId].name} har svart</b>
              <small>
                Du spurte: {n.question} · {timeFormat.format(new Date(n.at))}
              </small>
              <p>{n.answer}</p>
            </button>
          ))
        )}
      </div>
      <div className="spacer" />
    </>
  );
}
