import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useBack } from '../hooks/useBack';

export function PricingPage() {
  const navigate = useNavigate();
  const back = useBack('/profil');

  return (
    <>
      <div className="topbar">
        <button className="iconbtn light" aria-label="Tilbake" onClick={back}>
          <Icon name="back" />
        </button>
      </div>
      <div className="plain-h" style={{ paddingTop: 0 }}>
        <h1 className="display">Pris og annonser</h1>
      </div>
      <div className="textpage">
        <div className="card">
          <b>Gratis for reisende</b>
          <p>Det koster ingenting å planlegge ruter, lagre steder og se stopp i appen.</p>
        </div>
        <div className="card">
          <b>Slik tjener vi penger</b>
          <p>
            Lokale bedrifter kan betale for å bli fremhevet i forslagene. Disse stedene er alltid merket{' '}
            <span className="badge ad" style={{ margin: 0 }}>
              Annonse
            </span>{' '}
            og legges aldri inn i ruten din uten at du velger det selv.
          </p>
        </div>
        <button className="owner-link" onClick={() => navigate('/for-aktorer')}>
          <Icon name="store" />
          <span>Driver du et sted langs veien? Se priser for bedrifter.</span>
          <Icon name="chev" />
        </button>
      </div>
    </>
  );
}
