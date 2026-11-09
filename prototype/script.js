// ---------- icons ----------
const P = {
  back:'<path d="M15 18l-6-6 6-6"/>', chev:'<path d="M9 6l6 6-6 6"/>', arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  bell:'<path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 003.4 0"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  swap:'<path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/>', plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
  pin:'<path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  dot:'<circle cx="12" cy="12" r="4"/>', check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  star:'<path fill="currentColor" stroke="none" d="M12 2.8l2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 17l-5.8 3.3 1.4-6.4L2.7 9.5l6.5-.7z"/>',
  bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>', home:'<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>',
  route:'<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H16a3.5 3.5 0 000-7H8a3.5 3.5 0 010-7h7.5"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>', car:'<path d="M5 16l1.5-6A2 2 0 018.4 8.5h7.2a2 2 0 011.9 1.5L19 16"/><rect x="3" y="13" width="18" height="5" rx="2"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/>',
  hike:'<circle cx="13" cy="4" r="2"/><path d="M7 21l3-7 3 2v5M10 14l1-5 4 3h3M11 9L8 11v3"/>',
  mountain:'<path d="M2 20l7-12 4 6 3-4 6 10z"/><path d="M7.5 10.5L9 12l1.5-1.5"/>',
  museum:'<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  food:'<path d="M7 3v8a2 2 0 002 2v8M11 3v8a2 2 0 01-2 2M17 21V3c-2 1-3 4-3 7h3"/>',
  bed:'<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/>',
  wave:'<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><circle cx="17" cy="6" r="3"/>',
  plug:'<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4"/>', kids:'<circle cx="8" cy="6" r="2.5"/><circle cx="17" cy="9" r="2"/><path d="M5 21v-6l-1-4h8l-1 4v6M15 21v-4l-1-3h6l-1 3v4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', store:'<path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>'
};
P.expand = '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>';
P.locate = '<circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="12" r="7.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22"/>';
const ic = (n, cls='') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

// ---------- illustrated thumbnails (stand-ins for photos) ----------
const ART = {
  cabin:  ['#c9a578','#7b5a3a', s=>`<path d="M50 112l50-40 50 40v48H50z" fill="#5a3d26"/><path d="M42 114l58-48 58 48" stroke="#3a2617" stroke-width="8" fill="none"/><rect x="70" y="122" width="18" height="16" fill="#f3d58a"/><rect x="112" y="122" width="18" height="16" fill="#f3d58a"/><rect x="92" y="132" width="16" height="28" fill="#2e1f13"/>`],
  church: ['#b8c7b3','#5b7a63', s=>`<path d="M100 40l14 30H86z" fill="#3b2a1d"/><path d="M80 78l20-18 20 18v10H80z" fill="#4a3424"/><path d="M66 108l34-28 34 28v52H66z" fill="#5c3f29"/><path d="M60 110l40-34 40 34" stroke="#2f2117" stroke-width="6" fill="none"/><rect x="92" y="130" width="16" height="30" fill="#2a1c12"/>`],
  glass:  ['#e7c27a','#b4772f', s=>`<path d="M84 70h32l-4 80H88z" fill="#f6e2a8" stroke="#6b4318" stroke-width="4"/><path d="M86 92h28l-3 56H89z" fill="#d48a22"/><ellipse cx="100" cy="70" rx="18" ry="6" fill="#fff8e6"/>`],
  mine:   ['#9aa59a','#3e4a42', s=>`<path d="M40 160V110a60 60 0 01120 0v50z" fill="#2a312c"/><path d="M62 160v-48a38 38 0 0176 0v48z" fill="#141915"/><path d="M60 160l80-30" stroke="#b8b8a8" stroke-width="3"/><circle cx="100" cy="98" r="5" fill="#f3d58a"/>`],
  museum: ['#c7c1b0','#6e6a5e', s=>`<rect x="40" y="90" width="120" height="70" fill="#7b6e5c"/>${[0,1,2,3,4,5].map(i=>`<rect x="${50+i*18}" y="104" width="10" height="16" fill="#f3d58a"/><rect x="${50+i*18}" y="130" width="10" height="16" fill="#f3d58a"/>`).join('')}<rect x="36" y="82" width="128" height="10" fill="#5a4f40"/>`],
  mount:  ['#bcd0d6','#6f9aa8', s=>`<path d="M0 160l60-90 30 40 30-60 80 110z" fill="#3f5f53"/><path d="M120 50l-14 28 10-6 8 8 10-10z" fill="#fff"/><path d="M60 70l-12 18 8-4 6 6z" fill="#fff"/>`],
  falls:  ['#a9c3b4','#3e6b55', s=>`<path d="M0 60h70v100H0zM130 60h70v100h-70z" fill="#2f4f3e"/><path d="M70 60h60v100H70z" fill="#dfeef0"/><path d="M78 60v100M92 60v100M106 60v100M120 60v100" stroke="#b5d4da" stroke-width="3"/><ellipse cx="100" cy="158" rx="60" ry="10" fill="#fff" opacity=".8"/>`],
  lake:   ['#c8dce0','#7fa7b3', s=>`<path d="M0 110l50-40 40 30 50-50 60 60v10H0z" fill="#4f7464"/><rect x="0" y="118" width="200" height="42" fill="#5e95a6"/><path d="M20 132h40M90 142h50M150 128h30" stroke="#d6eaee" stroke-width="3"/>`],
  wharf:  ['#e9d9b9','#b98d5a', s=>`${[['#b23a2b',20],['#e3b443',54],['#f1ebe0',88],['#a8442f',122],['#e3b443',156]].map(([c,x])=>`<path d="M${x} 160V96l14-20 14 20v64z" fill="${c}" stroke="#4a3220" stroke-width="2"/><rect x="${x+9}" y="110" width="10" height="12" fill="#3a2a1c"/>`).join('')}<rect x="0" y="152" width="200" height="8" fill="#5e4632"/>`],
  glassworks:['#d6c9e0','#8b7aa3', s=>`<path d="M70 150c0-30 10-40 10-70h40c0 30 10 40 10 70z" fill="#cfe8ee" opacity=".85"/><path d="M90 60h20v20H90z" fill="#9fd0dc"/><circle cx="100" cy="120" r="14" fill="#7cc0d0"/>`],
  sculpt: ['#d9d3c4','#8a8471', s=>`<path d="M30 160c20-40 60-50 70-90 10 40 50 50 70 90z" fill="#3f4a44"/><path d="M90 160V100l30-30v90" fill="#c9a24a"/>`],
  harbor: ['#cfe1e6','#7aa4b0', s=>`<rect x="0" y="120" width="200" height="40" fill="#4f88a0"/><path d="M40 120V90h24v30zM76 120V80h22v40zM110 120V94h26v26z" fill="#f4efe6" stroke="#4a3a2c" stroke-width="2"/><path d="M36 92l16-14 16 14M72 82l15-14 15 14M106 96l17-14 17 14" fill="#b23a2b"/><path d="M150 130l14-24v24z" fill="#fff"/>`],
};
function art(kind){
  const [a,b,draw] = ART[kind] || ART.mount;
  const id = 'g'+Math.random().toString(36).slice(2,7);
  return `<svg class="art" viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="display:block;width:100%;height:100%"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="200" height="160" fill="url(#${id})"/>${draw()}</svg>`;
}

