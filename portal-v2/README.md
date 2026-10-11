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

1. Åbn opsætningslinket fra `npm run release`, og opret din administratorkonto én gang.
2. I **Organisation**: tilføj medarbejdernes e-mails til Værksted, Pladeværksted, Administration eller Lager. Tilføj andre afdelinger efter behov. Flere e-mails kan indsættes samlet.
3. I **Undersøgelser**: rediger årets kladde, tilføj egne spørgsmål og oversæt alle spørgsmål. Forhåndsvis hele spørgerammen. Gem dine ændringer.
4. Få de grønlandske tekster gennemgået af en kvalificeret sprogbruger, og markér godkendelsen. De indbyggede tekster er udkast.
5. Aktivér undersøgelsen og kopiér medarbejderlinket. Send det selv til medarbejderne. Portalen sender ikke mails automatisk.
6. Medarbejdere på listen opretter e-mail/adgangskode via linket, får svar automatisk gemt, kan vende tilbage og ændre svar indtil lukning. Eksisterende medarbejderkonti kan bruges ved næste års undersøgelse.
7. Dashboard viser svarprocent og deltagelse pr. afdeling hvert 15. sekund. Medarbejderlisten fastlåses ved aktivering; en snapshot gemmes pr. undersøgelse.
8. Luk undersøgelsen for at åbne rapporter. Eksportér indeksresultater som CSV eller brug Udskriv/PDF.
9. Opret handlinger med ansvarlig, deadline, afdeling, undersøgelse, status og opfølgningsnoter. Brug kolonnerne Planlagt, I gang og Gennemført.

## Metode og reference

Der er 22 spørgsmål: fem engagementsspørgsmål, fem motivationsfaktorer, otte vedligeholdelsesfaktorer, ét eNPS-spørgsmål og tre åbne spørgsmål. Egne skala- og tekstspørgsmål kan tilføjes; spørgsmål fastlåses ved aktivering.

- Engagement: egne danske tilpasninger af fem engagementstemaer fra den britiske **Civil Service People Survey**. Svarkategorien 1–5 omsættes til 0, 25, 50, 75, 100. Indekset er det uvægtede gennemsnit af de fem spørgsmåls gennemsnit. Alle fem skal have mindst fem gyldige svar.
- Motivations- og vedligeholdelsesfaktorer: egne spørgsmål struktureret efter **Herzbergs tofaktorteori**, med danske arbejdsmiljøtemaer som indflydelse, udvikling, ledelse, samarbejde og belastning. Det er en tilpasset ledelsesramme; det er ikke NFA’s validerede DPQ/COPSOQ-skalaer.
- eNPS: procent ambassadører (9–10) minus procent kritikere (0–6). Passive er 7–8. Indekset går fra −100 til +100. Ved ikke/ikke relevant udelades.
- En ekstern reference på 0–100 kan indtastes med navn, kilde, population og år. Portalen opfinder ingen benchmarktal. Rammen er **ikke Ennovas officielle EEI**, og en reference er ikke dokumentation for direkte sammenlignelighed. En direkte EEI-benchmark kræver den relevante metode og sammenlignelige referencepopulation.

Kilder:

- [Civil Service People Survey 2024 — Quality and Methodology](https://www.gov.uk/government/publications/civil-service-people-survey-2024-results/quality-and-methodology-information-for-the-civil-service-people-survey-2024)
- [NFA — Dansk Psykosocialt Spørgeskema](https://www.nfa.dk/vaerktoejer/spoergeskemaer/dansk-psykosocialt-spoergeskema-dpq-et-spoergeskema-om-det-psykiske-arbejdsmiljoe)
- [Bain — Net Promoter Score](https://www.bain.com/insights/nps-the-next-six-sigma-the-net-promoter-score/)

## Svar og fortrolighed

Administratorens API og skærmbilleder viser deltagelsesstatus med e-mail, men giver ingen adgang til individuelle svar. Rapporternes svar indeholder ikke e-mail, kontoid eller navn. Resultater åbnes først efter lukning og kræver mindst fem besvarelser. Hvert spørgsmål kræver desuden mindst fem gyldige svar. Afdelingsrapporter skjules også ved én lille afdeling, hvis resultatet ellers kunne udledes ved at trække de store afdelinger fra totalen.

Åbne svar vises kun i den samlede rapport og ved mindst fem ikke-tomme kommentarer til samme spørgsmål. De sorteres uafhængigt mellem spørgsmål; ingen samlet individuel svarrække leveres. Medarbejderne får besked om at undgå navne og identificerende detaljer.

**Teknisk er besvarelserne pseudonymiserede**, fordi gem/genoptag og ændring kræver en stabil forbindelse. En HMAC-nøgle oprettes kryptografisk ved opsætning og gemmes i `an2_config`. En databaseoperatør med adgang til denne nøgle kan genberegne koblingen. Portalen tilbyder anonyme rapporter for ledelsen, ikke irreversibel anonymisering over for databaseoperatøren. Begræns Cloudflare/D1-adgang til betroede administratorer. Ændr ikke `response_secret` efter opstart.

Sessions lagres med hashede tokens, HttpOnly/Secure/SameSite-cookie og otte timers levetid. POST kræver samme origin. Adgangskoder hashes med saltet PBKDF2, 100.000 iterationer. Login er begrænset pr. IP og e-mail. Adgangskodeskift tilbagekalder gamle sessions.

Der er ingen automatisk mailverifikation eller selvbetjent glemt-adgangskode-mail. En e-mail skal stå på den fastlåste medarbejderliste for at registrere sig og besvare. Den første, der registrerer den inviterede e-mail, ejer kontoen; del derfor undersøgelseslinket direkte internt, og brug medarbejdernes egne e-mailadresser. Aftal adgang, opbevaring og sletning af data før den første rigtige undersøgelse.

## Test

`npm test` kører backend mod en virkelig SQLite-database med D1-adapter. Testene dækker:

- Førstegangsopsætning, login med forkert Cloudflare-e-mail, session/logout og adgangskodeskift.
- Forkert opsætningsnøgle, manglende binding, adgangskodekrav, CSRF og rate limiting.
- Aktivering, låst medarbejderliste/spørgsmål, registrering, kladde, genoptagelse, indsendelse, ændring og lukning.
- Engagement, eNPS, ukendt/ikke relevant, minimumsgrupper og komplementær skjulning.
- Rapport uden personidentifikatorer og handlingsstatus.
- Ens oversættelsesnøgler i dansk, engelsk og grønlandsk.

`npm run deploy:check` omfatter også syntaxkontrol og Cloudflares Worker-bundling uden udgivelse. Browserbaseret visuel QA og login på den rigtige Cloudflare-host skal foretages efter deploy; det er ikke verificeret med de lokale API-tests alene.
