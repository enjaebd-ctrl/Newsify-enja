# Projektdokumentation

Navn: Enja lahn blauenfeldt

Hold: WU16

Uddannelse: Webudvikler

Uddannelsessted: Roskilde Tekniske Skole

[Link til min applikaton](http://example.com/)


## Teknologier

-   HTML
-   SCSS (Sass)
-   JavaScript
-   React (JSX)
-   Vite
-   Github
-   Netlify (udgivelse)
-   The New York Times Top Stories API
-   Gamle opgaver (swipe og dark mode)
-   Claude (AI) som hjælp til kode og fejlfinding


### Redegørelse for oprindelsen af evt. tredjeparts kode anvendt i opgaveløsningen (Teknisk dokumentation)

**Node-pakker jeg har installeret:**

| Pakke | Hvad den løser |
| --- | --- |
| `react` og `react-dom` | Gør det muligt at bygge appen som komponenter i JSX, og at opdatere siden, når data ændrer sig |
| `vite` | Build-system. Starter en udviklingsserver og samler HTML, JavaScript og Sass til en `dist`-mappe |
| `@vitejs/plugin-react` | Får Vite til at forstå JSX-filer |
| `sass` | Gør, at jeg kan skrive Sass (variabler, nesting og opdelte filer), som bliver til én samlet css-fil |
| `react-icons` | Ikonerne til bogmærke, skraldespand, pil og tabbaren |

**Anden kode og materiale jeg har brugt:**

- **The New York Times Top Stories API:** Henter nyhederne. Jeg bruger kun dette ene API. Adgang kræver en nøgle fra developer.nytimes.com. Nøglen ligger i en `.env`-fil og er ikke lagt op på Github.

- **Min gamle opgave (Swiper):** `Swiper.jsx` og `swiper.scss` fra en tidligere opgave er grundlaget for swipe til venstre i `Artikel.jsx` og `_swiper.scss`. Logikken med `touchstart`, `touchend` og `translateX` er den samme.

- **Min gamle opgave (Dark mode):** `DarkMode.jsx` er grundlaget for temaskiftet. Jeg gemmer valget i `localStorage` på samme måde som før.

- **Google Fonts:** Playfair Display (overskrifter) og Open Sans (tekst).

- **Logo og design:** Logoet og designet er fra Figma-filen i mappen `projekt-UI`.

- **Claude (AI):** Jeg har brugt Claude som hjælp til koden, finde fejl og teriminalen fx med API-nøglen og filstier.

- **Youtube:** (videoer om React og Sass)

---

### Argumentation for de valg du selvstændigt har truffet under løsningen af opgaven

- **React:** Jeg har valgt React, fordi mine gamle opgaver (Swiper og DarkMode) også er lavet i React, så jeg kunne genbruge dem. Hver del af siden er sin egen komponent, fx `Artikel`, `Kategori` og `Tabbar`.

- **Animation af åben og lukket kategori:** Jeg animerer `grid-template-rows` fra `1fr` til `0fr`. Det gør, at listen glider blødt sammen, uden at jeg skal kende højden i forvejen. Pilen drejer samtidig.

- **Animation af kontakterne:** Kontakterne i settings er lavet med et skjult `checkbox`-felt. Den runde knap glider med `transform: translateX`, og farven skifter med `transition`.

- **Lagring af indstillinger:** Jeg lavede en `useLocalStorage`-hook, så arkiv, valgte kategorier og tema bliver husket, også når siden lukkes. Nøglerne starter med `newsify-`, fordi mine andre Vite-projekter bruger samme adresse (`localhost:5173`) og ellers kan læse hinandens data.

- **Cache af nyheder:** NYT tillader kun få kald i minuttet. Derfor gemmer `api.js` svarene i 10 minutter, så appen ikke henter det samme igen hver gang jeg opdaterer siden.

- **Kun ét API:** Alle sider bruger Top Stories. Popular-siden viser forsidens nyheder (`home`) delt op efter sektion.

- **World i stedet for Europe:** NYT har ingen sektion, der hedder Europe, så jeg brugte World.

- **Søgefelt:** Søgefeltet på Home filtrerer nyhederne på overskriften, mens man skriver.

- **Sass opdelt i filer:** Sass er delt i `_variabler`, `_base`, `_swiper`, `_kategori`, `_settings` og `_tabbar`. Farver og skrifttyper ligger som variabler, så jeg kun skal rette dem ét sted. Lyst og mørkt tema bruger css-variabler, som skifter, når klassen `dark` sættes på `html`.

- **Mobil Design:** Siden har en maksimal bredde på 430px, så den ligner designet, også når den åbnes på en computer.

### Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)

**Det gik godt:**
- Jeg kunne genbruge swipe, dark mode, søgebaren og setings fra mine gamle opgaver, så jeg ikke skulle starte forfra.
- Appen henter rigtige nyheder fra NYT og husker arkiv og indstillinger.
- Animationerne virker som i opgavebeskrivelsen.

**Det var svært, og her tabte jeg tid:**
- Jeg fik fejl, fordi filer lå de forkerte steder (`assets` lå uden for `src`, og `scss`-mappen var væk). Jeg har lært at tjekke fejlbeskeden i terminalen og Console, før jeg ændrer noget.
- Nyhederne vistes ikke i starten. Det skyldtes API-nøglen og NYT's grænse for antal kald. Jeg løste det ved at gemme svarene og tjekke, om der er data, før koden bruger det.
- Det var svært at få designet til at ligne Figma præcist. Skrifttyper og afstande skulle justeres flere gange.

**Det kunne jeg have gjort bedre:**
- Jeg burde have læst hele opgaven først og lavet mappestrukturen færdig, før jeg skrev koden.

---
### En beskrivelse af særlige punkter til bedømmelse

- Swipe til venstre på en nyhed viser gem-knappen, og i arkivet viser det slet-knappen. Arkivet er delt op efter kategori.
- Animationen af åben/lukket kategori, hvor listen glider sammen, og pilen drejer.
- Kontakterne i settings, hvor knappen glider, og farven skifter.
- Lyst og mørkt tema, som bliver husket.
- Cachen i `api.js`, som sparer kald til NYT's API.
- Søgefeltet på Home.
- Vite samler Sass til én css-fil og JavaScript til én fil i `dist`, så projektet kan udgives på Netlify.

Eksempel på kode, jeg er glad for (åben/luk af kategori):

```css
.kategori__indhold {
	display: grid;
	grid-template-rows: 1fr;
	transition: grid-template-rows 0.4s ease;
}

.kategori.lukket .kategori__indhold {
	grid-template-rows: 0fr;
}
```

```js
// Gem kun artiklen, hvis den ikke allerede ligger i arkivet
function gemArtikel(artikel) {
	if (arkiv.some((a) => a.url === artikel.url)) return
	setArkiv([...arkiv, artikel])
}
```