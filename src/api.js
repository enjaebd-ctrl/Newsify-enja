const nøgle = import.meta.env.VITE_NYT_KEY

// Gør artiklerne ens i opbygning, uanset hvilken liste de kommer fra
export async function hentTopStories(sektion) {
  const svar = await fetch(`https://api.nytimes.com/svc/topstories/v2/${sektion}.json?api-key=${nøgle}`)
  const data = await svar.json()

  return data.results.slice(0, 5).map((a) => ({
    title: a.title,
    abstract: a.abstract,
    url: a.url,
    billede: a.multimedia ? a.multimedia[0].url : '',
  }))
}

export async function hentPopulaere() {
  const svar = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${nøgle}`)
  const data = await svar.json()

  return data.results.slice(0, 10).map((a) => ({
    title: a.title,
    abstract: a.abstract,
    url: a.url,
    billede: a.media.length ? a.media[0]['media-metadata'][0].url : '',
  }))
}