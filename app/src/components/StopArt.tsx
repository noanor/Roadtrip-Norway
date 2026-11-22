import { useId } from 'react';
import type { ArtKind } from '../types';

// Drawn stand-ins for stop photos. Swap for <img> once real images exist.
const ART: Record<ArtKind, [string, string, () => string]> = {
  cabin: ['#c9a578', '#7b5a3a', () => `<path d="M50 112l50-40 50 40v48H50z" fill="#5a3d26"/><path d="M42 114l58-48 58 48" stroke="#3a2617" stroke-width="8" fill="none"/><rect x="70" y="122" width="18" height="16" fill="#f3d58a"/><rect x="112" y="122" width="18" height="16" fill="#f3d58a"/><rect x="92" y="132" width="16" height="28" fill="#2e1f13"/>`],
  church: ['#b8c7b3', '#5b7a63', () => `<path d="M100 40l14 30H86z" fill="#3b2a1d"/><path d="M80 78l20-18 20 18v10H80z" fill="#4a3424"/><path d="M66 108l34-28 34 28v52H66z" fill="#5c3f29"/><path d="M60 110l40-34 40 34" stroke="#2f2117" stroke-width="6" fill="none"/><rect x="92" y="130" width="16" height="30" fill="#2a1c12"/>`],
  glass: ['#e7c27a', '#b4772f', () => `<path d="M84 70h32l-4 80H88z" fill="#f6e2a8" stroke="#6b4318" stroke-width="4"/><path d="M86 92h28l-3 56H89z" fill="#d48a22"/><ellipse cx="100" cy="70" rx="18" ry="6" fill="#fff8e6"/>`],
  mine: ['#9aa59a', '#3e4a42', () => `<path d="M40 160V110a60 60 0 01120 0v50z" fill="#2a312c"/><path d="M62 160v-48a38 38 0 0176 0v48z" fill="#141915"/><path d="M60 160l80-30" stroke="#b8b8a8" stroke-width="3"/><circle cx="100" cy="98" r="5" fill="#f3d58a"/>`],
  museum: ['#c7c1b0', '#6e6a5e', () => `<rect x="40" y="90" width="120" height="70" fill="#7b6e5c"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${50 + i * 18}" y="104" width="10" height="16" fill="#f3d58a"/><rect x="${50 + i * 18}" y="130" width="10" height="16" fill="#f3d58a"/>`).join('')}<rect x="36" y="82" width="128" height="10" fill="#5a4f40"/>`],
  mount: ['#bcd0d6', '#6f9aa8', () => `<path d="M0 160l60-90 30 40 30-60 80 110z" fill="#3f5f53"/><path d="M120 50l-14 28 10-6 8 8 10-10z" fill="#fff"/><path d="M60 70l-12 18 8-4 6 6z" fill="#fff"/>`],
  falls: ['#a9c3b4', '#3e6b55', () => `<path d="M0 60h70v100H0zM130 60h70v100h-70z" fill="#2f4f3e"/><path d="M70 60h60v100H70z" fill="#dfeef0"/><path d="M78 60v100M92 60v100M106 60v100M120 60v100" stroke="#b5d4da" stroke-width="3"/><ellipse cx="100" cy="158" rx="60" ry="10" fill="#fff" opacity=".8"/>`],
  lake: ['#c8dce0', '#7fa7b3', () => `<path d="M0 110l50-40 40 30 50-50 60 60v10H0z" fill="#4f7464"/><rect x="0" y="118" width="200" height="42" fill="#5e95a6"/><path d="M20 132h40M90 142h50M150 128h30" stroke="#d6eaee" stroke-width="3"/>`],
  wharf: ['#e9d9b9', '#b98d5a', () => `${([['#b23a2b', 20], ['#e3b443', 54], ['#f1ebe0', 88], ['#a8442f', 122], ['#e3b443', 156]] as const).map(([c, x]) => `<path d="M${x} 160V96l14-20 14 20v64z" fill="${c}" stroke="#4a3220" stroke-width="2"/><rect x="${x + 9}" y="110" width="10" height="12" fill="#3a2a1c"/>`).join('')}<rect x="0" y="152" width="200" height="8" fill="#5e4632"/>`],
  glassworks: ['#d6c9e0', '#8b7aa3', () => `<path d="M70 150c0-30 10-40 10-70h40c0 30 10 40 10 70z" fill="#cfe8ee" opacity=".85"/><path d="M90 60h20v20H90z" fill="#9fd0dc"/><circle cx="100" cy="120" r="14" fill="#7cc0d0"/>`],
  sculpt: ['#d9d3c4', '#8a8471', () => `<path d="M30 160c20-40 60-50 70-90 10 40 50 50 70 90z" fill="#3f4a44"/><path d="M90 160V100l30-30v90" fill="#c9a24a"/>`],
  harbor: ['#cfe1e6', '#7aa4b0', () => `<rect x="0" y="120" width="200" height="40" fill="#4f88a0"/><path d="M40 120V90h24v30zM76 120V80h22v40zM110 120V94h26v26z" fill="#f4efe6" stroke="#4a3a2c" stroke-width="2"/><path d="M36 92l16-14 16 14M72 82l15-14 15 14M106 96l17-14 17 14" fill="#b23a2b"/><path d="M150 130l14-24v24z" fill="#fff"/>`],
};

export function StopArt({ kind }: { kind: ArtKind }) {
  const gradientId = `art${useId().replace(/:/g, '')}`;
  const [top, bottom, draw] = ART[kind];
  const markup = `<defs><linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="200" height="160" fill="url(#${gradientId})"/>${draw()}`;
  return (
    <svg
      className="art"
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
