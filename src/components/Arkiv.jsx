import Artikel from './Artikel'
import KategoriBoks from './KategoriBoks'

// Arkiv-siden: de gemte artikler, sorteret efter kategori
// Her er type "slet", så man swiper for at fjerne en artikel
function Arkiv({ arkiv, onSlet }) {
  // Hvis der ikke er gemt noget endnu
  if (arkiv.length === 0) {
    return <p className="tom">Ingen gemte artikler endnu</p>
  }

  // Finder de kategorier, der har gemte artikler
  // Hvis en artikel mangler kategori, lægger vi den under 'other'
  const navne = []
  arkiv.forEach((a) => {
    const navn = a.kategori || 'other'
    if (!navne.includes(navn)) {
      navne.push(navn)
    }
  })

  return (
    <>
      {/* En boks for hver kategori. Man ser altså kun kategorier, hvor man har gemt noget */}
      {navne.map((navn) => (
        <KategoriBoks key={navn} navn={navn}>
          {arkiv
            .filter((a) => (a.kategori || 'other') === navn)
            .map((a) => (
              <Artikel
                key={a.url}
                artikel={a}
                type="slet"
                onKnap={() => onSlet(a.url)}
              />
            ))}
        </KategoriBoks>
      ))}
    </>
  )
}

export default Arkiv