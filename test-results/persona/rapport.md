# Personatest: Ingrid (39), «Oppdageren»

- **Dato:** 14.11.2026
- **Oppsett:** `app/` på http://localhost:5173, Playwright + Chromium, mobilvisning 390×844. Ingen kode er endret.
- **Metode:** Én simulert gjennomkjøring av fire oppgaver. Bare det som var synlig på skjermen ble brukt; kildekoden er ikke lest.
- **Forbehold:** Personaen bygger på 17 spørreskjemasvar og ett intervju. Del 2 er hypoteser, ikke funn.

## Resultat per oppgave

| # | Oppgave | Resultat |
|---|---|---|
| 1 | Finn lunsj og legg til i ruten | **Løst, med problemer.** Mjøsey Bakeri ble lagt til dag 1, men havnet sist på dagen og økte kjøretiden med over en time. |
| 2 | Finn et unikt sted, og begrunn tilliten | **Delvis løst.** Fant Rauland Gardsmat (4,6 · 54), men anmeldelsene er identiske med bakeriets. |
| 3 | Er dag 2 over 4 timer? | **Løst.** Dag 2 viser 2 t 16 min. Dag 3 viser derimot 6 t 16 min, uten varsel. |
| 4 | Hva koster appen, og er noe betalt reklame? | **Ikke løst.** Ingen pris for reisende etter tre forsøk. Reklame ble funnet indirekte, på bedriftssiden. |

## Tenke-høyt-logg (Ingrid, førsteperson)

**Oppgave 1: lunsj**
- «Oslo og Bergen står der allerede, fint. Fem dager? Nei, tre.» Trykker minus to ganger. ([02](02-tre-dager.png))
- «Hva vil dere oppleve … to er krysset av for meg allerede? Museer har jeg ikke bedt om.» Fjerner Museer, velger utsikt, badeplasser, turer, familie. ([04](04-interesser-valgt.png))
- «Ok, en rute. Sølvgruver, stavkirke, bryggeri. Jeg tok jo vekk museer? Og hvor er badeplassene?» ([05](05-ruteforslag.png))
- «Lunsj … det står ikke lunsj noe sted. Ett forslag: et bakeri. Greit, ett er nok for meg.»
- «4,8 og 126 anmeldelser, det er bra. 400 meter fra ruten. Legger til.» ([06](06-bakeri-trykk.png))
- «Hæ, nå ble dag 1 fire timer? Den var under tre. Og bakeriet står sist, etter bryggeriet. Lunsj til slutt på dagen?» ([08](08-etter-legg-til.png))
- «Blyanten, da kan jeg sikkert flytte det opp.» Havner på startskjermen. «Nei.» ([20](20-endre-rute.png))

**Oppgave 2: unikt sted**
- «Dag 2: industrimuseum og Gaustatoppen. Gaustatoppen kjenner alle. Men en gårdsbutikk i Rauland, det er mer oss.» ([09](09-dag2.png))
- «4,6 og 54 anmeldelser. Egne dyr, utsikt mot Totak. Det høres ekte ut.» ([11](11-rauland-gardsmat.png))
- «Vent. Hanne K. skrev akkurat det samme om bakeriet. Og Ola og Sigrid også. Da stoler jeg ikke på noen av dem.» ([12](12-rauland-anmeldelser.png))
- Svar på «hvorfor stoler du på det?»: «Tallet 4,6 med 54 stemmer hadde vært nok. Men kopierte anmeldelser gjør at jeg sjekker Google Maps i stedet.»

**Oppgave 3: dag 2**
- «Dag 2, Gvarv til Rauland, 2 t 16 min. Det går fint.» ([09](09-dag2.png))
- «Men dag 3 er over seks timer! Og den slutter i Odda? Vi skulle til Bergen.» ([10](10-dag3.png))

**Oppgave 4: pris og reklame**
- Forsøk 1: Profil. «Ingenting om pris eller abonnement.» ([15](15-profil.png))
- Forsøk 2: Innstillinger. «Kommer snart.» ([16](16-innstillinger.png))
- Forsøk 3: Mine ruter og Lagrede steder. «Ikke noe der heller.» ([17](17-mine-ruter.png), [18](18-lagrede-steder.png))
- Står fast, går videre. Pris for reisende: **ikke synlig i appen.**
- Reklame: «For lokale aktører … Fremhevet stopp, merket ‹Anbefalt stopp›, 1 499 kroner i måneden. Så bakeriet jeg la til var en annonse?» ([14](14-for-bedrifter.png))

## 1. Brukbarhetsfunn

Objektive feil og hindre, uavhengig av persona.

