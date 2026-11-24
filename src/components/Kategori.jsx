import { useEffect, useState } from 'react'
import { hentTopStories } from '../api'
import Artikel from './Artikel'
import KategoriBoks from './KategoriBoks'

function Kategori({ navn, sektion, soeg, onGem }) {
  const [artikler, setArtikler] = useState([])

  // Henter nyhederne når komponenten kommer frem
  useEffect(() => {
    hentTopStories(sektion).then((data) => setArtikler(data))
  }, [sektion])

  // Søgefeltet filtrerer på overskriften
  const viste = artikler.filter((a) =>
    a.title.toLowerCase().includes(soeg.toLowerCase())
  )

  return (
    <KategoriBoks navn={navn}>
      {viste.map((a) => (
        <Artikel
          key={a.url}
          artikel={a}
          type="gem"
          onKnap={() => onGem({ ...a, kategori: navn })}
        />
      ))}
    </KategoriBoks>
  )
}

export default Kategori