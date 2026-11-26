import { useEffect, useState } from 'react'
import { hentTopStories } from '../api'
import Artikel from './Artikel'
import KategoriBoks from './KategoriBoks'

// Popular-siden: forsidens nyheder, sorteret efter hvilken sektion de hører til
// aktiv er true, når man står på Popular-fanen
// gemteUrls bruges til at vise, hvilke artikler der allerede er gemt
function Populaer({ onGem, aktiv, gemteUrls }) {
  const [artikler, setArtikler] = useState([])

  useEffect(() => {
    // Vi henter først, når man åbner siden, og kun hvis vi ikke har nyhederne endnu
    // Så bruger vi ikke et API-kald, som ingen har brug for, når appen starter
    if (aktiv && artikler.length === 0) {
      // "home" er forsiden på nytimes.com
      hentTopStories('home').then((data) => setArtikler(data))
    }
  }, [aktiv])

  // Finder alle sektionerne, men kun én gang hver
  // includes tjekker om navnet allerede er på listen
  const navne = []
  artikler.forEach((a) => {
    if (!navne.includes(a.sektion)) {
      navne.push(a.sektion)
    }
  })

  return (
    <>
      {/* En boks for hver sektion, med de artikler der hører til den */}
      {navne.map((navn) => (
        <KategoriBoks key={navn} navn={navn}>
          {artikler
            .filter((a) => a.sektion === navn)
            .map((a) => (
              <Artikel
                key={a.url}
                artikel={a}
                type="gem"
                gemt={gemteUrls.includes(a.url)}
                onKnap={() => onGem({ ...a, kategori: navn })}
              />
            ))}
        </KategoriBoks>
      ))}
    </>
  )
}

export default Populaer