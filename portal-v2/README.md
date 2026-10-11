# Autonord People 2.0

Ny medarbejderportal bygget direkte til Cloudflare Workers med statiske assets og D1. Ingen Vinext, Next.js eller Vite. Konto-login håndteres i databasen; `ADMIN_EMAIL` bruges ikke.

## Udgiv fra eksisterende Codespace

Koden ligger i `portal-v2` i repository `jacobnitter-NIT/engagement`. Den eksisterende portal erstattes på samme Worker-adresse ved deploy. Gamle databasetabeller ændres ikke; version 2 bruger separate `an2_*`-tabeller. Eksisterende undersøgelser og konti importeres ikke automatisk.

Kør én kommando ad gangen i `/workspaces/engagement`:

```bash
git pull --ff-only
```

```bash
cd /workspaces/engagement/portal-v2
```

```bash
npm ci
```

```bash
npm run release
```

`release` kontrollerer JavaScript, kører API-tests, bygger en Worker med `--dry-run`, anvender kun den nye versions migrationer og deployer. Wrangler kan bede om bekræftelse på migrationen. Godkend den for at oprette de nye tabeller.

Hvis du har ændringer i det gamle projekt, kan de blive liggende: de nye filer ligger i deres egen mappe. Hvis Git melder konflikt, stop og læs fejlteksten; kassér ikke dine ændringer.

Efter vellykket `release` viser terminalen et **privat opsætningslink**. Åbn linket, og opret din administratorkonto med e-mail, adgangskode og gentagelse af adgangskoden. Der er intet felt til en opsætningsnøgle, og du skal ikke selv vælge eller indtaste en lang nøgle.

`release` genererer nøglen kryptografisk og gemmer den i Cloudflare via den allerede godkendte Wrangler-session. Nøglen findes i linkets URL-fragment, som ikke sendes i GET-requests eller HTTP-accesslogs. Browseren fjerner fragmentet fra adresselinjen ved åbning og anvender nøglen i baggrunden ved konto-oprettelse. Opbevar linket privat, indtil kontoen er oprettet. Hvis du genindlæser siden før oprettelsen, skal du åbne det oprindelige opsætningslink igen.

Kun den første administratorkonto kan oprettes med linket. Når kontoen findes, afvises alle efterfølgende opsætningsforsøg, og portalen viser normalt login. Senere `release` viser blot login-adressen, hvis den kan verificere, at kontoen allerede findes.

Cloudflare-login med Google fungerer fortsat. Det bruges til udgivelse; portalens almindelige login bruger kontoen i databasen. `ADMIN_EMAIL` bruges ikke til portal-login.

## Cloudflare med GitHub-integration

Brug en **Worker** med GitHub repository `jacobnitter-NIT/engagement`, produktionsbranch `main` og projektets rodmappe **portal-v2**.

