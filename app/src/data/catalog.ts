import type { IconName } from '../components/Icon';
import type {
  BusinessPlan,
  ExploreRoute,
  InterestId,
  LatLng,
  Review,
  RouteTemplate,
  Vehicle,
} from '../types';

export const INTERESTS: { id: InterestId; label: string; icon: IconName }[] = [
  { id: 'aktiv', label: 'Aktiviteter & turer', icon: 'hike' },
  { id: 'fasil', label: 'Lading & fasiliteter', icon: 'plug' },
  { id: 'natur', label: 'Fjellsjøer & utsikt', icon: 'mountain' },
  { id: 'historie', label: 'Museer & historie', icon: 'museum' },
  { id: 'mat', label: 'Lokalmat & gårdsbutikker', icon: 'food' },
  { id: 'overnatting', label: 'Overnatting & arkitektur', icon: 'bed' },
  { id: 'bade', label: 'Badeplasser', icon: 'wave' },
  { id: 'familie', label: 'Familie & lek', icon: 'kids' },
];

export const VEHICLES: Vehicle[] = ['Bil', 'MC', 'Bobil', 'Campingvogn'];

/** The only fully planned route so far. Other from/to pairs reuse it until routes come from the backend. */
export const OSLO_BERGEN: RouteTemplate = {
  id: 'oslo-bergen',
  from: 'Oslo',
  to: 'Bergen',
  days: [
    { day: 1, title: 'Oslo → Gvarv', km: 178, driveTime: '3 t 05 min', stops: ['kongsberg', 'heddal', 'lindheim'], suggestions: ['mjosey'] },
    { day: 2, title: 'Gvarv → Rauland', km: 154, driveTime: '2 t 50 min', stops: ['vemork', 'gausta'], suggestions: ['rauland'] },
    { day: 3, title: 'Rauland → Odda', km: 162, driveTime: '2 t 45 min', stops: ['haukeli', 'late'], suggestions: ['roldal'] },
    { day: 4, title: 'Odda → Eidfjord', km: 74, driveTime: '1 t 25 min', stops: ['sider', 'voring'], suggestions: ['eidfjord'] },
    { day: 5, title: 'Eidfjord → Bergen', km: 150, driveTime: '2 t 40 min', stops: ['voss', 'bryggen'], suggestions: ['floyen'] },
  ],
};

export const POPULAR_ROUTES: [string, string][] = [
  ['Oslo', 'Bergen'],
  ['Bergen', 'Ålesund'],
  ['Trondheim', 'Bodø'],
  ['Stavanger', 'Kristiansand'],
  ['Tromsø', 'Lofoten'],
];

export const EXPLORE_ROUTES: ExploreRoute[] = [
  { title: 'Hardanger i frukttiden', subtitle: '3 dager · fjord, sider og fosser', art: 'falls', from: 'Bergen', to: 'Odda' },
  { title: 'Telemarkskanalen', subtitle: '2 dager · sluser og stavkirker', art: 'church', from: 'Skien', to: 'Dalen' },
  { title: 'Atlanterhavsveien', subtitle: '1 dag · kyst og broer', art: 'lake', from: 'Molde', to: 'Kristiansund' },
  { title: 'Gamle Strynefjellsvei', subtitle: '2 dager · snø om sommeren', art: 'mount', from: 'Lom', to: 'Stryn' },
];

/** Known place coordinates. Replace with a geocoding service when free-text places are supported. */
export const CITIES: Record<string, LatLng> = {
  Oslo: [59.913, 10.752], Bergen: [60.392, 5.324], Ålesund: [62.472, 6.155], Trondheim: [63.43, 10.395],
  Bodø: [67.28, 14.405], Stavanger: [58.97, 5.733], Kristiansand: [58.146, 7.996], Tromsø: [69.649, 18.956],
  Lofoten: [68.234, 14.564], Skien: [59.209, 9.609], Dalen: [59.445, 8.004], Molde: [62.737, 7.16],
  Kristiansund: [63.11, 7.728], Lom: [61.838, 8.567], Stryn: [61.904, 6.716], Odda: [60.069, 6.546],
  Jevnaker: [60.24, 10.38], Frogn: [59.66, 10.63], Kongsberg: [59.668, 9.65],
};

export function cityLocation(name: string, fallback: 'from' | 'to'): LatLng {
  const key = Object.keys(CITIES).find((c) => c.toLowerCase() === name.trim().toLowerCase());
  return key ? CITIES[key] : fallback === 'from' ? CITIES.Oslo : CITIES.Bergen;
}

// Placeholder reviews shown on every stop until real reviews exist.
export const SAMPLE_REVIEWS: Review[] = [
  { author: 'Hanne K.', initials: 'HK', rating: 5, text: 'Stoppet her på vei vestover i juli. Verdt avstikkeren, og det var lett å parkere med henger.' },
  { author: 'Ola og Sigrid', initials: 'OS', rating: 4, text: 'Fint sted å strekke på beina med barna. Kom tidlig i helgene.' },
];

export const BUSINESS_PLANS: BusinessPlan[] = [
  { id: 'synlig', title: 'Synlig plassering', description: 'Stedet ditt vises på kartet for alle som kjører forbi.', price: 'Gratis' },
  { id: 'fremhevet', title: 'Fremhevet stopp', description: 'Merket «Anbefalt stopp» og foreslått til reisende med riktige interesser.', price: 'Kr 1 499/mnd', tag: 'Mest valgt' },
  { id: 'partner', title: 'Partner', description: 'Egne tilbud i appen, statistikk over besøkende og fast plass i populære ruter.', price: 'Kr 3 990/mnd' },
];

export const BUSINESS_TYPES = ['Kafé eller bakeri', 'Gårdsbutikk', 'Overnatting', 'Aktivitet', 'Museum eller attraksjon'];
