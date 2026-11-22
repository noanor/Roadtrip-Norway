import { useNavigate } from 'react-router-dom';

/**
 * Back button that stays inside the app: goes back in history when there is an in-app entry,
 * otherwise (page opened from a link or a reload) goes to `fallback`.
 */
export function useBack(fallback = '/') {
  const navigate = useNavigate();
  return () => {
    // the browser router stores its position in the history stack as `idx` (0 = first page of the visit)
    const idx = (window.history.state as { idx?: unknown } | null)?.idx;
    if (typeof idx === 'number' && idx > 0) navigate(-1);
    else navigate(fallback, { replace: true });
  };
}
