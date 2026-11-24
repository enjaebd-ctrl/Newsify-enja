const noegle = import.meta.env.VITE_NYT_KEY

// Nyhederne gemmes i 10 minutter, så vi ikke bruger for mange kald
const CACHE_TID = 10 * 60 * 1000

export async function hentTopStories(sektion) {
  // Tjekker først om vi allerede har nyheder gemt
  const cacheNoegle = 'newsify-cache-' + sektion
  const gemt = JSON.parse(localStorage.getItem(cacheNoegle))

  if (gemt && Date.now() - gemt.tid < CACHE_TID) {
    return gemt.artikler
  }

  const svar = await fetch(
    'https://api.nytimes.com/svc/topstories/v2/' + sektion + '.json?api-key=' + noegle
  )

  // Hvis noget går galt, returnerer vi bare en tom liste
  if (!svar.ok) {
    console.log('Fejl fra NYT:', svar.status)
    return []
  }

  const data = await svar.json()

  if (!data.results) {
    return []
  }

  // Vi tager kun de 5 første og beholder det, vi skal bruge
  const artikler = data.results.slice(0, 5).map((a) => {
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

  localStorage.setItem(cacheNoegle, JSON.stringify({ tid: Date.now(), artikler: artikler }))
  return artikler
}