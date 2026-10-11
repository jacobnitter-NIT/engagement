# 2.2.0

- Selvtilmelding via fælles link med e-mail, adgangskode og eget afdelingsvalg.
- Ingen medarbejdergrunddata eller administrativ deltagerudvælgelse.
- Eksisterende konti kan tilmelde sig næste undersøgelse.
- Alle afdelingsrapporter åbnes uden en minimumsgrænse; afdelingstal er udeladt fra API og eksport.
- Samlede dashboardtal, valgfrit forventet antal og deltagelsesstatus.
- Fortrolighedstekst forklarer små afdelingers begrænsede anonymitet; åbne kommentarer vises kun samlet ved fem kommentarer.
- Eksisterende login og svar bevares.

# 2.1.0

- Tilføj, fjern og rediger alle spørgsmål samt svartype og tema i kladder.
- Vælg deltagere pr. undersøgelse fra fælles medarbejdergrunddata.
- Grunddata kan opdateres uden at ændre aktive deltagerlister.
- Test med få deltagere; anonymitetsgrænser gælder fortsat.
- Engagementindeks udelades uden alle fem kernespørgsmål; eNPS udelades uden eNPS-spørgsmål.

# 2.0.1

- Privat opsætningslink genereres automatisk under release.
- Intet nøglefelt på første konto-oprettelse; vælg blot e-mail og adgangskode.
- Eksplícit Wrangler-konfiguration i alle kommandoer.

# 2.0.0

- Ny Worker og frontend bygget fra bunden.
- Administrator vælger e-mail og adgangskode ved første opsætning; løbende login bruger databasekontoen.
- Ny, isoleret databasestruktur med atomisk oprettelse og egne migrationsmetadata.
- Survey designer, flersprogede egne spørgsmål, aktivering/lukning og invitationer.
- Autosave, gem/genoptag og redigering før lukning.
- Dashboard, engagement, eNPS, motivations- og vedligeholdelsesfaktorer, afdelingsrapporter, CSV/PDF.
- Handlingsplan med ansvarlig, deadline, status og opfølgning.
