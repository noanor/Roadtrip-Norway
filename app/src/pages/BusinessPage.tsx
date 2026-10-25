import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useBack } from '../hooks/useBack';
import { BUSINESS_PLANS, BUSINESS_TYPES } from '../data/catalog';
import { registerBusiness } from '../services/api';
import type { BusinessPlanId } from '../types';

export function BusinessPage() {
  const navigate = useNavigate();
  const back = useBack('/');
  const [plan, setPlan] = useState<BusinessPlanId>('fremhevet');
  const [name, setName] = useState('');
  const [type, setType] = useState(BUSINESS_TYPES[0]);
  const [place, setPlace] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await registerBusiness({ name, type, place, plan });
    setStatus('done');
  };

  return (
    <>
      <div className="biz-hero">
        <div className="topbar">
          <button className="iconbtn" aria-label="Tilbake" onClick={back}>
            <Icon name="back" />
          </button>
        </div>
        <div className="eyebrow">For lokale aktører</div>
        <h1 className="display">Bli oppdaget av bilturister langs veien</h1>
        <p>
          Reisende planlegger stoppene sine før de setter seg i bilen. Sørg for at kafeen, gårdsbutikken eller campingplassen din er med.
        </p>
      </div>

      {status === 'done' ? (
        <div className="success">
          <span className="ok">
            <Icon name="check" />
          </span>
          <h2 className="display" style={{ fontSize: 24 }}>
            Takk, vi har mottatt registreringen
          </h2>
          <p className="muted" style={{ margin: 0, lineHeight: 1.5 }}>
            Vi går gjennom bedriften og tar kontakt innen to virkedager. Valgt pakke:{' '}
            <b style={{ color: 'var(--ink)' }}>{BUSINESS_PLANS.find((p) => p.id === plan)?.title}</b>.
          </p>
          <button className="btn-outline" onClick={() => navigate('/')}>
            Tilbake til forsiden
          </button>
        </div>
      ) : (
        <>
          <div className="benefits">
            <Benefit icon="pin" title="Bli et stopp i rutene" text="Stedet ditt foreslås når noen planlegger en tur forbi." />
            <Benefit icon="eye" title="Synlig for riktige reisende" text="Vi matcher deg med folk som har valgt interesser som lokalmat eller historie." />
            <Benefit icon="clock" title="Enkelt oppsett" text="Legg inn åpningstider og bilder på et par minutter." />
          </div>

          <div className="section-h">
            <h2>Velg synlighet</h2>
          </div>
          <div className="plans" role="radiogroup">
            {BUSINESS_PLANS.map((p) => (
              <button key={p.id} className={`plan ${plan === p.id ? 'on' : ''}`} role="radio" aria-checked={plan === p.id} onClick={() => setPlan(p.id)}>
                <div>
                  <b>
                    {p.title}
                    {p.tag && <span className="tag">{p.tag}</span>}
                  </b>
                  <span>{p.description}</span>
                </div>
                <span className="price">{p.price}</span>
              </button>
            ))}
          </div>

          <form className="form" onSubmit={submit}>
            <label>
              Bedriftsnavn
              <input id="bizName" required placeholder="F.eks. Mjøsey Bakeri" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Type sted
              <select id="bizType" value={type} onChange={(e) => setType(e.target.value)}>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Sted
              <input id="bizPlace" required placeholder="F.eks. Kongsberg" value={place} onChange={(e) => setPlace(e.target.value)} />
            </label>
            <button className="cta" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sender …' : 'Registrer bedriften din'} <Icon name="arrow" />
            </button>
          </form>
        </>
      )}
    </>
  );
}

function Benefit({ icon, title, text }: { icon: 'pin' | 'eye' | 'clock'; title: string; text: string }) {
  return (
    <div className="benefit">
      <span className="bi">
        <Icon name={icon} />
      </span>
      <div>
        <b>{title}</b>
        <span>{text}</span>
      </div>
    </div>
  );
}