| # | Oppgave | Hva skjedde | Alvorlighet | Skjermbilde |
|---|---|---|---|---|
| 1 | 3 | Ruten Oslo → Bergen ender i Odda. Dag 3 heter «Rauland → Odda», og det finnes ingen etappe fram til Bergen. Totaltallene (685 km) dekker dermed ikke hele turen. | Høy | [10](10-dag3.png), [24](24-dag3.png) |
| 2 | 1 | Et stopp merket «400 m fra ruten» / «5 min avstikker» økte dag 1 fra 167 km / 2 t 57 min til 226 km / 4 t 02 min (+59 km, +1 t 05 min). Tallene henger ikke sammen. | Høy | [05](05-ruteforslag.png), [06](06-bakeri-trykk.png), [08](08-etter-legg-til.png) |
| 3 | 4 | «Anbefalt stopp» er betalt plassering (kr 1 499/mnd ifølge «For lokale aktører»), men er ikke merket som annonse for den reisende. Forklaringen finnes bare på bedriftssiden. | Høy | [05](05-ruteforslag.png), [06](06-bakeri-trykk.png), [14](14-for-bedrifter.png) |
| 4 | 2 | Anmeldelsene er ordrett like på Mjøsey Bakeri og Rauland Gardsmat (samme navn, tekst og stjerner). | Høy | [07](07-bakeri-anmeldelser.png), [12](12-rauland-anmeldelser.png) |
| 5 | 4 | Ingen informasjon om hva appen koster for reisende. Sjekket Profil, Innstillinger, Mine ruter og Lagrede steder. | Høy | [15](15-profil.png) |
| 6 | 1 | Nytt stopp legges sist på dagen, ikke der det ligger på veien. Bakeriet i Kongsberg ble stopp 4, etter stopp ved Notodden og Gvarv. På kartet ser dag 2 ut til å starte ved Kongsberg, ikke Gvarv. | Høy | [08](08-etter-legg-til.png), [19](19-apne-kart.png) |
| 7 | 1 | «Endre rute» (blyanten) fører til startskjermen. Fant ingen synlig måte å flytte eller fjerne et stopp på. Knappen på stoppsiden blir «Lagt til i ruten»; om den fjerner stoppet er ikke testet. | Middels | [20](20-endre-rute.png), [23](23-bakeri-i-ruten.png) |
| 8 | 1 | Interessevalget ser ikke ut til å styre forslagene. «Museer & historie» ble fjernet, men ruten har to museer og en stavkirke. «Badeplasser» og «Familie & lek» ble valgt, men ga ingen stopp. | Middels | [04](04-interesser-valgt.png), [05](05-ruteforslag.png), [09](09-dag2.png) |
| 9 | 3 | Dag 3 er 6 t 16 min kjøring uten varsel, og det går ikke an å sette maks kjøretid per dag. | Middels | [10](10-dag3.png) |
| 10 | 1 | Ingen måte å finne lunsj på: verken søk, filter eller kategori for spisesteder. Bare ett forslag per dag. | Middels | [05](05-ruteforslag.png) |
| 11 | 3 | Summen av dagene stemmer ikke med totalen. Før: 167 + 122 + 336 = 625 km, toppen viser 631. Etter: 684 mot 685. | Middels | [05](05-ruteforslag.png), [08](08-etter-legg-til.png) |
| 12 | 2 | Avstand til stopp oppgis ulikt i liste og detalj: «5 min avstikker» mot «400 m», «10 min avstikker» mot «900 m». | Lav | [09](09-dag2.png), [11](11-rauland-gardsmat.png) |
| 13 | 2 | Tallet i parentes (126, 54) viser til anmeldelser, men bare to vises, og det finnes ingen «se alle». | Middels | [07](07-bakeri-anmeldelser.png) |
| 14 | 1 | To interesser er forhåndsvalgt («Museer & historie», «Lokalmat & gårdsbutikker») uten forklaring. | Lav | [03](03-ruteresultat.png) |
| 15 | 1 | Et stort ukrainsk flagg dekker nedre høyre hjørne av de små kartene. På fullskjermkartet har det riktig størrelse. | Lav | [05](05-ruteforslag.png), [19](19-apne-kart.png) |
| 16 | 4 | «Innstillinger» gir bare meldingen «Innstillinger kommer snart». | Lav | [16](16-innstillinger.png) |
| 17 | 4 | «Lagret» inneholder Gaustatoppen selv om ingenting er lagret i økten. | Lav | [18](18-lagrede-steder.png) |
| 18 | 2 | Feltet «Pris» viser bare «Kr», uten forklaring av skalaen. | Lav | [11](11-rauland-gardsmat.png) |
| 19 | 1 | Bekreftelsen «… er lagt til dag 1» legger seg over knappen «Fortsett til dag 2» mens den vises. | Lav | [08](08-etter-legg-til.png) |

