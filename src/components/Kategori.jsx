import { useEffect, useState } from 'react'
import { hentTopStories } from '../api'
import Artikel from './Artikel'
import KategoriBoks from './KategoriBoks'

// Én kategori på forsiden. Den henter selv sine egne nyheder
function Kategori({ navn, sektion, soeg, onGem, gemteUrls }) {
  const [artikler, setArtikler] = useState([])

  // Henter nyhederne når komponenten kommer frem
  // [sektion] betyder, at det kun kører igen, hvis sektionen ændrer sig
  useEffect(() => {
    hentTopStories(sektion).then((data) => setArtikler(data))
  }, [sektion])

  // Søgefeltet filtrerer på overskriften
  // toLowerCase gør, at store og små bogstaver ikke betyder noget
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
          // gemt er true, hvis artiklens url ligger på listen over gemte
          gemt={gemteUrls.includes(a.url)}
          // Vi sender artiklen med, plus hvilken kategori den kom fra ({ ...a } kopierer den)
          // Så kan arkivet sortere de gemte artikler efter kategori
          onKnap={() => onGem({ ...a, kategori: navn })}
        />
      ))}
    </KategoriBoks>
  )
}

export default Kategori