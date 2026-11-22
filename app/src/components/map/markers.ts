import L from 'leaflet';

export type PinVariant = 'cur' | 'dim' | 'sugg' | 'end' | 'me';

const SIZES: Record<PinVariant, [number, number]> = {
  cur: [28, 28],
  dim: [14, 14],
  sugg: [28, 28],
  end: [120, 26],
  me: [18, 18],
};

const ENTITIES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ENTITIES[c]);

/** Round pin drawn with CSS (.mpin), so no image assets are needed. `html` is trusted markup. */
export function pinIcon(variant: PinVariant, html = ''): L.DivIcon {
  return L.divIcon({ className: 'mk', html: `<span class="mpin ${variant}">${html}</span>`, iconSize: SIZES[variant] });
}

export const labelPin = (text: string) => pinIcon('end', escapeHtml(text));