Merknad til funn 1: Avstanden Odda–Bergen står ikke i appen, så hvor mye som mangler er ukjent ut fra skjermen.

### Ord appen bruker, og ord Ingrid trolig ville brukt

Ordvalgene til høyre er antakelser. Datagrunnlaget sier ikke hvilke ord hun bruker.

| Appens ord | Ingrids ord (antakelse) |
|---|---|
| «Fra følgere» | anmeldelser |
| «Anbefalt stopp» | annonse / sponset (når hun vet hva det er) |
| «For lokale aktører» | for bedrifter |
| «avstikker» | omvei |
| «Forslag langs veien» | steder i nærheten / tips |
| «Lagret» / «Lagre» | lagrede steder (slik hun gjør i Google Maps) |
| «Bakeri & kafé» | lunsj / spisested |
| «Pris: Kr» | billig / rimelig |
| «Fleksibel» | ukjent, hun forsto ikke hva bryteren gjør |

## 2. Personareaksjoner (hypoteser)

| Reaksjon | Bygger på persona-trekk |
|---|---|
| **Liker:** Ett forslag per dag under «Forslag langs veien». Hun slipper å lete. | Vil ha få forslag, velger bort apper med mange alternativer |
| **Liker:** Kort tekst på stoppsidene, to–tre linjer. | Utålmodig på mobil, leser ikke lange tekster |
| **Liker:** Gårdsbutikk og gårdsbryggeri dukker opp uten at hun søker. | Vil finne gårdsutsalg og unike steder |
| **Liker:** Vurdering med antall (4,8 · 126 og 4,6 · 54) står øverst. Begge er over tersklene hennes. | Stoler på anmeldelser ved ca. 10 eller flere; 4,4 får henne til å lese videre |
| **Misliker:** Like anmeldelser på to steder. Tilliten til tallene forsvinner, og hun går trolig til Google Maps. | Stoler på anmeldelser; bruker Google Maps fra før |
| **Misliker:** Rutens faste stopp er kjente mål (Sølvgruvene, Heddal, Vemork, Gaustatoppen, Låtefossen). | Vil ikke bare ha de kjente turistmålene |
| **Misliker:** Ingen badeplass eller noe for barna, selv om hun valgte det. | Reiser med barn; vil ha badeplasser |
| **Misliker:** Dag 1 hopper til 4 t 02 min og dag 3 er 6 t 16 min, uten varsel. Hun oppdager det kanskje ikke selv. | Maks 3–4 timer om dagen; undervurderer ofte kjøretiden |
| **Misliker:** «Anbefalt stopp» viser seg å være betalt. Hun kan oppleve det som en turistfelle. | Vil unngå turistfeller; betaler bare for noe klart bedre enn gratis |
| **Misliker:** Finner ikke prisen. Uten svar antar hun trolig at det koster, og blir i gratisappene. | Betaler bare hvis appen er klart bedre enn gratisalternativene |
| **Misliker:** Ingen synlig måte å dele ruten med partneren på. | Avklarer planene med partneren |
| **Usikker:** Biltype har «Bobil», som passer sommerturen. Om valget endrer ruten ble ikke testet. | Leier bobil på den store sommerturen |
| **Ukjent:** Om bakeri regnes som «lunsj som passer oss». Grunnlaget sier ikke hva familien spiser eller hvor mye de vil bruke. | – |

## 3. Spørsmål til neste ekte intervju

1. Når du ser merket «Anbefalt stopp», hva tror du det betyr? Hva skjer med tilliten når du får vite at stedet betaler for det?
2. Hva ser du etter når du skal finne lunsj på tur med barn: type sted, pris, ventetid, lekemuligheter? Søker du etter «lunsj», eller ser du på kartet?
3. Hvor vil du ha kjøretiden per dag vist, og vil du ha et varsel når en dag går over grensen din? Regner du pauser og stopp med i «3–4 timer»?
4. Hva må til for at du stoler på en anmeldelse i en ny app, sammenlignet med Google Maps? Betyr det noe hvem som har skrevet den («følgere», venner, fremmede)?
5. Hvordan avklarer du ruten med partneren i dag: skjermbilde, lenke, eller ser dere på samme mobil? Hva ville du forventet av appen her?

## Begrensninger

- Simuleringen kan finne feil i grensesnittet, men ikke måle hva en ekte bruker legger merke til eller bryr seg om.
- Knappene ble funnet via tekst på skjermen. En ekte bruker kan overse ting som automatiseringen fant med en gang, og omvendt.
- Ikke testet: innlogging, «Legg til stopp underveis», biltype «Bobil», registreringsskjemaet for bedrifter, og om «Lagt til i ruten» kan brukes til å fjerne et stopp.
