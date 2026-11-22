import type { Review } from '../types';

// Seed reviews, written for the prototype: two per stop. They are placeholders, not real reviews.
// Replace with reviews from the backend once it exists (see services/api.ts).
const r = (author: string, rating: number, text: string): Review => ({
  author,
  initials: author
    .split(/\s+/)
    .filter((w) => /^\p{Lu}/u.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join(''),
  rating,
  text,
});

export const REVIEWS: Record<string, Review[]> = {
  kongsberg: [
    r('Marte L.', 5, 'Gruvetoget var høydepunktet for barna. Kaldt inne i fjellet, så ta med jakke.'),
    r('Jon Erik', 4, 'Bra omvisning, men bestill billett på forhånd i fellesferien.'),
  ],
  mjosey: [
    r('Hanne K.', 5, 'Ferske kanelboller og god kaffe. Lett å parkere, også med henger.'),
    r('Ola og Sigrid', 4, 'Hyggelig lunsjstopp med barna. Det var kø rundt klokka tolv.'),
  ],
  heddal: [
    r('Astrid B.', 5, 'Mye større enn jeg trodde. Guiden fortalte godt, og kafeen ved siden av var grei.'),
    r('Per Olav', 4, 'Verdt en halvtime. Fin plen der ungene kunne løpe litt.'),
  ],
  lindheim: [
    r('Ingvild S.', 5, 'Eplemosten var nydelig, og vi fikk se hvordan de brygger.'),
    r('Tomas R.', 4, 'Koselig gård. Åpner ikke før tolv, så vi måtte vente litt.'),
  ],
  vemork: [
    r('Kari N.', 5, 'Sterk historie, godt fortalt. Hengebroen er verdt turen alene.'),
    r('Lars Petter', 4, 'Mye tekst for de minste, men tungtvannskjelleren var spennende.'),
  ],
  gausta: [
    r('Silje H.', 5, 'Vi tok banen opp og gikk ned. Utsikten var helt vill.'),
    r('Anders M.', 5, 'Steinete sti, men åtteåringen klarte det fint. Start tidlig.'),
  ],
  rauland: [
    r('Guro T.', 5, 'Kjøpte spekepølse og flatbrød til resten av turen. Eieren fortalte om gården.'),
    r('Familien Dahl', 4, 'Lite utvalg, men alt er laget der. Barna fikk hilse på geitene.'),
  ],
  haukeli: [
    r('Eirik V.', 4, 'Rømmegrøten er verdt stoppet. Litt dyrt, men stor porsjon.'),
    r('Nina og Paal', 5, 'Vi overnattet og badet i stampen ved vannet. Rolig og fint.'),
  ],
  late: [
    r('Maria J.', 5, 'Du blir våt bare av å gå over broen. Ungene elsket det.'),
    r('Henrik A.', 4, 'Imponerende foss, men trangt å parkere midt på dagen.'),
  ],
  roldal: [
    r('Solveig E.', 5, 'Stille og vakker kirke. Omvisningen tok et kvarter.'),
    r('Bjørn I.', 4, 'Fint lite stopp rett ved veien. Sjekk åpningstidene først.'),
  ],
  sider: [
    r('Camilla F.', 5, 'Smaking med utsikt over fjorden. De hadde eplemost til barna.'),
    r('Kristian W.', 4, 'God sider og hyggelige folk. Smal vei opp til gården.'),
  ],
  voring: [
    r('Line O.', 5, 'Gangbroen over juvet er spektakulær. Sett av en time.'),
    r('Geir S.', 4, 'Mye folk, men god plass på utsiktspunktene. Gratis parkering.'),
  ],
  eidfjord: [
    r('Tone M.', 4, 'Langgrunt og trygt for de små. Kaldt vann, som ventet.'),
    r('Rune og Elin', 5, 'Fin strand med brygge og toalett. Vi ble i to timer.'),
  ],
  voss: [
    r('Stian K.', 5, 'Flinke guider og akkurat passe skummelt. Tolvåringen vil tilbake.'),
    r('Hilde G.', 4, 'Gøy, men det tar en halv dag med alt. Ta med tørt tøy.'),
  ],
  bryggen: [
    r('Emma D.', 5, 'Gå inn i smugene bak husene, der er det roligere.'),
    r('Oddvar P.', 4, 'Flott å se, men veldig mange turister midt på dagen.'),
  ],
  floyen: [
    r('Julie R.', 5, 'Lekeplassen på toppen reddet dagen for barna. Flott utsikt.'),
    r('Magnus T.', 4, 'Kø til banen om formiddagen. Vi gikk ned, det tok 40 minutter.'),
  ],
  hadeland: [
    r('Berit A.', 5, 'Barna fikk blåse sitt eget glass. Mye å se, og gratis inngang.'),
    r('Simen L.', 4, 'Hyggelig område med bakeri og butikker. Fullt i helgene.'),
  ],
  kistefos: [
    r('Ida N.', 5, 'The Twist er enda finere i virkeligheten. Skulpturene langs elva var morsomme for barna.'),
    r('Trond H.', 4, 'Flott park. Beregn to timer, og ta med matpakke.'),
  ],
  drobak: [
    r('Vilde S.', 5, 'Badet ved Badeparken og spiste is i havna. Fin dagstur.'),
    r('Arne J.', 4, 'Koselig by. Vanskelig å finne parkering på solskinnsdager.'),
  ],
};
