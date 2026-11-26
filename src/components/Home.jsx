import { useState } from 'react'
import { kategorier } from '../data/kategorier'
import Kategori from './Kategori'

// Forsiden: et søgefelt og en boks for hver kategori, der er slået til
// gemteUrls kommer fra App og sendes videre ned til hver kategori
function Home({ indstillinger, onGem, gemteUrls }) {
  // Det brugeren skriver i søgefeltet. Den sendes ned til hver kategori, som filtrerer sine artikler
  const [soeg, setSoeg] = useState('')

  return (
    <>
      {/* Et "controlled input": feltet viser altid værdien fra state, og state opdateres ved hvert tryk */}
      <input
        className="soeg"
        type="text"
        placeholder="Search news"
        value={soeg}
        onChange={(e) => setSoeg(e.target.value)}
      />

      {kategorier.map((k) => {
        // Viser kun de kategorier, der er slået til i settings
        // Returnerer vi null, bliver der ikke vist noget
        if (!indstillinger[k.sektion]) return null

        return (
          <Kategori
            key={k.sektion}
            navn={k.navn}
            sektion={k.sektion}
            soeg={soeg}
            onGem={onGem}
            gemteUrls={gemteUrls}
          />
        )
      })}
    </>
  )
}

export default Home