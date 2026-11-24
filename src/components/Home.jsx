import { useState } from 'react'
import { kategorier } from '../data/kategorier'
import Kategori from './Kategori'

function Home({ indstillinger, onGem }) {
  const [soeg, setSoeg] = useState('')

  return (
    <>
      <input
        className="soeg"
        type="text"
        placeholder="Search news"
        value={soeg}
        onChange={(e) => setSoeg(e.target.value)}
      />

      {kategorier.map((k) => {
        // Viser kun de kategorier, der er slået til i settings
        if (!indstillinger[k.sektion]) return null

        return (
          <Kategori
            key={k.sektion}
            navn={k.navn}
            sektion={k.sektion}
            soeg={soeg}
            onGem={onGem}
          />
        )
      })}
    </>
  )
}

export default Home