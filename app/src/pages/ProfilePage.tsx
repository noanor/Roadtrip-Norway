import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';

export function ProfilePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="plain-h">
        <h1 className="display">Profil</h1>
      </div>
      <div className="pad" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16 }}>
        <span className="avatar" style={{ width: 52, height: 52, fontSize: 16 }}>
          G
        </span>
        <div>
          <b>Gjest</b>
          <div className="muted" style={{ fontSize: 12 }}>
            Logg inn for å synkronisere rutene dine
          </div>
        </div>
      </div>
      <div className="menu">
        <button onClick={() => navigate('/rute')}>
          <Icon name="route" />
          <span>Mine ruter</span>
          <Icon name="chev" />
        </button>
        <button onClick={() => navigate('/lagret')}>
          <Icon name="bookmark" />
          <span>Lagrede steder</span>
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