| Indstilling | Værdi |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npm run db:migrate && npm run deploy` |
| Worker name | `autonord-engagement` |
| D1 binding | `DB` |
| D1 database | `autonord-engagement` |
| Database ID | `482cad6e-1fe7-4fd6-820e-d3b37a7ed89a` |
| Runtime setup secret | `SETUP_TOKEN` oprettes automatisk af `npm run release` |

Konfigurationen ligger direkte i `wrangler.jsonc`; der genereres ingen konfiguration i `dist/server`. Installerede pakker fastlåses med `package-lock.json`. Wrangler er låst til den testede version 4.92.0.

Første opsætning udføres fra Codespace med `npm run release`, som viser dit private link.

GitHub-workflowet `Autonord People checks` kører tests automatisk ved ændringer i `portal-v2`. Cloudflare Git integration håndterer udgivelse. Der er ikke et ekstra GitHub-workflow, som deployer oveni.

## Brug portalen

1. Log ind med din eksisterende administratorkonto.
2. I **Afdelinger**: vedligehold listen. Standard: Værksted, Pladeværksted, Administration og Lager. Der er ingen medarbejdergrunddata eller deltagerudvælgelse.
3. I **Undersøgelser**: tilføj, rediger eller fjern spørgsmål og oversæt alle tre sprog. Angiv eventuelt samlet forventet medarbejderantal for svarprocenten. Godkend de grønlandske tekster, og aktivér.
4. Kopiér det fælles medarbejderlink og send det selv. Portalen sender ikke mails automatisk.
5. Medarbejderen vælger afdeling, e-mail og adgangskode i samme formular og går direkte til spørgsmålene. Kontoen er unik pr. e-mail, og der er én besvarelse pr. konto pr. undersøgelse. Afdelingen gemmes ved første deltagelse i undersøgelsen.
6. Medarbejderen kan logge ind via samme link og gemme, fortsætte eller ændre svar indtil lukning. Eksisterende konti kan deltage i en ny undersøgelse uden en ny konto; vælg afdeling for den nye undersøgelse.
7. Dashboardet viser samlet antal tilmeldte og gennemførte samt samlet deltagelsesstatus. Svarprocenten bruger det forventede antal, hvis det er indtastet. Der er ingen afdelingsstatistik eller tilknytning mellem medarbejder og afdeling i administratorens visning.
8. Luk undersøgelsen for at åbne rapporterne. Samlet rapport og alle afdelinger er tilgængelige uanset antal svar. Afdelinger uden gyldige svar viser ingen score. Afdelingernes svarantal er udeladt fra skærm, CSV, print og rapport-API.

## Metode og reference

Der er 22 spørgsmål: fem engagementsspørgsmål, fem motivationsfaktorer, otte vedligeholdelsesfaktorer, ét eNPS-spørgsmål og tre åbne spørgsmål. Alle spørgsmål kan redigeres eller fjernes i kladder. Skala-, tekst- og eNPS-spørgsmål kan tilføjes (højst ét eNPS-spørgsmål). Spørgsmål fastlåses ved aktivering. Afdelingen gemmes ved medarbejderens første deltagelse i undersøgelsen.

- Engagement: egne danske tilpasninger af fem engagementstemaer fra den britiske **Civil Service People Survey**. Svarkategorien 1–5 omsættes til 0, 25, 50, 75, 100. Indekset er det uvægtede gennemsnit af de fem spørgsmåls gennemsnit. Alle fem skal være til stede med engagement som tema og skala 1–5 og have mindst ét gyldigt svar hver. Fjernes et af de fem spørgsmål, vises intet engagementindeks. Redigerede formuleringer kan ændre sammenligneligheden over tid.
- Motivations- og vedligeholdelsesfaktorer: egne spørgsmål struktureret efter **Herzbergs tofaktorteori**, med danske arbejdsmiljøtemaer som indflydelse, udvikling, ledelse, samarbejde og belastning. Det er en tilpasset ledelsesramme; det er ikke NFA’s validerede DPQ/COPSOQ-skalaer.
- eNPS: procent ambassadører (9–10) minus procent kritikere (0–6). Passive er 7–8. Indekset går fra −100 til +100. Ved ikke/ikke relevant udelades.
- En ekstern reference på 0–100 kan indtastes med navn, kilde, population og år. Portalen opfinder ingen benchmarktal. Rammen er **ikke Ennovas officielle EEI**, og en reference er ikke dokumentation for direkte sammenlignelighed. En direkte EEI-benchmark kræver den relevante metode og sammenlignelige referencepopulation.

Kilder:

- [Civil Service People Survey 2024 — Quality and Methodology](https://www.gov.uk/government/publications/civil-service-people-survey-2024-results/quality-and-methodology-information-for-the-civil-service-people-survey-2024)
- [NFA — Dansk Psykosocialt Spørgeskema](https://www.nfa.dk/vaerktoejer/spoergeskemaer/dansk-psykosocialt-spoergeskema-dpq-et-spoergeskema-om-det-psykiske-arbejdsmiljoe)
- [Bain — Net Promoter Score](https://www.bain.com/insights/nps-the-next-six-sigma-the-net-promoter-score/)

## Fortrolighed og skjulte afdelingstal

Administrator ser e-mail og gennemførelsesstatus, men har ingen visning af individuelle svar eller deltagernes afdeling. Afdelingsrapportens API udelader `count`, spørgsmålsantal, svarfordelinger og eNPS-gruppernes antal. eNPS vises som score. Samlet antal gennemførte vises fortsat for hele undersøgelsen.

Afdelingsresultater beregnes uanset antal svar. I små afdelinger kan scoren afspejle enkelte personer. Skjulte antal garanterer derfor ikke anonymitet, og resultater kan også give mulighed for indirekte udledning. Medarbejderne informeres om dette før besvarelse. Løsningen beskrives som fortrolig.

Åbne svar vises kun i den samlede rapport ved mindst fem ikke-tomme kommentarer til samme spørgsmål. De sorteres uafhængigt, og der leveres ikke individuelle svarrækker. Medarbejderne opfordres til at undgå identificerende detaljer.

Teknisk lagres svar med en HMAC-baseret pseudonymnøgle, der muliggør genoptagelse. Databaseoperatøren kan stadig sammenkoble oplysningerne med adgang til databasen og nøglen. Afdelingstal skjules i portal/API/eksport, men er ikke hemmelige for en operatør med direkte databaseadgang.

Der er ingen e-mailverifikation eller kontrol af ansættelse. Enhver med det aktive link kan tilmelde sig; del linket internt. Eksisterende adgangskoder bruger fortsat saltet PBKDF2 og sikre sessionscookies.

## Test

`npm test` kører backend mod en virkelig SQLite-database med D1-adapter. Testene dækker:

- Førstegangsopsætning, login med forkert Cloudflare-e-mail, session/logout og adgangskodeskift.
- Forkert opsætningsnøgle, manglende binding, adgangskodekrav, CSRF og rate limiting.
- Aktivering uden medarbejderliste, selvtilmelding, afdelingsvalg, kladde, genoptagelse, indsendelse, ændring og lukning.
- Engagement, eNPS, ukendt/ikke relevant, minimumsgrupper og komplementær skjulning.
- Rapport uden personidentifikatorer og handlingsstatus.
- Ens oversættelsesnøgler i dansk, engelsk og grønlandsk.

`npm run deploy:check` omfatter også syntaxkontrol og Cloudflares Worker-bundling uden udgivelse. Browserbaseret visuel QA og login på den rigtige Cloudflare-host skal foretages efter deploy; det er ikke verificeret med de lokale API-tests alene.

## Test med få medarbejdere

Opret og aktivér en undersøgelse, og send linket til dine testmedarbejdere. Du kan se afdelingsscorer selv ved én besvarelse, mens afdelingernes svarantal er skjult. Luk testen før næste undersøgelse aktiveres. Konti, svar og tidligere deltagerdata bevares ved opdatering; den gamle `an2_employees`-tabel bruges ikke længere. Der kræves ingen ny databasemigration.
