import { kategorier } from '../data/kategorier'
import Kategori from './Kategori'

function Home({ indstillinger, onGem }) {
  return (
    <>
      {kategorier.map((k) =>
        // Vis kun kategorier, der er slået til i settings
        indstillinger[k.sektion] ? (
          <Kategori key={k.sektion} navn={k.navn} sektion={k.sektion} onGem={onGem} />
        ) : null
      )}
    </>
  )
}

export default Home