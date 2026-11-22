import { useNavigate } from 'react-router-dom';
import { distanceLabel } from '../data/stops';
import type { Stop } from '../types';
import { Icon } from './Icon';
import { StopArt } from './StopArt';

interface Props {
  stop: Stop;
  number?: number;
  badge?: { text: string; tone: 'y' | 'g' };
  highlight?: boolean;
  /** Passed as router state so the detail page knows where the traveller came from. */
  from?: 'route';
  /** When set, a remove button is shown instead of the arrow. */
  onRemove?: () => void;
}

export function StopListItem({ stop, number, badge, highlight, from, onRemove }: Props) {
  const navigate = useNavigate();
  const open = () => navigate(`/stopp/${stop.id}`, { state: { from } });
  const body = (
    <>
      {number !== undefined && <span className="num">{number}</span>}
      <span className="art">
        <StopArt kind={stop.art} />
      </span>
      <span className="txt">
        <b>{stop.name}</b>
        <small>
          {stop.type} · {stop.place}
          {stop.serving && ' · Servering'}
        </small>
        {badge && <span className={`badge ${badge.tone}`}>{badge.text}</span>}
      </span>
    </>
  );

  if (onRemove) {
    return (
      <div className={`item ${highlight ? 'new' : ''}`}>
        <button className="item-open" onClick={open}>
          {body}
        </button>
        <button className="rmmini" aria-label={`Fjern ${stop.name} fra ruten`} onClick={onRemove}>
          <Icon name="close" />
        </button>
      </div>
    );
  }

  return (
    <button className={`item ${highlight ? 'new' : ''}`} onClick={open}>
      {body}
      <span className="chev">
        <Icon name="chev" />
      </span>
    </button>
  );
}

interface SuggestionProps {
  stop: Stop;
  /** The stop is one of the things the traveller asked for. */
  match?: boolean;
  onAdd: () => void;
}

export function SuggestionItem({ stop, match, onAdd }: SuggestionProps) {
  const navigate = useNavigate();
  return (
    <div className="item">
      <button className="item-open" onClick={() => navigate(`/stopp/${stop.id}`, { state: { from: 'route' } })}>
        <span className="art">
          <StopArt kind={stop.art} />
        </span>
        <span className="txt">
          <b>{stop.name}</b>
          <small>
            {stop.type} · {distanceLabel(stop)}
            {stop.serving && ' · Servering'}
          </small>
          {stop.sponsored && <span className="badge ad">Annonse</span>}
          {match && <span className="badge y">Passer dine interesser</span>}
        </span>
      </button>
      <button className="addmini" aria-label={`Legg ${stop.name} til i ruten`} onClick={onAdd}>
        <Icon name="plus" />
      </button>
    </div>
  );
}