// ---------- data ----------
const INTERESTS = [
  {id:'aktiv', label:'Aktiviteter & turer', icon:'hike'},
  {id:'fasil', label:'Lading & fasiliteter', icon:'plug'},
  {id:'natur', label:'Fjellsjøer & utsikt', icon:'mountain'},
  {id:'historie', label:'Museer & historie', icon:'museum'},
  {id:'mat', label:'Lokalmat & gårdsbutikker', icon:'food'},
  {id:'overnatting', label:'Overnatting & arkitektur', icon:'bed'},
  {id:'bade', label:'Badeplasser', icon:'wave'},
  {id:'familie', label:'Familie & lek', icon:'kids'},
];
const S = (o) => o;
const STOPS = {
  kongsberg: S({name:'Sølvgruvene på Kongsberg', place:'Kongsberg', type:'Museum', interest:'historie', art:'mine', from:'1 t 10 min fra Oslo', rating:4.6, n:312, hours:'10–16', dist:'2,4 km', price:'Kr 250',
    desc:'Ta gruvetoget 2,3 km inn i fjellet og se hvordan det ble brutt sølv her i over 300 år. Omvisningen tar rundt 90 minutter, så ta med en ekstra genser.'}),
  mjosey: S({name:'Mjøsey Bakeri', place:'Kongsberg', type:'Bakeri & kafé', interest:'mat', art:'cabin', from:'5 min avstikker', rating:4.8, n:126, hours:'07–17', dist:'400 m', price:'Kr', recommended:true,
    desc:'Lite familiebakeri i et gammelt tømmerhus rett ved riksveien. Kanelboller, surdeigsbrød og kaffe fra lokal brenner. Det er parkering for bobil og lading for elbil i tunet, og bordene ute har utsikt over Lågen.'}),
  heddal: S({name:'Heddal stavkirke', place:'Notodden', type:'Stavkirke', interest:'historie', art:'church', from:'35 min fra Kongsberg', rating:4.7, n:540, hours:'10–17', dist:'0 km', price:'Kr 120',
    desc:'Norges største stavkirke, bygget rundt år 1250. Kirken er fortsatt i bruk, og besøkssenteret ved siden av har kafé og toaletter.'}),
  lindheim: S({name:'Lindheim Ølkompani', place:'Gvarv', type:'Gårdsbryggeri', interest:'mat', art:'glass', from:'25 min fra Notodden', rating:4.5, n:98, hours:'12–20', dist:'1,1 km', price:'Kr Kr',
    desc:'Gårdsbryggeri midt i fruktbygda Gvarv. Smak alkoholfri eplesider og øl brygget på egne epler, og kjøp med deg rett fra gårdsbutikken.'}),
  vemork: S({name:'Vemork industrimuseum', place:'Rjukan', type:'Museum', interest:'historie', art:'museum', from:'1 t 20 min fra Gvarv', rating:4.7, n:410, hours:'10–18', dist:'3 km', price:'Kr 180',
    desc:'Kraftstasjonen fra tungtvannsaksjonen under andre verdenskrig. Gå over hengebroen og se utstillingen om sabotasjen.'}),
  gausta: S({name:'Gaustatoppen', place:'Tinn', type:'Fjelltopp', interest:'natur', art:'mount', from:'25 min fra Rjukan', rating:4.9, n:880, hours:'Hele døgnet', dist:'8 km', price:'Gratis',
    desc:'Fra toppen på 1 883 meter ser du en sjettedel av Norge en klar dag. Gå opp på rundt to timer, eller ta Gaustabanen gjennom fjellet.'}),
  rauland: S({name:'Rauland Gardsmat', place:'Rauland', type:'Gårdsbutikk', interest:'mat', art:'cabin', from:'10 min avstikker', rating:4.6, n:54, hours:'10–18', dist:'900 m', price:'Kr',
    desc:'Gårdsbutikk med spekemat, rømme og flatbrød fra egne dyr. Stopp for en kopp kaffe ved vinduet mot Totak.'}),
  haukeli: S({name:'Haukeliseter fjellstue', place:'Haukelifjell', type:'Fjellstue', interest:'overnatting', art:'cabin', from:'1 t 40 min fra Rauland', rating:4.4, n:230, hours:'08–22', dist:'0 km', price:'Kr Kr',
    desc:'Klassisk fjellstue fra 1890-tallet ved Ståvatn. Spis rømmegrøt i spisesalen eller bli en natt før du kjører over fjellet.'}),
  late: S({name:'Låtefossen', place:'Odda', type:'Foss', interest:'natur', art:'falls', from:'1 t fra Haukeli', rating:4.8, n:760, hours:'Hele døgnet', dist:'0 km', price:'Gratis',
    desc:'Tvillingfossen som faller 165 meter rett ned mot veien. Det finnes en liten rasteplass der du kan parkere og kjenne sprutet.'}),
  roldal: S({name:'Røldal stavkyrkje', place:'Røldal', type:'Stavkirke', interest:'historie', art:'church', from:'Langs veien', rating:4.5, n:140, hours:'10–17', dist:'200 m', price:'Kr 80',
    desc:'Pilegrimskirke fra 1200-tallet med et krusifiks folk har reist til i hundrevis av år.'}),
  sider: S({name:'Hardanger Siderfabrikk', place:'Lofthus', type:'Sideri', interest:'mat', art:'glass', from:'40 min fra Odda', rating:4.7, n:188, hours:'11–18', dist:'600 m', price:'Kr Kr',
    desc:'Smak sider fra Hardanger med utsikt over fjorden. Fabrikken ligger midt i frukthagene langs Sørfjorden.'}),
  voring: S({name:'Vøringsfossen', place:'Eidfjord', type:'Foss', interest:'natur', art:'falls', from:'45 min fra Lofthus', rating:4.8, n:1200, hours:'Hele døgnet', dist:'0 km', price:'Gratis',
    desc:'182 meter fritt fall ned i Måbødalen. Gå over gangbroen og ta trappene til de beste utsiktspunktene.'}),
  eidfjord: S({name:'Badeplass i Eidfjord', place:'Eidfjord', type:'Badeplass', interest:'bade', art:'lake', from:'5 min avstikker', rating:4.3, n:42, hours:'Hele døgnet', dist:'1 km', price:'Gratis',
    desc:'Grunn strand innerst i fjorden med brygge og toaletter. Vannet er kaldt, men barna elsker det.'}),
  voss: S({name:'Rafting på Voss', place:'Voss', type:'Aktivitet', interest:'aktiv', art:'lake', from:'1 t 30 min fra Eidfjord', rating:4.8, n:320, hours:'09–17', dist:'2 km', price:'Kr Kr Kr',
    desc:'Tre timer i elva med guide. Passer fra 12 år, og alt utstyr er inkludert.'}),
  bryggen: S({name:'Bryggen i Bergen', place:'Bergen', type:'Verdensarv', interest:'historie', art:'wharf', from:'1 t 20 min fra Voss', rating:4.7, n:2100, hours:'Hele døgnet', dist:'0 km', price:'Gratis',
    desc:'Hanseatiske trehus fra tiden da Bergen var Nordens største handelsby. Gå inn i de smale smugene bak fasadene.'}),
  floyen: S({name:'Fløyen', place:'Bergen', type:'Utsiktspunkt', interest:'natur', art:'mount', from:'10 min fra Bryggen', rating:4.8, n:1800, hours:'07–23', dist:'800 m', price:'Kr 180',
    desc:'Ta Fløibanen opp og se ut over byen, fjorden og øyene. Det går turstier videre innover fjellet.'}),
  hadeland: S({name:'Hadeland Glassverk', place:'Jevnaker', type:'Glassverk', interest:'historie', art:'glassworks', from:'1 t fra Oslo', rating:4.6, n:900, hours:'10–17', dist:'0 km', price:'Gratis',
    desc:'Se glassblåserne jobbe i hytta fra 1762, og kjøp seconds i butikken.'}),
  kistefos: S({name:'Kistefos skulpturpark', place:'Jevnaker', type:'Kunst', interest:'aktiv', art:'sculpt', from:'1 t 10 min fra Oslo', rating:4.8, n:1300, hours:'11–17', dist:'0 km', price:'Kr 200',
    desc:'Skulpturpark og museumsbygget The Twist, som vrir seg over elva.'}),
  drobak: S({name:'Drøbak', place:'Frogn', type:'Kystby', interest:'bade', art:'harbor', from:'40 min fra Oslo', rating:4.5, n:600, hours:'Hele døgnet', dist:'0 km', price:'Gratis',
    desc:'Hvite trehus, akvarium og badeplasser ved Oslofjorden.'}),
};
const PLAN = { // per day: planned stops + suggestions along the road
  1:{title:'Oslo → Gvarv', km:178, time:'3 t 05 min', stops:['kongsberg','heddal','lindheim'], sugg:['mjosey']},
  2:{title:'Gvarv → Rauland', km:154, time:'2 t 50 min', stops:['vemork','gausta'], sugg:['rauland']},
  3:{title:'Rauland → Odda', km:162, time:'2 t 45 min', stops:['haukeli','late'], sugg:['roldal']},
  4:{title:'Odda → Eidfjord', km:74, time:'1 t 25 min', stops:['sider','voring'], sugg:['eidfjord']},
  5:{title:'Eidfjord → Bergen', km:150, time:'2 t 40 min', stops:['voss','bryggen'], sugg:['floyen']},
};
// coordinates [lat, lng] for map pins
const LL = {
  kongsberg:[59.651,9.578], mjosey:[59.668,9.650], heddal:[59.5795,9.1747], lindheim:[59.388,9.177],
  vemork:[59.873,8.495], gausta:[59.851,8.654], rauland:[59.700,8.040], haukeli:[59.814,7.204],
  late:[59.948,6.585], roldal:[59.832,6.818], sider:[60.326,6.664], voring:[60.426,7.252],
  eidfjord:[60.467,7.072], voss:[60.628,6.417], bryggen:[60.397,5.324], floyen:[60.395,5.343],
  hadeland:[60.233,10.383], kistefos:[60.257,10.389], drobak:[59.663,10.630],
};
for (const id in LL) STOPS[id].ll = LL[id];
const CITY = {
  'Oslo':[59.913,10.752], 'Bergen':[60.392,5.324], 'Ålesund':[62.472,6.155], 'Trondheim':[63.430,10.395], 'Bodø':[67.280,14.405],
  'Stavanger':[58.970,5.733], 'Kristiansand':[58.146,7.996], 'Tromsø':[69.649,18.956], 'Lofoten':[68.234,14.564], 'Skien':[59.209,9.609],
  'Dalen':[59.445,8.004], 'Molde':[62.737,7.160], 'Kristiansund':[63.110,7.728], 'Lom':[61.838,8.567], 'Stryn':[61.904,6.716],
  'Odda':[60.069,6.546], 'Jevnaker':[60.240,10.380], 'Frogn':[59.660,10.630], 'Kongsberg':[59.668,9.650],
};
const POPULAR = [['Oslo','Bergen'],['Bergen','Ålesund'],['Trondheim','Bodø'],['Stavanger','Kristiansand'],['Tromsø','Lofoten']];
const EXPLORE = [
  {t:'Hardanger i frukttiden', s:'3 dager · fjord, sider og fosser', art:'falls', from:'Bergen', to:'Odda'},
  {t:'Telemarkskanalen', s:'2 dager · sluser og stavkirker', art:'church', from:'Skien', to:'Dalen'},
  {t:'Atlanterhavsveien', s:'1 dag · kyst og broer', art:'lake', from:'Molde', to:'Kristiansund'},
  {t:'Gamle Strynefjellsvei', s:'2 dager · snø om sommeren', art:'mount', from:'Lom', to:'Stryn'},
];

