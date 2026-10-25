import { useNavigate } from 'react-router-dom';
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
}

export function StopListItem({ stop, number, badge, highlight, from }: Props) {
  const navigate = useNavigate();
  return (
    <button className={`item ${highlight ? 'new' : ''}`} onClick={() => navigate(`/stopp/${stop.id}`, { state: { from } })}>
      {number !== undefined && <span className="num">{number}</span>}
      <span className="art">
        <StopArt kind={stop.art} />
      </span>
      <span className="txt">
        <b>{stop.name}</b>
        <small>
          {stop.type} · {stop.travelHint}
        </small>
        {badge && <span className={`badge ${badge.tone}`}>{badge.text}</span>}
      </span>
      <span className="chev">
        <Icon name="chev" />
      </span>
    </button>
  );
}

interface SuggestionProps {
  stop: Stop;
  onAdd: () => void;
}

export function SuggestionItem({ stop, onAdd }: SuggestionProps) {
  const navigate = useNavigate();
  return (
    <div className="item">
      <button style={{ display: 'contents' }} onClick={() => navigate(`/stopp/${stop.id}`, { state: { from: 'route' } })}>
        <span className="art">
          <StopArt kind={stop.art} />
        </span>
        <span className="txt">
          <b>{stop.name}</b>
          <small>
            {stop.type} · {stop.travelHint}
          </small>
          {stop.recommended && <span className="badge y">Anbefalt stopp</span>}
        </span>
      </button>
      <button className="addmini" aria-label={`Legg ${stop.name} til i ruten`} onClick={onAdd}>
        <Icon name="plus" />
      </button>
    </div>
  );
}
