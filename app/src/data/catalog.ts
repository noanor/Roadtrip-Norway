import type { IconName } from '../components/Icon';
import type {
  BusinessPlan,
  ExploreRoute,
  InterestId,
  LatLng,
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

/** How much longer the same road takes. Motorhomes and caravans drive slower, mostly uphill and on narrow roads. */
export const VEHICLE_SPEED_FACTOR: Record<Vehicle, number> = { Bil: 1, MC: 1, Bobil: 1.15, Campingvogn: 1.2 };

/** The only fully planned route so far. Other from/to pairs reuse it until routes come from the backend. */
export const OSLO_BERGEN: RouteTemplate = {
  id: 'oslo-bergen',
  from: 'Oslo',
  to: 'Bergen',
  days: [
    { day: 1, from: 'Oslo', to: 'Gvarv', toLocation: [59.388, 9.177], km: 178, minutes: 185, stops: ['kongsberg', 'heddal', 'lindheim'], suggestions: ['mjosey'] },
    { day: 2, from: 'Gvarv', to: 'Rauland', toLocation: [59.7, 8.04], km: 154, minutes: 170, stops: ['vemork', 'gausta'], suggestions: ['rauland'] },
    { day: 3, from: 'Rauland', to: 'Odda', toLocation: [60.069, 6.546], km: 162, minutes: 165, stops: ['haukeli', 'late'], suggestions: ['roldal'] },
    { day: 4, from: 'Odda', to: 'Eidfjord', toLocation: [60.467, 7.072], km: 74, minutes: 85, stops: ['sider', 'voring'], suggestions: ['eidfjord'] },
    { day: 5, from: 'Eidfjord', to: 'Bergen', toLocation: [60.392, 5.324], km: 150, minutes: 160, stops: ['voss', 'bryggen'], suggestions: ['floyen'] },
  ],
};

export const EXPLORE_ROUTES: ExploreRoute[] = [
  { title: 'Oslo til Bergen over fjellet', subtitle: '5 dager · stavkirker, fjell og fjord', art: 'mount', from: 'Oslo', to: 'Bergen', days: 5 },
  { title: 'Hardanger i frukttiden', subtitle: '3 dager · fjord, sider og fosser', art: 'falls', from: 'Bergen', to: 'Odda', days: 3 },
  { title: 'Telemarkskanalen', subtitle: '2 dager · sluser og stavkirker', art: 'church', from: 'Skien', to: 'Dalen', days: 2 },
  { title: 'Atlanterhavsveien', subtitle: '1 dag · kyst og broer', art: 'lake', from: 'Molde', to: 'Kristiansund', days: 1 },
  { title: 'Gamle Strynefjellsvei', subtitle: '2 dager · snø om sommeren', art: 'mount', from: 'Lom', to: 'Stryn', days: 2 },
];

/** Known place coordinates. Replace with a geocoding service when free-text places are supported. */
export const CITIES: Record<string, LatLng> = {
  Oslo: [59.913, 10.752], Bergen: [60.392, 5.324], Ålesund: [62.472, 6.155], Trondheim: [63.43, 10.395],
  Bodø: [67.28, 14.405], Stavanger: [58.97, 5.733], Kristiansand: [58.146, 7.996], Tromsø: [69.649, 18.956],
  Lofoten: [68.234, 14.564], Skien: [59.209, 9.609], Dalen: [59.445, 8.004], Molde: [62.737, 7.16],
  Kristiansund: [63.11, 7.728], Lom: [61.838, 8.567], Stryn: [61.904, 6.716], Odda: [60.069, 6.546],
  Jevnaker: [60.24, 10.38], Frogn: [59.66, 10.63], Kongsberg: [59.668, 9.65],
};

/** Place names the planner knows, for the suggestions under Fra, Til and Via. */
export const PLACE_NAMES = Object.keys(CITIES).sort((a, b) => a.localeCompare(b, 'nb'));

/** The known place with this name (any case, surrounding spaces ignored), or undefined. */
export function knownPlace(name: string): string | undefined {
  return PLACE_NAMES.find((c) => c.toLowerCase() === name.trim().toLowerCase());
}

export function cityLocation(name: string, fallback: 'from' | 'to'): LatLng {
  const key = Object.keys(CITIES).find((c) => c.toLowerCase() === name.trim().toLowerCase());
  return key ? CITIES[key] : fallback === 'from' ? CITIES.Oslo : CITIES.Bergen;
}

export const BUSINESS_PLANS: BusinessPlan[] = [
  { id: 'synlig', title: 'Synlig plassering', description: 'Stedet ditt vises på kartet for alle som kjører forbi.', price: 'Gratis' },
  { id: 'fremhevet', title: 'Fremhevet stopp', description: 'Foreslått til reisende med riktige interesser. Vises med merket «Annonse».', price: 'Kr 1 499/mnd', tag: 'Mest valgt' },
  { id: 'partner', title: 'Partner', description: 'Egne tilbud i appen, statistikk over besøkende og fast plass i populære ruter.', price: 'Kr 3 990/mnd' },
];

export const BUSINESS_TYPES = ['Kafé eller bakeri', 'Gårdsbutikk', 'Overnatting', 'Aktivitet', 'Museum eller attraksjon'];
