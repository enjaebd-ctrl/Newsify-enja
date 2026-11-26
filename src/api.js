// Nøglen kommer fra .env-filen. Vite lader os kun bruge variabler, der starter med VITE_
const noegle = import.meta.env.VITE_NYT_KEY

// Nyhederne gemmes i 10 minutter (10 min * 60 sek * 1000 ms), så vi ikke bruger for mange API-kald
const CACHE_TID = 10 * 60 * 1000

// Her husker vi de kald, der er i gang lige nu
// Hvis samme sektion bliver bedt om to gange (fx af StrictMode), får begge det samme kald
const igangvaerende = {}

// Venter et antal millisekunder. Bruges til at vente, før vi prøver igen
function vent(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Henter de øverste nyheder fra en sektion, fx 'world' eller 'sports'
export function hentTopStories(sektion) {
  // Er der allerede et kald i gang for den her sektion, bruger vi det
  if (igangvaerende[sektion]) {
    return igangvaerende[sektion]
  }

  // Ellers starter vi et nyt, og når det er færdigt, fjerner vi det fra listen igen
  igangvaerende[sektion] = hent(sektion).finally(() => {
    delete igangvaerende[sektion]
  })

  return igangvaerende[sektion]
}

// Selve hentningen. async betyder, at funktionen venter på internettet
async function hent(sektion) {
  // Hver sektion får sin egen plads i localStorage, fx 'newsify-cache-world'
  const cacheNoegle = 'newsify-cache-' + sektion

  // localStorage gemmer kun tekst, så JSON.parse laver teksten om til et objekt igen
  // Er der intet gemt, giver det null
  const gemt = JSON.parse(localStorage.getItem(cacheNoegle))

  // Er der noget gemt, og er det under 10 minutter gammelt, bruger vi det
  // (Date.now() - gemt.tid) er hvor gammelt det gemte er i millisekunder
  if (gemt && Date.now() - gemt.tid < CACHE_TID) {
    return gemt.artikler
  }

  // Vi prøver op til 3 gange, hvis NYT siger "for mange kald"
  for (let forsoeg = 1; forsoeg <= 3; forsoeg++) {
    const svar = await fetch(
      'https://api.nytimes.com/svc/topstories/v2/' + sektion + '.json?api-key=' + noegle
    )

    // 429 betyder for mange kald, så vi venter lidt og prøver igen
    // Vi venter længere og længere (15 sek, så 30 sek), så grænsen kan nå at nulstille
    if (svar.status === 429) {
      console.log('For mange kald, prøver igen om lidt:', sektion)
      await vent(forsoeg * 15000)
      continue
    }

    // Andre fejl (fx forkert nøgle) hjælper det ikke at prøve igen på
    // Vi returnerer en tom liste, så appen ikke går i stykker
    if (!svar.ok) {
      console.log('Fejl fra NYT:', svar.status)
      return []
    }

    // Gør svaret fra tekst om til et JavaScript-objekt
    const data = await svar.json()

    // Ekstra sikkerhed, hvis der ikke er nogen resultater i svaret
    if (!data.results) {
      return []
    }

    // Vi tager kun de 5 første, og beholder kun det, vi skal bruge
    // map laver hver artikel om til et mindre og pænere objekt
    const artikler = data.results.slice(0, 5).map((a) => {
      // Ikke alle artikler har et billede, så vi tjekker først
      let billede = ''
      if (a.multimedia && a.multimedia.length > 0) {
        billede = a.multimedia[0].url
      }

      return {
        title: a.title,
        abstract: a.abstract,
        url: a.url,
        billede: billede,
        sektion: a.section,
      }
    })

    // Gemmer artiklerne sammen med tidspunktet, så vi kan se hvor gamle de er næste gang
    localStorage.setItem(cacheNoegle, JSON.stringify({ tid: Date.now(), artikler: artikler }))
    return artikler
  }

  // Hvis alle 3 forsøg fejlede, returnerer vi en tom liste
  return []
}