import Artikel from './Artikel'
import KategoriBoks from './KategoriBoks'

function Arkiv({ arkiv, onSlet }) {
  // Hvis der ikke er gemt noget endnu
  if (arkiv.length === 0) {
    return <p className="tom">Ingen gemte artikler endnu</p>
  }

  // Finder de kategorier, der har gemte artikler
  const navne = []
  arkiv.forEach((a) => {
    const navn = a.kategori || 'other'
    if (!navne.includes(navn)) {
      navne.push(navn)
    }
  })

  return (
    <>
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