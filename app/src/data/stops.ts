import type { Stop } from '../types';

// Seed catalogue copied from the prototype. Mjøsey Bakeri and Rauland Gardsmat are fictional.
// Ratings, review counts, opening hours and prices are placeholders for the prototype, not checked facts.
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
    travelHint: '5 min avstikker', rating: 4.8, reviewCount: 126, openingHours: '07–17', distanceFromRoute: '400 m', price: 'Kr', sponsored: true, serving: true,
    location: [59.668, 9.65],
    description: 'Lite familiebakeri i et gammelt tømmerhus rett ved riksveien. Kanelboller, surdeigsbrød og kaffe fra lokal brenner. Det er parkering for bobil og lading for elbil i tunet, og bordene ute har utsikt over Lågen.',
  },
  {
    id: 'heddal', name: 'Heddal stavkirke', place: 'Notodden', type: 'Stavkirke', interest: 'historie', art: 'church',
    travelHint: '35 min fra Kongsberg', rating: 4.7, reviewCount: 540, openingHours: '10–17', distanceFromRoute: '0 km', price: 'Kr 120', serving: true,
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
    notFor: ['Campingvogn'],
    location: [59.873, 8.495],
    description: 'Kraftstasjonen fra tungtvannsaksjonen under andre verdenskrig. Gå over hengebroen og se utstillingen om sabotasjen.',
  },
  {
    id: 'gausta', name: 'Gaustatoppen', place: 'Tinn', type: 'Fjelltopp', interest: 'natur', art: 'mount',
    travelHint: '25 min fra Rjukan', rating: 4.9, reviewCount: 880, openingHours: 'Hele døgnet', distanceFromRoute: '8 km', price: 'Gratis',
    notFor: ['Bobil', 'Campingvogn'],
    location: [59.851, 8.654],
    description: 'Fra toppen på 1 883 meter ser du en sjettedel av Norge en klar dag. Gå opp på rundt to timer, eller ta Gaustabanen gjennom fjellet.',
  },
  {
    id: 'rauland', name: 'Rauland Gardsmat', place: 'Rauland', type: 'Gårdsbutikk', interest: 'mat', art: 'cabin',
    travelHint: '10 min avstikker', rating: 4.6, reviewCount: 54, openingHours: '10–18', distanceFromRoute: '900 m', price: 'Kr', serving: true,
    location: [59.7, 8.04],
    description: 'Gårdsbutikk med spekemat, rømme og flatbrød fra egne dyr. Stopp for en kopp kaffe ved vinduet mot Totak.',
  },
  {
    id: 'haukeli', name: 'Haukeliseter fjellstue', place: 'Haukelifjell', type: 'Fjellstue', interest: 'overnatting', art: 'cabin',
    travelHint: '1 t 40 min fra Rauland', rating: 4.4, reviewCount: 230, openingHours: '08–22', distanceFromRoute: '0 km', price: 'Kr Kr', serving: true,
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
    notFor: ['Bobil', 'Campingvogn'],
    location: [60.397, 5.324],
    description: 'Hanseatiske trehus fra tiden da Bergen var Nordens største handelsby. Gå inn i de smale smugene bak fasadene.',
  },
  {
    id: 'floyen', name: 'Fløyen', place: 'Bergen', type: 'Utsiktspunkt', interest: 'natur', art: 'mount',
    travelHint: '10 min fra Bryggen', rating: 4.8, reviewCount: 1800, openingHours: '07–23', distanceFromRoute: '800 m', price: 'Kr 180',
    notFor: ['Bobil', 'Campingvogn'],
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
  // ---- Hardanger (Bergen → Odda) ----
  {
    id: 'steinsdal', name: 'Steinsdalsfossen', place: 'Norheimsund', type: 'Foss', interest: 'natur', art: 'falls',
    travelHint: '1 t 15 min fra Bergen', rating: 4.6, reviewCount: 410, openingHours: 'Hele døgnet', distanceFromRoute: '0 km', price: 'Gratis',
    location: [60.372, 6.104],
    description: 'Foss du kan gå bak uten å bli våt. Stien fra parkeringen tar fem minutter, og kafeen ved fossen er åpen om sommeren.',
  },
  {
    id: 'fartoyvern', name: 'Hardanger fartøyvernsenter', place: 'Norheimsund', type: 'Museum', interest: 'historie', art: 'wharf',
    travelHint: '5 min fra Norheimsund sentrum', rating: 4.5, reviewCount: 120, openingHours: '10–16', distanceFromRoute: '1,5 km', price: 'Kr 100',
    location: [60.374, 6.143],
    description: 'Båtbyggeri og museum der gamle trebåter blir satt i stand. Se håndverkerne jobbe og gå om bord i fartøyene ved kaia.',
  },
  {
    id: 'folkemuseum', name: 'Hardanger folkemuseum', place: 'Utne', type: 'Museum', interest: 'historie', art: 'museum',
    travelHint: 'Ved ferjekaia i Utne', rating: 4.5, reviewCount: 160, openingHours: '10–16', distanceFromRoute: '300 m', price: 'Kr 120',
    location: [60.424, 6.622],
    description: 'Gamle tun, bunader og frukthager ved fjorden. Om høsten kan du smake epler fra sortene som har vokst i Hardanger i hundrevis av år.',
  },
  {
    id: 'husedalen', name: 'Husedalen', place: 'Kinsarvik', type: 'Fottur', interest: 'aktiv', art: 'falls',
    travelHint: '10 min fra Kinsarvik', rating: 4.8, reviewCount: 230, openingHours: 'Hele døgnet', distanceFromRoute: '2 km', price: 'Gratis',
    location: [60.374, 6.75],
    description: 'Bratt sti opp dalen forbi fire store fosser. Den første fossen nås på under en time, og hele turen tar en dag.',
  },
  {
    id: 'vasskraft', name: 'Norsk vasskraft- og industristadmuseum', place: 'Tyssedal', type: 'Museum', interest: 'historie', art: 'museum',
    travelHint: '10 min fra Odda', rating: 4.6, reviewCount: 190, openingHours: '10–17', distanceFromRoute: '500 m', price: 'Kr 140',
    location: [60.118, 6.56],
    description: 'Kraftstasjonen som ga strøm til industrien i Odda. Turbinhallen fra 1908 er et av de flotteste industribyggene i Norge.',
  },
  // ---- Telemarkskanalen (Skien → Dalen) ----
  {
    id: 'ibsen', name: 'Henrik Ibsen-museet', place: 'Skien', type: 'Museum', interest: 'historie', art: 'museum',
    travelHint: '10 min fra Skien sentrum', rating: 4.4, reviewCount: 210, openingHours: '11–17', distanceFromRoute: '3 km', price: 'Kr 150',
    location: [59.236, 9.595],
    description: 'Gården Venstøp der Ibsen bodde som gutt. Gå rundt i huset og se loftet som ga ideen til Vildanden.',
  },
  {
    id: 'ulefoss', name: 'Ulefoss sluser', place: 'Ulefoss', type: 'Kanal', interest: 'historie', art: 'wharf',
    travelHint: '25 min fra Skien', rating: 4.6, reviewCount: 280, openingHours: 'Hele døgnet', distanceFromRoute: '0 km', price: 'Gratis',
    location: [59.282, 9.265],
    description: 'Sluser i trapp løfter båtene forbi fossen. Stå på kanten og se kanalbåten bli løftet opp.',
  },
  {
    id: 'vrangfoss', name: 'Vrangfoss sluser', place: 'Lunde', type: 'Kanal', interest: 'historie', art: 'wharf',
    travelHint: '15 min fra Ulefoss', rating: 4.7, reviewCount: 190, openingHours: 'Hele døgnet', distanceFromRoute: '1 km', price: 'Gratis',
    location: [59.304, 9.17],
    description: 'Den største slusetrappen på kanalen. Fin plass for matpakken mens båtene går gjennom.',
  },
  {
    id: 'kviteseid', name: 'Kviteseid bygdetun', place: 'Kviteseid', type: 'Museum', interest: 'historie', art: 'church',
    travelHint: '40 min fra Lunde', rating: 4.4, reviewCount: 70, openingHours: '11–17', distanceFromRoute: '1 km', price: 'Kr 80',
    location: [59.401, 8.49],
    description: 'Gamle tømmerhus og en middelalderkirke på en odde i Kviteseidvatnet.',
  },
  {
    id: 'eidsborg', name: 'Eidsborg stavkyrkje', place: 'Tokke', type: 'Stavkirke', interest: 'historie', art: 'church',
    travelHint: '10 min fra Dalen', rating: 4.6, reviewCount: 150, openingHours: '10–17', distanceFromRoute: '4 km', price: 'Kr 100',
    location: [59.46, 8.01],
    description: 'Liten stavkirke med spon på veggene. Vest-Telemark museum ligger rett ved.',
  },
  {
    id: 'dalenhotel', name: 'Dalen Hotel', place: 'Dalen', type: 'Hotell', interest: 'overnatting', art: 'cabin',
    travelHint: 'Ved kanalens ende', rating: 4.7, reviewCount: 340, openingHours: 'Hele døgnet', distanceFromRoute: '0 km', price: 'Kr Kr Kr', serving: true,
    location: [59.446, 8.004],
    description: 'Hotell i dragestil fra 1894, der kanalbåtene legger til. Spis middag i salen eller ta en kaffe på verandaen.',
  },
  // ---- Atlanterhavsveien (Molde → Kristiansund) ----
  {
    id: 'varden', name: 'Varden utsiktspunkt', place: 'Molde', type: 'Utsiktspunkt', interest: 'natur', art: 'mount',
    travelHint: '10 min fra Molde sentrum', rating: 4.8, reviewCount: 520, openingHours: 'Hele døgnet', distanceFromRoute: '3 km', price: 'Gratis',
    location: [62.745, 7.137],
    description: 'Se ut over Moldepanoramaet og fjellene rundt fjorden. Kjør opp, eller gå stien fra byen på rundt en time.',
  },
  {
    id: 'atlanterhavsveien', name: 'Storseisundbrua', place: 'Averøy', type: 'Utsiktspunkt', interest: 'natur', art: 'harbor',
    travelHint: '50 min fra Molde', rating: 4.8, reviewCount: 1400, openingHours: 'Hele døgnet', distanceFromRoute: '0 km', price: 'Gratis',
    location: [63.017, 7.354],
    description: 'Den mest kjente brua på Atlanterhavsveien. Parker på Eldhusøya og gå gangveien rundt holmen mens havet slår inn.',
  },
  {
    id: 'bud', name: 'Bud', place: 'Hustadvika', type: 'Fiskevær', interest: 'mat', art: 'harbor',
    travelHint: '10 min avstikker', rating: 4.5, reviewCount: 180, openingHours: 'Hele døgnet', distanceFromRoute: '6 km', price: 'Gratis', serving: true,
    location: [62.906, 6.912],
    description: 'Lite fiskevær ytterst mot havet. Spis fiskesuppe på kaia og se kystfortet Ergan fra krigen.',
  },
  {
    id: 'kvernes', name: 'Kvernes stavkyrkje', place: 'Averøy', type: 'Stavkirke', interest: 'historie', art: 'church',
    travelHint: '20 min fra Storseisundbrua', rating: 4.4, reviewCount: 90, openingHours: '10–17', distanceFromRoute: '8 km', price: 'Kr 80',
    location: [62.995, 7.71],
    description: 'Gammel stavkirke med utvendige støtter og malte vegger inne.',
  },
  // ---- Gamle Strynefjellsvei (Lom → Stryn) ----
  {
    id: 'lomkyrkje', name: 'Lom stavkyrkje', place: 'Lom', type: 'Stavkirke', interest: 'historie', art: 'church',
    travelHint: 'I Lom sentrum', rating: 4.6, reviewCount: 610, openingHours: '09–19', distanceFromRoute: '0 km', price: 'Kr 80',
    location: [61.839, 8.568],
    description: 'En av de største stavkirkene i landet, med drager på taket. Kirken ligger rett ved elva midt i Lom.',
  },
  {
    id: 'fjellmuseum', name: 'Norsk Fjellmuseum', place: 'Lom', type: 'Museum', interest: 'historie', art: 'museum',
    travelHint: 'Ved stavkirken', rating: 4.4, reviewCount: 200, openingHours: '10–18', distanceFromRoute: '0 km', price: 'Kr 100',
    location: [61.838, 8.566],
    description: 'Om livet i fjellet, fra reinsjakt til klatring i Jotunheimen. Bra stopp på en regnværsdag.',
  },
  {
    id: 'grotli', name: 'Grotli Høyfjellshotell', place: 'Grotli', type: 'Fjellhotell', interest: 'overnatting', art: 'cabin',
    travelHint: '1 t 10 min fra Lom', rating: 4.3, reviewCount: 150, openingHours: '08–22', distanceFromRoute: '0 km', price: 'Kr Kr', serving: true,
    location: [61.993, 7.678],
    description: 'Fjellhotell der den gamle veien begynner. Spis middag her og kjør over fjellet tidlig neste morgen.',
  },
  {
    id: 'videseter', name: 'Gamle Strynefjellsvegen', place: 'Videseter', type: 'Nasjonal turistveg', interest: 'natur', art: 'mount',
    travelHint: '1 t 30 min over fjellet', rating: 4.9, reviewCount: 700, openingHours: 'Om sommeren', distanceFromRoute: '0 km', price: 'Bomavgift',
    notFor: ['Campingvogn'],
    location: [61.912, 7.214],
    description: 'Gammel grusvei over fjellet med steinmurer og snøkanter langt utpå sommeren. Veien er smal og passer ikke for campingvogn.',
  },
  {
    id: 'tystig', name: 'Stryn sommerski', place: 'Tystigbreen', type: 'Aktivitet', interest: 'aktiv', art: 'mount',
    travelHint: '5 min fra gamle veien', rating: 4.5, reviewCount: 120, openingHours: '10–16', distanceFromRoute: '2 km', price: 'Kr Kr',
    location: [61.932, 7.283],
    description: 'Alpinanlegg på breen som er åpent om sommeren. Ta med solkrem og stå på ski i t-skjorte.',
  },
  // ---- Dagstur til Drøbak ----
  {
    id: 'oscarsborg', name: 'Oscarsborg festning', place: 'Frogn', type: 'Festning', interest: 'historie', art: 'harbor',
    travelHint: 'Båt fra Drøbak', rating: 4.6, reviewCount: 450, openingHours: '11–17', distanceFromRoute: '1 km', price: 'Kr 150',
    location: [59.672, 10.606],
    description: 'Festningen som senket Blücher i 1940. Ta båten fra Drøbak og gå omvisning i kanonstillingene.',
  },
];

export const STOPS: Record<string, Stop> = Object.fromEntries(list.map((s) => [s.id, s]));

export function getStop(id: string): Stop | undefined {
  return STOPS[id];
}

export const DAY_TRIP_IDS = ['hadeland', 'kistefos', 'drobak'];

/** How far the stop is from the planned drive, as shown in lists: "400 m fra ruten" or "langs ruten". */
export function distanceLabel(stop: Stop): string {
  return /^0\s/.test(stop.distanceFromRoute) ? 'langs ruten' : `${stop.distanceFromRoute} fra ruten`;
}

const PRICE_LEVELS: Record<string, string> = { Kr: 'Rimelig', 'Kr Kr': 'Middels', 'Kr Kr Kr': 'Dyrt' };

/** Price as shown to travellers. Stops without a fixed entrance fee have a price level instead. */
export function priceLabel(stop: Stop): { heading: string; value: string } {
  const level = PRICE_LEVELS[stop.price];
  return level ? { heading: 'Prisnivå', value: level } : { heading: 'Pris', value: stop.price };
}
