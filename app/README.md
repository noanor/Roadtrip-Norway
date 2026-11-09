# Roadtrip Norway – app

Mobil-først nettapp for å planlegge bilturer i Norge, bygget fra prototypen i `../prototype`.

## Kom i gang

Krever [Node.js 20 LTS](https://nodejs.org/) eller nyere.

```bash
cd app
npm install
npm run dev
```

Åpne http://localhost:5173.

| Kommando | Hva den gjør |
| --- | --- |
| `npm run dev` | Utviklingsserver med hot reload |
| `npm run build` | Typesjekk og produksjonsbygg til `dist/` |
| `npm run preview` | Server det ferdige bygget lokalt |
| `npm test` | Enhetstester (Vitest) |
| `npm run typecheck` | Kun TypeScript-sjekk |

Kopier `.env.example` til `.env` for å bytte kartfliser eller ruteserver.

### Tester

- `src/domain/*.test.ts`, `src/services/*.test.ts`: turlogikk og ruteberegning, inkludert edge cases som ødelagt lagret data, ukjente steder og en ruteserver som ikke svarer.
- `src/app.test.tsx`: alle sider og hovedflytene i en simulert nettleser (jsdom).

Kjør alt i en ren Linux-container (krever Docker):

```bash
docker build -t roadtrip-norway-app app
```

Bygget stopper hvis typesjekk, tester eller produksjonsbygg feiler. `docker run --rm -p 8080:8080 roadtrip-norway-app` serverer resultatet på http://localhost:8080.

## Struktur

```
src/
  main.tsx, App.tsx    Oppstart og ruter (react-router)
  config.ts            Miljøvariabler (kart- og ruteserver)
  types.ts             Domenetyper – samme form som et fremtidig API bør returnere
  data/                Seed-data fra prototypen (stopp, ruter, interesser, priser)
  domain/trip.ts       Turtilstand (reducer) og rene utregninger, med tester
  services/api.ts      Grensen mot backend. Mock i dag, bytt til HTTP-kall her
  services/routing.ts  Kjørerute fra OSRM (OpenStreetMap-data)
  context/             Tur-tilstand (lagres i localStorage) og toast-meldinger
  components/          Gjenbrukbare komponenter, inkl. kart (Leaflet) i map/
  layouts/AppLayout    App-skall med bunnmeny
  pages/               Én fil per skjerm
  styles/app.css       Fargetokens og stiler fra prototypen
```

| Rute | Skjerm (Figma) |
| --- | --- |
| `/` | Home |
| `/interesser` | Velg interesser |
| `/rute` | Rute & Kart |
| `/rute/kart` | Fullskjermkart |
| `/stopp/:stopId` | Stoppdetaljer |
| `/lagret`, `/profil` | Lagret, Profil |
| `/for-aktorer` | For lokale aktører |

## Videre arbeid

- **Backend:** erstatt mock-funksjonene i `services/api.ts` og seed-dataene i `data/` med API-kall. Typene i `types.ts` er kontrakten.
- **Ruter:** kun Oslo → Bergen er planlagt. Andre fra/til flytter bare start og mål på kartet.
- **Kart:** OpenStreetMap sine fliser og den offentlige OSRM-serveren er bare for utvikling og lav trafikk. Bruk en kommersiell leverandør eller egen server i produksjon.
- **Bilder:** stoppene bruker tegnede illustrasjoner (`StopArt`) til ekte bilder finnes.
- **Innlogging, lagrede ruter og betaling for aktører** er ikke laget.
