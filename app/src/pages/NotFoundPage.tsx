import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="plain-h">
      <h1 className="display">Siden finnes ikke</h1>
      <p className="muted">
        <Link to="/">Gå til forsiden</Link>
      </p>
    </div>
  );
}
