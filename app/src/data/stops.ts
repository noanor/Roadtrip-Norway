import type { Stop } from '../types';

// Seed catalogue copied from the prototype. Mjøsey Bakeri and Rauland Gardsmat are fictional.
// Replace with data from the backend once it exists (see services/api.ts).
const list: Stop[] = [
  {
    id: 'kongsberg', name: 'Sølvgruvene på Kongsberg', place: 'Kongsberg', type: 'Museum', interest: 'historie', art: 'mine',
    travelHint: '1 t 10 min fra Oslo', rating: 4.6, reviewCount: 312, openingHours: '10–16', distanceFromRoute: '2,4 km', price: 'Kr 250',
    location: [59.651, 9.578],
    description: 'Ta gruvetoget 2,3 km inn i fjellet og se hvordan det ble brutt sølv her i over 300 år. Omvisningen tar rundt 90 minutter, så ta med en ekstra genser.',
  },
  {
    id: 'mjosey', name: 'Mjøsey Bakeri', place: 'Kongsberg', type: 'Bakeri & kafé', interest: 'mat', art: 'cabin',
    travelHint: '5 min avstikker', rating: 4.8, reviewCount: 126, openingHours: '07–17', distanceFromRoute: '400 m', price: 'Kr', recommended: true,
    location: [59.668, 9.65],
    description: 'Lite familiebakeri i et gammelt tømmerhus rett ved riksveien. Kanelboller, surdeigsbrød og kaffe fra lokal brenner. Det er parkering for bobil og lading for elbil i tunet, og bordene ute har utsikt over Lågen.',
  },
  {
    id: 'heddal', name: 'Heddal stavkirke', place: 'Notodden', type: 'Stavkirke', interest: 'historie', art: 'church',
    travelHint: '35 min fra Kongsberg', rating: 4.7, reviewCount: 540, openingHours: '10–17', distanceFromRoute: '0 km', price: 'Kr 120',
    location: [59.5795, 9.1747],
    description: 'Norges største stavkirke, bygget rundt år 1250. Kirken er fortsatt i bruk, og besøkssenteret ved siden av har kafé og toaletter.',
  },
  {
    id: 'lindheim', name: 'Lindheim Ølkompani', place: 'Gvarv', type: 'Gårdsbryggeri', interest: 'mat', art: 'glass',
    travelHint: '25 min fra Notodden', rating: 4.5, reviewCount: 98, openingHours: '12–20', distanceFromRoute: '1,1 km', price: 'Kr Kr',
    location: [59.388, 9.177],
    description: 'Gårdsbryggeri midt i fruktbygda Gvarv. Smak alkoholfri eplesider og øl brygget på egne epler, og kjøp med deg rett fra gårdsbutikken.',
  },
  {
    id: 'vemork', name: 'Vemork industrimuseum', place: 'Rjukan', type: 'Museum', interest: 'historie', art: 'museum',
    travelHint: '1 t 20 min fra Gvarv', rating: 4.7, reviewCount: 410, openingHours: '10–18', distanceFromRoute: '3 km', price: 'Kr 180',
    location: [59.873, 8.495],
    description: 'Kraftstasjonen fra tungtvannsaksjonen under andre verdenskrig. Gå over hengebroen og se utstillingen om sabotasjen.',
  },
  {
    id: 'gausta', name: 'Gaustatoppen', place: 'Tinn', type: 'Fjelltopp', interest: 'natur', art: 'mount',
    travelHint: '25 min fra Rjukan', rating: 4.9, reviewCount: 880, openingHours: 'Hele døgnet', distanceFromRoute: '8 km', price: 'Gratis',
    location: [59.851, 8.654],
    description: 'Fra toppen på 1 883 meter ser du en sjettedel av Norge en klar dag. Gå opp på rundt to timer, eller ta Gaustabanen gjennom fjellet.',
  },
  {
    id: 'rauland', name: 'Rauland Gardsmat', place: 'Rauland', type: 'Gårdsbutikk', interest: 'mat', art: 'cabin',
    travelHint: '10 min avstikker', rating: 4.6, reviewCount: 54, openingHours: '10–18', distanceFromRoute: '900 m', price: 'Kr',
    location: [59.7, 8.04],
    description: 'Gårdsbutikk med spekemat, rømme og flatbrød fra egne dyr. Stopp for en kopp kaffe ved vinduet mot Totak.',
  },
  {
    id: 'haukeli', name: 'Haukeliseter fjellstue', place: 'Haukelifjell', type: 'Fjellstue', interest: 'overnatting', art: 'cabin',
    travelHint: '1 t 40 min fra Rauland', rating: 4.4, reviewCount: 230, openingHours: '08–22', distanceFromRoute: '0 km', price: 'Kr Kr',
    location: [59.814, 7.204],
    description: 'Klassisk fjellstue fra 1890-tallet ved Ståvatn. Spis rømmegrøt i spisesalen eller bli en natt før du kjører over fjellet.',
  },
  {
    id: 'late', name: 'Låtefossen', place: 'Odda', type: 'Foss', interest: 'natur', art: 'falls',
    travelHint: '1 t fra Haukeli', rating: 4.8, reviewCount: 760, openingHours: 'Hele døgnet', distanceFromRoute: '0 km', price: 'Gratis',
    location: [59.948, 6.585],
    description: 'Tvillingfossen som faller 165 meter rett ned mot veien. Det finnes en liten rasteplass der du kan parkere og kjenne sprutet.',
  },
  {
    id: 'roldal', name: 'Røldal stavkyrkje', place: 'Røldal', type: 'Stavkirke', interest: 'historie', art: 'church',
    travelHint: 'Langs veien', rating: 4.5, reviewCount: 140, openingHours: '10–17', distanceFromRoute: '200 m', price: 'Kr 80',
    location: [59.832, 6.818],
    description: 'Pilegrimskirke fra 1200-tallet med et krusifiks folk har reist til i hundrevis av år.',
  },
  {
    id: 'sider', name: 'Hardanger Siderfabrikk', place: 'Lofthus', type: 'Sideri', interest: 'mat', art: 'glass',
    travelHint: '40 min fra Odda', rating: 4.7, reviewCount: 188, openingHours: '11–18', distanceFromRoute: '600 m', price: 'Kr Kr',
    location: [60.326, 6.664],
    description: 'Smak sider fra Hardanger med utsikt over fjorden. Fabrikken ligger midt i frukthagene langs Sørfjorden.',
  },
  {
    id: 'voring', name: 'Vøringsfossen', place: 'Eidfjord', type: 'Foss', interest: 'natur', art: 'falls',
    travelHint: '45 min fra Lofthus', rating: 4.8, reviewCount: 1200, openingHours: 'Hele døgnet', distanceFromRoute: '0 km', price: 'Gratis',
    location: [60.426, 7.252],
    description: '182 meter fritt fall ned i Måbødalen. Gå over gangbroen og ta trappene til de beste utsiktspunktene.',
  },
  {
    id: 'eidfjord', name: 'Badeplass i Eidfjord', place: 'Eidfjord', type: 'Badeplass', interest: 'bade', art: 'lake',
    travelHint: '5 min avstikker', rating: 4.3, reviewCount: 42, openingHours: 'Hele døgnet', distanceFromRoute: '1 km', price: 'Gratis',
    location: [60.467, 7.072],
    description: 'Grunn strand innerst i fjorden med brygge og toaletter. Vannet er kaldt, men barna elsker det.',
  },
  {
    id: 'voss', name: 'Rafting på Voss', place: 'Voss', type: 'Aktivitet', interest: 'aktiv', art: 'lake',
    travelHint: '1 t 30 min fra Eidfjord', rating: 4.8, reviewCount: 320, openingHours: '09–17', distanceFromRoute: '2 km', price: 'Kr Kr Kr',
    location: [60.628, 6.417],
    description: 'Tre timer i elva med guide. Passer fra 12 år, og alt utstyr er inkludert.',
  },
  {
    id: 'bryggen', name: 'Bryggen i Bergen', place: 'Bergen', type: 'Verdensarv', interest: 'historie', art: 'wharf',
    travelHint: '1 t 20 min fra Voss', rating: 4.7, reviewCount: 2100, openingHours: 'Hele døgnet', distanceFromRoute: '0 km', price: 'Gratis',
    location: [60.397, 5.324],
    description: 'Hanseatiske trehus fra tiden da Bergen var Nordens største handelsby. Gå inn i de smale smugene bak fasadene.',
  },
  {
    id: 'floyen', name: 'Fløyen', place: 'Bergen', type: 'Utsiktspunkt', interest: 'natur', art: 'mount',
    travelHint: '10 min fra Bryggen', rating: 4.8, reviewCount: 1800, openingHours: '07–23', distanceFromRoute: '800 m', price: 'Kr 180',
    location: [60.395, 5.343],
    description: 'Ta Fløibanen opp og se ut over byen, fjorden og øyene. Det går turstier videre innover fjellet.',
  },
  {
    id: 'hadeland', name: 'Hadeland Glassverk', place: 'Jevnaker', type: 'Glassverk', interest: 'historie', art: 'glassworks',
    travelHint: '1 t fra Oslo', rating: 4.6, reviewCount: 900, openingHours: '10–17', distanceFromRoute: '0 km', price: 'Gratis',
    location: [60.233, 10.383],
    description: 'Se glassblåserne jobbe i hytta fra 1762, og kjøp seconds i butikken.',
  },
  {
    id: 'kistefos', name: 'Kistefos skulpturpark', place: 'Jevnaker', type: 'Kunst', interest: 'aktiv', art: 'sculpt',
    travelHint: '1 t 10 min fra Oslo', rating: 4.8, reviewCount: 1300, openingHours: '11–17', distanceFromRoute: '0 km', price: 'Kr 200',
    location: [60.257, 10.389],
    description: 'Skulpturpark og museumsbygget The Twist, som vrir seg over elva.',
  },
  {
    id: 'drobak', name: 'Drøbak', place: 'Frogn', type: 'Kystby', interest: 'bade', art: 'harbor',
    travelHint: '40 min fra Oslo', rating: 4.5, reviewCount: 600, openingHours: 'Hele døgnet', distanceFromRoute: '0 km', price: 'Gratis',
    location: [59.663, 10.63],
    description: 'Hvite trehus, akvarium og badeplasser ved Oslofjorden.',
  },
];

export const STOPS: Record<string, Stop> = Object.fromEntries(list.map((s) => [s.id, s]));

export function getStop(id: string): Stop | undefined {
  return STOPS[id];
}

export const DAY_TRIP_IDS = ['hadeland', 'kistefos', 'drobak'];
