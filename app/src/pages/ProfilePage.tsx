import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useToast } from '../context/ToastContext';
import { useTrip } from '../context/TripContext';

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export function ProfilePage() {
  const { state, dispatch } = useTrip();
  const navigate = useNavigate();
  const toast = useToast();
  const { profile } = state;
  const [signingIn, setSigningIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const signIn = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'signIn', profile: { name, email } });
    setSigningIn(false);
    toast(`Velkommen, ${name.trim().split(/\s+/)[0]}`);
  };

  return (
    <>
      <div className="plain-h">
        <h1 className="display">Profil</h1>
      </div>
      <div className="pad" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16 }}>
        <span className="avatar" style={{ width: 52, height: 52, fontSize: 16 }}>
          {profile ? initials(profile.name) : 'G'}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <b>{profile ? profile.name : 'Gjest'}</b>
          <div className="muted" style={{ fontSize: 12 }}>
            {profile ? profile.email : 'Rutene lagres på denne enheten'}
          </div>
        </div>
        {profile ? (
          <button className="btn-outline" style={{ width: 'auto', padding: '10px 14px' }} onClick={() => dispatch({ type: 'signOut' })}>
            Logg ut
          </button>
        ) : (
          !signingIn && (
            <button className="btn-outline" style={{ width: 'auto', padding: '10px 14px' }} onClick={() => setSigningIn(true)}>
              Logg inn
            </button>
          )
        )}
      </div>

      {!profile && signingIn && (
        <form className="signin" onSubmit={signIn}>
          <input autoFocus required aria-label="Navn" placeholder="Navn" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input
            required
            type="email"
            aria-label="E-post"
            placeholder="E-post"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="help" style={{ margin: 0 }}>
            Prototype: navnet og e-posten lagres bare på denne enheten.
          </p>
          <button className="cta" type="submit">
            Logg inn
          </button>
        </form>
      )}

      <div className="menu">
        <button onClick={() => navigate('/ruter')}>
          <Icon name="route" />
          <span>Mine ruter</span>
          <Icon name="chev" />
        </button>
        <button onClick={() => navigate('/lagret')}>
          <Icon name="bookmark" />
          <span>Lagrede steder</span>
          <Icon name="chev" />
        </button>
        <button onClick={() => navigate('/varsler')}>
          <Icon name="bell" />
          <span>Varsler</span>
          <Icon name="chev" />
        </button>
        <button onClick={() => navigate('/pris')}>
          <Icon name="tag" />
          <span>Pris og annonser</span>
          <Icon name="chev" />
        </button>
        <button onClick={() => navigate('/innstillinger')}>
          <Icon name="settings" />
          <span>Innstillinger</span>
          <Icon name="chev" />
        </button>
      </div>
      <div className="pad" style={{ paddingTop: 16 }}>
        <button className="owner-link" style={{ width: '100%' }} onClick={() => navigate('/for-aktorer')}>
          <Icon name="store" />
          <span>For lokale aktører: bli synlig for bilturister</span>
          <Icon name="chev" />
        </button>
      </div>
    </>
  );
}