// ---------- state ----------
const state = {
  screen:'home', stack:[], tab:'plan',
  from:'Oslo', to:'Bergen', via:[], days:5, flex:true, vehicle:'Bil',
  interests:new Set(['mat','historie']),
  day:1, added:{}, saved:new Set(['gausta']), current:null, justAdded:null,
  plan:'fremhevet', registered:false, asking:false, asked:false,
  mapDay:1, mapSugg:true,
};
const dayCount = () => Math.min(state.days, 5);
const dayStops = d => [...(PLAN[d]?.stops||[]), ...(state.added[d]||[])];
const daySugg = d => (PLAN[d]?.sugg||[]).filter(id => !(state.added[d]||[]).includes(id));
const totalStops = () => { let n=0; for(let d=1; d<=dayCount(); d++) n += dayStops(d).length; return n; };
const totalKm = () => { let n=0; for(let d=1; d<=dayCount(); d++) n += PLAN[d].km; return n; };
const isAdded = id => Object.values(state.added).some(a => a.includes(id));
const dayOf = id => { for (const d in PLAN) if (PLAN[d].stops.includes(id) || PLAN[d].sugg.includes(id)) return +d; return null; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ---------- screens ----------
const screens = {
home(){
  const plan = state.tab === 'plan';
  return `
  <div class="hero">
    <div class="topbar">
      <div class="brand"><span class="mark">${ic('car')}</span>Biltur Norge</div>
      <div style="display:flex;gap:8px"><button class="iconbtn" aria-label="Varsler" data-act="toast" data-msg="Ingen nye varsler">${ic('bell')}</button><button class="iconbtn" aria-label="Profil" data-nav="profile">${ic('user')}</button></div>
    </div>
    <h1 class="display">Planlegg bilturen din i Norge</h1>
    <p>Finn stoppene som gjør turen verdt det: lokalmat, utsikt og historie langs veien.</p>
  </div>
  <div class="planner">
    <div class="seg" role="tablist">
      <button role="tab" class="${plan?'on':''}" data-act="tab" data-v="plan">Planlegg rute</button>
      <button role="tab" class="${!plan?'on':''}" data-act="tab" data-v="explore">Utforsk</button>
    </div>
    ${plan ? `
    <div class="fields">
      <label class="field"><span class="lbl">Fra</span><input id="from" value="${esc(state.from)}" data-bind="from" aria-label="Fra"></label>
      <button class="swap" aria-label="Bytt fra og til" data-act="swap">${ic('swap')}</button>
      ${state.via.map((v,i)=>`<label class="field"><span class="lbl">Via</span><input id="via${i}" value="${esc(v)}" placeholder="Sted underveis" data-via="${i}" aria-label="Stopp underveis"><button aria-label="Fjern stopp" data-act="rmvia" data-i="${i}">${ic('minus')}</button></label>`).join('')}
      <label class="field"><span class="lbl">Til</span><input id="to" value="${esc(state.to)}" data-bind="to" aria-label="Til"></label>
    </div>
    <button class="addstop" data-act="addvia">${ic('plus')} Legg til stopp underveis</button>
    <div class="row">
      <div style="display:flex;align-items:center;gap:8px"><span style="font-weight:600">Antall dager</span>
        <div class="stepper"><button aria-label="Færre dager" data-act="days" data-d="-1">${ic('minus')}</button><output id="daysOut">${state.days}</output><button aria-label="Flere dager" data-act="days" data-d="1">${ic('plus')}</button></div>
      </div>
      <div style="display:flex;align-items:center;gap:8px"><span style="font-weight:600">Fleksibel</span><button class="toggle ${state.flex?'on':''}" role="switch" aria-checked="${state.flex}" aria-label="Fleksible datoer" data-act="flex"></button></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <span class="eyebrow">Biltype</span>
      <div class="chips">${['Bil','MC','Bobil','Campingvogn'].map(b=>`<button class="chip ${state.vehicle===b?'on':''}" aria-pressed="${state.vehicle===b}" data-act="vehicle" data-v="${b}">${b}</button>`).join('')}</div>
    </div>
    <button class="cta" data-act="find">Finn ruter nå ${ic('arrow')}</button>
    ` : `
    <div class="explore-list">${EXPLORE.map((e,i)=>`<button class="explore-item" data-act="explore" data-i="${i}"><span class="art">${art(e.art)}</span><span style="flex:1;min-width:0"><b>${e.t}</b><span>${e.s}</span></span>${ic('chev')}</button>`).join('')}</div>
    `}
  </div>
  <div class="section-h"><h2>Populære ruter</h2></div>
  <div class="hscroll">${POPULAR.map(([a,b])=>`<button class="chip" data-act="popular" data-a="${a}" data-b="${b}">${a} → ${b}</button>`).join('')}</div>
  <div class="section-h"><h2>Perfekt for en dag</h2><span class="muted" style="font-size:12px">Fra Oslo</span></div>
  <div class="hscroll">${['hadeland','kistefos','drobak'].map(id=>`<button class="daycard" data-act="open" data-id="${id}"><div class="art">${art(STOPS[id].art)}</div><div class="t">${STOPS[id].name}<small>${STOPS[id].from}</small></div></button>`).join('')}</div>
  <div class="spacer"></div>`;
},

interests(){
  const n = state.interests.size;
  return `
  <div class="topbar"><button class="iconbtn light" aria-label="Tilbake" data-act="back">${ic('back')}</button><span class="muted" style="font-weight:600;font-size:12px">Steg 2 av 3</span></div>
  <div class="progress"><i></i></div>
  <div class="pad" style="padding-top:18px">
    <h1 class="display" style="font-size:30px">Hva vil dere oppleve på turen?</h1>
    <p class="muted" style="margin:8px 0 0;line-height:1.45">Velg så mange du vil. Vi foreslår stopp langs ${esc(state.from)} → ${esc(state.to)} som passer dere.</p>
  </div>
  <div class="int-grid">${INTERESTS.map(i=>{const on=state.interests.has(i.id);return `<button class="int ${on?'on':''}" aria-pressed="${on}" data-act="interest" data-id="${i.id}">${ic(i.icon)}<span>${i.label}</span><span class="tick">${on?ic('check'):''}</span></button>`}).join('')}</div>
  <div class="sticky-foot"><button class="cta" data-act="suggest" ${n?'':'disabled'}>Vis forslag til rute (${n} valgt) ${ic('arrow')}</button></div>`;
},

route(){
  const d = state.day, days = dayCount(), p = PLAN[d];
  const stops = dayStops(d), sugg = daySugg(d);
  return `
  <div class="route-head">
    <button class="iconbtn light" aria-label="Tilbake" data-act="back">${ic('back')}</button>
    <div style="flex:1;min-width:0"><h1 class="display">${esc(state.from)} → ${esc(state.to)}</h1><div class="sub" id="routeSub">${days} ${days>1?'dager':'dag'} · ca. ${totalKm()} km · ${totalStops()} stopp</div></div>
    <button class="iconbtn light" aria-label="Endre rute" data-act="home">${ic('edit')}</button>
  </div>
  <div class="mapwrap"><div id="lmap" class="lmap"></div><button class="maplabel" data-act="fullmap">${ic('expand')} Åpne kart</button><div class="tile-note" hidden>${TILE_NOTE}</div></div>
  <div class="days" role="tablist">${Array.from({length:days},(_,i)=>`<button role="tab" class="day ${d===i+1?'on':''}" data-act="day" data-d="${i+1}">Dag ${i+1}</button>`).join('')}</div>
  <div class="dayinfo" id="dayinfo">Dag ${d} · ${p.title} · ${p.km} km · ${p.time} kjøring</div>
  <div class="list">${stops.map((id,i)=>itemHTML(id,i+1,d)).join('')}</div>
  ${sugg.length ? `<div class="section-h" style="padding-top:18px"><h2 style="font-size:18px">Forslag langs veien</h2></div>
  <div class="list">${sugg.map(id=>`<div class="item"><button style="display:contents" data-act="open" data-id="${id}"><span class="art">${art(STOPS[id].art)}</span><span class="txt"><b>${STOPS[id].name}</b><small>${STOPS[id].type} · ${STOPS[id].from}</small>${STOPS[id].recommended?'<span class="badge y">Anbefalt stopp</span>':''}</span></button><button class="addmini" aria-label="Legg ${esc(STOPS[id].name)} til i ruten" data-act="add" data-id="${id}">${ic('plus')}</button></div>`).join('')}</div>` : ''}
  <div class="pad" style="padding-top:18px;padding-bottom:18px">
    ${d < days ? `<button class="cta green" data-act="day" data-d="${d+1}">Fortsett til dag ${d+1} ${ic('arrow')}</button>`
               : `<button class="cta" data-act="saveRoute">Lagre ruten ${ic('check')}</button>`}
  </div>`;
},

detail(){
  const id = state.current, s = STOPS[id], added = isAdded(id) || (PLAN[dayOf(id)]?.stops||[]).includes(id), saved = state.saved.has(id);
  const onRoute = dayOf(id) !== null;
  return `
  <div class="d-hero">${art(s.art)}
    <div class="tools"><button class="iconbtn light" aria-label="Tilbake" data-act="back">${ic('back')}</button><button class="iconbtn light" aria-label="${saved?'Fjern fra lagret':'Lagre'}" data-act="save" data-id="${id}">${ic('bookmark')}</button></div>
  </div>
  <div class="d-body">
    ${s.recommended?'<span class="badge y" style="align-self:flex-start;margin:0">Anbefalt stopp</span>':''}
    <div><h1 class="display">${s.name}</h1>
      <div class="rating" style="margin-top:6px">${ic('star')}<b style="color:var(--ink)">${String(s.rating).replace('.',',')}</b> (${s.n}) · ${s.type} · ${s.place}</div></div>
    <div class="d-actions">
      ${onRoute ? (added ? `<button class="cta green" data-act="toRoute" data-id="${id}">${ic('check')} Lagt til i ruten</button>`
                         : `<button class="cta green" data-act="add" data-id="${id}">${ic('plus')} Legg til rute</button>`)
                : `<button class="cta green" data-act="dayTrip" data-id="${id}">${ic('route')} Planlegg dagstur hit</button>`}
      <button class="sq ${saved?'on':''}" aria-label="${saved?'Fjern fra lagret':'Lagre'}" aria-pressed="${saved}" data-act="save" data-id="${id}">${ic('bookmark')}</button>
    </div>
    <p class="d-desc">${s.desc}</p>
    <div class="mapwrap stopmap"><div id="lmap" class="lmap"></div><div class="tile-note" hidden>${TILE_NOTE}</div></div>
    <div class="facts"><div><small>Åpent i dag</small><b>${s.hours}</b></div><div><small>Fra ruten</small><b>${s.dist}</b></div><div><small>Pris</small><b>${s.price}</b></div></div>
    <div><div class="eyebrow" style="margin-bottom:8px">Fra følgere</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div class="review"><header><span class="avatar">HK</span>Hanne K. <span class="muted" style="font-weight:500;margin-left:auto">${ic('star')} 5</span></header><p>Stoppet her på vei vestover i juli. Verdt avstikkeren, og det var lett å parkere med henger.</p></div>
        <div class="review"><header><span class="avatar">OS</span>Ola og Sigrid <span class="muted" style="font-weight:500;margin-left:auto">${ic('star')} 4</span></header><p>Fint sted å strekke på beina med barna. Kom tidlig i helgene.</p></div>
      </div></div>
    <div class="ask">${state.asked ? `<div class="review"><b>Spørsmålet er sendt</b><p class="muted">${s.name} svarer vanligvis innen en dag. Svaret dukker opp her.</p></div>`
      : state.asking ? `<form data-form="ask" style="display:flex;flex-direction:column;gap:8px"><textarea id="askText" placeholder="F.eks. har dere glutenfritt brød?" required></textarea><button class="cta green" type="submit">Send spørsmål</button></form>`
      : `<button class="btn-outline" data-act="ask">Spørsmål til eieren?</button>`}</div>
    <button class="owner-link" data-go="biz">${ic('store')}<span>Driver du et sted langs veien? Bli synlig for bilturister.</span>${ic('chev')}</button>
  </div>`;
},

biz(){
  const plans = [
    {id:'synlig', t:'Synlig plassering', s:'Stedet ditt vises på kartet for alle som kjører forbi.', p:'Gratis'},
    {id:'fremhevet', t:'Fremhevet stopp', s:'Merket «Anbefalt stopp» og foreslått til reisende med riktige interesser.', p:'Kr 1 499/mnd', tag:'Mest valgt'},
    {id:'partner', t:'Partner', s:'Egne tilbud i appen, statistikk over besøkende og fast plass i populære ruter.', p:'Kr 3 990/mnd'},
  ];
  return `
  <div class="biz-hero">
    <div class="topbar"><button class="iconbtn" aria-label="Tilbake" data-act="back">${ic('back')}</button></div>
    <div class="eyebrow">For lokale aktører</div>
    <h1 class="display">Bli oppdaget av bilturister langs veien</h1>
    <p>Reisende planlegger stoppene sine før de setter seg i bilen. Sørg for at kafeen, gårdsbutikken eller campingplassen din er med.</p>
  </div>
  ${state.registered ? `
  <div class="success"><span class="ok">${ic('check')}</span><h2 class="display" style="font-size:24px">Takk, vi har mottatt registreringen</h2>
    <p class="muted" style="margin:0;line-height:1.5">Vi går gjennom bedriften og tar kontakt innen to virkedager. Valgt pakke: <b style="color:var(--ink)">${plans.find(p=>p.id===state.plan).t}</b>.</p>
    <button class="btn-outline" data-act="home">Tilbake til forsiden</button></div>` : `
  <div class="benefits">
    <div class="benefit"><span class="bi">${ic('pin')}</span><div><b>Bli et stopp i rutene</b><span>Stedet ditt foreslås når noen planlegger en tur forbi.</span></div></div>
    <div class="benefit"><span class="bi">${ic('eye')}</span><div><b>Synlig for riktige reisende</b><span>Vi matcher deg med folk som har valgt interesser som lokalmat eller historie.</span></div></div>
    <div class="benefit"><span class="bi">${ic('clock')}</span><div><b>Enkelt oppsett</b><span>Legg inn åpningstider og bilder på et par minutter.</span></div></div>
  </div>
  <div class="section-h"><h2>Velg synlighet</h2></div>
  <div class="plans" role="radiogroup">${plans.map(p=>`<button class="plan ${state.plan===p.id?'on':''}" role="radio" aria-checked="${state.plan===p.id}" data-act="plan" data-v="${p.id}"><div><b>${p.t}${p.tag?`<span class="tag">${p.tag}</span>`:''}</b><span>${p.s}</span></div><span class="price">${p.p}</span></button>`).join('')}</div>
  <form class="form" data-form="biz">
    <label>Bedriftsnavn<input id="bizName" required placeholder="F.eks. Mjøsey Bakeri"></label>
    <label>Type sted<select id="bizType"><option>Kafé eller bakeri</option><option>Gårdsbutikk</option><option>Overnatting</option><option>Aktivitet</option><option>Museum eller attraksjon</option></select></label>
    <label>Sted<input id="bizPlace" required placeholder="F.eks. Kongsberg"></label>
    <button class="cta" type="submit">Registrer bedriften din ${ic('arrow')}</button>
  </form>`}`;
},

map(){
  const days = dayCount(), md = state.mapDay;
  return `<div class="fullmap"><div id="lmap" class="lmap"></div>
  <div class="map-top"><button class="iconbtn light" aria-label="Tilbake" data-act="back">${ic('back')}</button>
    <div class="map-title"><b>${esc(state.from)} → ${esc(state.to)}</b><small>${md ? `Dag ${md} · ${PLAN[md].title}` : `Hele turen · ${totalStops()} stopp`}</small></div></div>
  <div class="map-chips"><button class="chip ${!md?'on':''}" data-act="mapday" data-d="0">Hele turen</button>${Array.from({length:days},(_,i)=>`<button class="chip ${md===i+1?'on':''}" data-act="mapday" data-d="${i+1}">Dag ${i+1}</button>`).join('')}<button class="chip ${state.mapSugg?'on':''}" aria-pressed="${state.mapSugg}" data-act="mapsugg">${ic('plus')} Forslag</button></div>
  <button class="iconbtn light locate" aria-label="Vis min posisjon" data-act="locate">${ic('locate')}</button>
  <div class="tile-note" hidden>${TILE_NOTE}</div></div>`;
},

saved(){
  const ids = [...state.saved];
  return `<div class="plain-h"><h1 class="display">Lagret</h1><p class="muted" style="margin:6px 0 0">Steder du vil huske til neste tur.</p></div>
  <div class="list" style="padding-top:8px">${ids.length ? ids.map(id=>itemHTML(id,null,null)).join('') : `<div class="empty">Trykk på bokmerket på et stopp for å lagre det her.</div>`}</div><div class="spacer"></div>`;
},

profile(){
  return `<div class="plain-h"><h1 class="display">Profil</h1></div>
  <div class="pad" style="display:flex;align-items:center;gap:12px;padding-bottom:16px"><span class="avatar" style="width:52px;height:52px;font-size:16px">G</span><div><b>Gjest</b><div class="muted" style="font-size:12px">Logg inn for å synkronisere rutene dine</div></div></div>
  <div class="menu">
    <button data-nav="route">${ic('route')}<span>Mine ruter</span>${ic('chev')}</button>
    <button data-nav="saved">${ic('bookmark')}<span>Lagrede steder</span>${ic('chev')}</button>
    <button data-act="toast" data-msg="Innstillinger er ikke med i prototypen">${ic('settings')}<span>Innstillinger</span>${ic('chev')}</button>
  </div>
  <div class="pad" style="padding-top:16px"><button class="owner-link" data-go="biz" style="width:100%">${ic('store')}<span>For lokale aktører: bli synlig for bilturister</span>${ic('chev')}</button></div>`;
},
};

function itemHTML(id, n, d){
  const s = STOPS[id];
  const userAdded = d && (state.added[d]||[]).includes(id);
  const match = state.interests.has(s.interest);
  const badge = userAdded ? '<span class="badge g">Lagt til av deg</span>' : (match && d ? '<span class="badge y">Passer dine interesser</span>' : '');
  return `<button class="item ${state.justAdded===id?'new':''}" data-act="open" data-id="${id}">${n?`<span class="num">${n}</span>`:''}<span class="art">${art(s.art)}</span><span class="txt"><b>${s.name}</b><small>${s.type} · ${s.from}</small>${badge}</span><span class="chev">${ic('chev')}</span></button>`;
}

// ---------- map (Leaflet + OpenStreetMap) ----------
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_NOTE = 'Kartbildene fra OpenStreetMap blir blokkert i denne visningen. Åpne index.html direkte i nettleseren for å se hele kartet.';
let lmap = null;
const routeCache = {};

function cityLL(name, which){
  const k = Object.keys(CITY).find(c => c.toLowerCase() === String(name).trim().toLowerCase());
  return CITY[k] || (which === 'from' ? CITY.Oslo : CITY.Bergen);
}
// Ordered waypoints for the whole trip: start city, every planned stop day by day, end city.
function tripPoints(){
  const pts = [{ll:cityLL(state.from,'from'), end:'from'}];
  for (let d=1; d<=dayCount(); d++) dayStops(d).forEach((id,k) => pts.push({ll:STOPS[id].ll, id, d, k}));
  pts.push({ll:cityLL(state.to,'to'), end:'to'});
  return pts;
}
// Waypoint index range for one day: from the previous day's last stop to this day's last stop.
function dayRange(pts, d){
  let start = 0; pts.forEach((p,i) => { if (p.d && p.d < d) start = i; });
  let end = d === dayCount() ? pts.length-1 : pts.map(p => p.d).lastIndexOf(d);
  return [start, Math.max(start, end)];
}
function pinIcon(html, cls){
  const size = cls === 'dim' ? [14,14] : cls === 'end' ? [120,26] : cls === 'me' ? [18,18] : [28,28];
  return L.divIcon({className:'mk', html:`<span class="mpin ${cls}">${html}</span>`, iconSize:size});
}
function popHTML(id, sugg){
  const s = STOPS[id];
  return `<div class="pop"><b>${s.name}</b><small>${s.type} · ${s.place}</small><div class="pop-actions"><button class="pop-btn" data-pact="open" data-id="${id}">Se stoppet</button>${sugg ? `<button class="pop-btn y" data-pact="add" data-id="${id}">${ic('plus')} Legg til</button>` : ''}</div></div>`;
}
function popAction(act, id){
  if (act === 'open'){ state.current = id; go('detail'); }
  if (act === 'add'){ addStop(id); if (state.mapDay) state.mapDay = state.day; render(); toast(`${STOPS[id].name} er lagt til dag ${state.day}`); }
}
const fmtMin = m => { m = Math.round(m); return `${Math.floor(m/60)} t ${String(m%60).padStart(2,'0')} min`; };

// Real driving route from the public OSRM server (OpenStreetMap data). Null when unreachable.
function getRoute(lls){
  const key = lls.map(l => l.join(',')).join(';');
  return routeCache[key] ||= (async () => {
    try {
      const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 8000);
      const coords = lls.map(([la,lo]) => `${lo},${la}`).join(';');
      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`, {signal:ctl.signal});
      clearTimeout(t);
      const j = await res.json();
      if (j.code !== 'Ok') return null;
      const r = j.routes[0], geom = r.geometry.coordinates.map(([lo,la]) => [la,lo]);
      // index of each waypoint along the geometry, so a single day can be highlighted
      const idx = []; let from = 0;
      for (const w of j.waypoints){
        const [lo,la] = w.location; let best = from, bd = Infinity;
        for (let i = from; i < geom.length; i++){ const dd = (geom[i][0]-la)**2 + (geom[i][1]-lo)**2; if (dd < bd){ bd = dd; best = i; } }
        idx.push(best); from = best;
      }
      return {geom, idx, legs:r.legs.map(l => ({km:l.distance/1000, min:l.duration/60}))};
    } catch { return null; }
  })();
}

function mountMap(mode){
  const el = document.getElementById('lmap'); if (!el) return;
  const note = el.parentElement.querySelector('.tile-note');
  if (!window.L){ if (note){ note.textContent = 'Kartet kunne ikke lastes. Sjekk nettforbindelsen.'; note.hidden = false; } return; }
  const m = lmap = L.map(el, {zoomControl:false, scrollWheelZoom: mode === 'full'});
  m.attributionControl.setPrefix(false);
  L.control.zoom({position: mode === 'full' ? 'bottomright' : 'topleft'}).addTo(m);
  const tiles = L.tileLayer(TILE_URL, {maxZoom:18, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(m);
  let ok = false, errs = 0;
  tiles.on('tileload', () => { ok = true; if (note) note.hidden = true; });
  tiles.on('tileerror', () => { if (++errs >= 2 && !ok && note) note.hidden = false; });
  m.on('popupopen', e => e.popup.getElement().querySelectorAll('[data-pact]').forEach(b =>
    b.addEventListener('click', ev => { ev.preventDefault(); popAction(b.dataset.pact, b.dataset.id); })));
  setTimeout(() => { if (lmap === m) m.invalidateSize(); }, 320);
  if (mode === 'stop'){
    const s = STOPS[state.current];
    L.marker(s.ll, {icon:pinIcon(ic('pin'), 'cur'), title:s.name}).addTo(m);
    m.setView(s.ll, 11);
    return;
  }
  drawTrip(m, mode);
}

function drawTrip(m, mode){
  const pts = tripPoints(), lls = pts.map(p => p.ll), days = dayCount();
  const all = mode === 'full' && !state.mapDay;
  const d = mode === 'full' && state.mapDay ? state.mapDay : state.day;
  const [a, b] = dayRange(pts, d);
  const base = L.polyline(lls, {color:'#c4683b', weight:3, opacity:.9, dashArray:'4 8'}).addTo(m);
  const hi = L.polyline([], {color:'#1f3d2d', weight:5, opacity:.9}).addTo(m);
  const setGeom = (geom, idx, real) => {
    base.setLatLngs(geom);
    base.setStyle({dashArray: real ? null : '4 8', weight: real ? 4 : 3, opacity: real ? .75 : .9});
    hi.setLatLngs(all ? [] : geom.slice(idx[a], idx[b] + 1));
  };
  setGeom(lls, lls.map((_,i) => i), false);

  let n = 0;
  pts.forEach(p => {
    if (p.end){ L.marker(p.ll, {icon:pinIcon(esc(p.end === 'from' ? state.from : state.to), 'end'), keyboard:false, interactive:false, zIndexOffset:500}).addTo(m); return; }
    n++;
    const cur = all || p.d === d;
    L.marker(p.ll, {icon:pinIcon(cur ? (all ? n : p.k + 1) : '', cur ? 'cur' : 'dim'), title:STOPS[p.id].name, zIndexOffset: cur ? 400 : 0})
      .bindPopup(popHTML(p.id, false), {closeButton:false}).addTo(m);
  });
  if (mode !== 'full' || state.mapSugg){
    for (let dd = 1; dd <= days; dd++){
      if (!all && dd !== d) continue;
      daySugg(dd).forEach(id => L.marker(STOPS[id].ll, {icon:pinIcon('+', 'sugg'), title:STOPS[id].name})
        .bindPopup(popHTML(id, true), {closeButton:false}).addTo(m));
    }
  }
  m.fitBounds(L.latLngBounds(all ? lls : lls.slice(a, b + 1)), {padding: mode === 'full' ? [70,70] : [28,28]});

  getRoute(lls).then(r => {
    if (lmap !== m || !r) return;
    setGeom(r.geom, r.idx, true);
    if (mode === 'route') showRealDistances(r, a, b);
  });
}
function showRealDistances(r, a, b){
  const day = r.legs.slice(a, b).reduce((s,l) => ({km:s.km + l.km, min:s.min + l.min}), {km:0, min:0});
  const tot = r.legs.reduce((s,l) => s + l.km, 0), days = dayCount();
  const di = document.getElementById('dayinfo'), rs = document.getElementById('routeSub');
  if (di) di.textContent = `Dag ${state.day} · ${PLAN[state.day].title} · ${Math.round(day.km)} km · ${fmtMin(day.min)} kjøring`;
  if (rs) rs.textContent = `${days} ${days > 1 ? 'dager' : 'dag'} · ${Math.round(tot)} km kjørevei · ${totalStops()} stopp`;
}
function locateMe(){
  if (!navigator.geolocation){ toast('Posisjon støttes ikke i denne nettleseren'); return; }
  navigator.geolocation.getCurrentPosition(p => {
    if (!lmap) return;
    const ll = [p.coords.latitude, p.coords.longitude];
    L.marker(ll, {icon:pinIcon('', 'me'), title:'Du er her', zIndexOffset:900}).addTo(lmap);
    lmap.flyTo(ll, 11);
  }, () => toast('Fikk ikke tilgang til posisjonen din'), {timeout:8000});
}

// ---------- router ----------
const NAV = [['home','Hjem','home'],['route','Ruter','route'],['saved','Lagret','bookmark'],['profile','Profil','user']];
const NAV_SCREENS = new Set(['home','route','saved','profile']);
const $screen = document.getElementById('screen'), $nav = document.getElementById('nav'), $toast = document.getElementById('toast');

function render(dir){
  if (lmap){ lmap.remove(); lmap = null; }
  $screen.innerHTML = screens[state.screen]();
  $screen.classList.remove('enter','enter-back'); void $screen.offsetWidth;
  if (dir) $screen.classList.add(dir === 'back' ? 'enter-back' : 'enter');
  $nav.hidden = !NAV_SCREENS.has(state.screen);
  $nav.innerHTML = NAV.map(([id,l,i])=>`<button class="${state.screen===id?'on':''}" data-nav="${id}" ${state.screen===id?'aria-current="page"':''}>${ic(i)}${l}</button>`).join('');
  if (state.screen === 'route') mountMap('route');
  else if (state.screen === 'map') mountMap('full');
  else if (state.screen === 'detail') mountMap('stop');
}
function go(screen){ if (screen === state.screen) return; state.stack.push({screen:state.screen, scroll:$screen.scrollTop}); state.screen = screen; resetTransient(); render('fwd'); $screen.scrollTop = 0; }
function back(){ const prev = state.stack.pop(); if (!prev) return; state.screen = prev.screen; resetTransient(); render('back'); $screen.scrollTop = prev.scroll || 0; }
function navTo(screen){ state.stack = []; state.screen = screen; resetTransient(); render('fwd'); $screen.scrollTop = 0; }
function resetTransient(){ state.asking = false; state.asked = false; }
let toastT;
function toast(msg){ $toast.innerHTML = ic('check') + esc(msg); $toast.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(()=>$toast.classList.remove('show'), 2200); }
function addStop(id){
  const d = dayOf(id) || state.day;
  (state.added[d] ||= []); if (!state.added[d].includes(id)) state.added[d].push(id);
  state.day = d; state.justAdded = id;
}

// ---------- events ----------
document.addEventListener('click', e => {
  const nav = e.target.closest('[data-nav]'); if (nav){ navTo(nav.dataset.nav); return; }
  const g = e.target.closest('[data-go]'); if (g){ go(g.dataset.go); return; }
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act, id = el.dataset.id;
  switch (act){
    case 'back': back(); break;
    case 'home': navTo('home'); break;
    case 'toast': toast(el.dataset.msg); break;
    case 'tab': state.tab = el.dataset.v; render(); break;
    case 'swap': [state.from, state.to] = [state.to, state.from]; render(); break;
    case 'addvia': state.via.push(''); render(); document.getElementById('via'+(state.via.length-1))?.focus(); break;
    case 'rmvia': state.via.splice(+el.dataset.i,1); render(); break;
    case 'days': state.days = Math.max(1, Math.min(5, state.days + +el.dataset.d)); state.day = Math.min(state.day, state.days); document.getElementById('daysOut').textContent = state.days; break;
    case 'flex': state.flex = !state.flex; el.classList.toggle('on', state.flex); el.setAttribute('aria-checked', state.flex); break;
    case 'vehicle': state.vehicle = el.dataset.v; render(); break;
    case 'popular': state.from = el.dataset.a; state.to = el.dataset.b; state.tab = 'plan'; render(); toast(`${state.from} → ${state.to} er fylt inn`); break;
    case 'explore': { const x = EXPLORE[+el.dataset.i]; state.from = x.from; state.to = x.to; state.tab = 'plan'; go('interests'); break; }
    case 'find':
      if (!state.from.trim() || !state.to.trim()) { toast('Fyll inn både fra og til'); break; }
      go('interests'); break;
    case 'interest': state.interests.has(id) ? state.interests.delete(id) : state.interests.add(id); render(); break;
    case 'suggest': state.day = 1; state.justAdded = null; go('route'); break;
    case 'day': state.day = +el.dataset.d; state.justAdded = null; render(); $screen.scrollTop = 0; break;
    case 'open': state.current = id; go('detail'); break;
    case 'add': {
      addStop(id);
      if (state.screen === 'detail'){
        // Figma flow: Stoppdetaljer → Rute & Kart 2. Return to the route if we came from it, else open it.
        const prev = state.stack[state.stack.length-1];
        if (prev && prev.screen === 'route') back(); else go('route');
      } else render();
      toast(`${STOPS[id].name} er lagt til dag ${state.day}`);
      break;
    }
    case 'toRoute': state.day = dayOf(id) || 1; state.justAdded = id; go('route'); break;
    case 'dayTrip': state.from = 'Oslo'; state.to = STOPS[id].place; toast(`Dagstur til ${STOPS[id].place} er klar til planlegging`); navTo('home'); break;
    case 'save': state.saved.has(id) ? (state.saved.delete(id), toast('Fjernet fra lagret')) : (state.saved.add(id), toast('Lagret')); render(); break;
    case 'saveRoute': toast('Ruten er lagret under Mine ruter'); break;
    case 'ask': state.asking = true; render(); document.getElementById('askText')?.focus(); break;
    case 'plan': state.plan = el.dataset.v; render(); break;
    case 'fullmap': state.mapDay = state.day; go('map'); break;
    case 'mapday': state.mapDay = +el.dataset.d; if (state.mapDay) state.day = state.mapDay; render(); break;
    case 'mapsugg': state.mapSugg = !state.mapSugg; render(); break;
    case 'locate': locateMe(); break;
  }
});
document.addEventListener('input', e => {
  const b = e.target.dataset.bind; if (b) state[b] = e.target.value;
  const v = e.target.dataset.via; if (v !== undefined) state.via[+v] = e.target.value;
});
document.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target.dataset.form;
  if (f === 'ask'){ state.asking = false; state.asked = true; render(); }
  if (f === 'biz'){ state.registered = true; render(); $screen.scrollTop = 0; }
});

render();
