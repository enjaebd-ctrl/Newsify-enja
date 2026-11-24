import { useEffect, useState } from 'react'
import { hentTopStories } from '../api'
import Artikel from './Artikel'
import KategoriBoks from './KategoriBoks'

function Populaer({ onGem }) {
  const [artikler, setArtikler] = useState([])

  useEffect(() => {
    // "home" er forsiden på nytimes.com
    hentTopStories('home').then((data) => setArtikler(data))
  }, [])

  // Finder alle sektionerne, men kun én gang hver
  const navne = []
  artikler.forEach((a) => {
    if (!navne.includes(a.sektion)) {
      navne.push(a.sektion)
    }
  })

  return (
    <>
      {navne.map((navn) => (
        <KategoriBoks key={navn} navn={navn}>
          {artikler
            .filter((a) => a.sektion === navn)
            .map((a) => (
              <Artikel
                key={a.url}
                artikel={a}
                type="gem"
                onKnap={() => onGem({ ...a, kategori: navn })}
              />
            ))}
        </KategoriBoks>
      ))}
    </>
  )
}

export default Populaer