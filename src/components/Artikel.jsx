import { useRef, useState } from 'react'
import { BsBookmark, BsBookmarkFill, BsTrash } from 'react-icons/bs'

const SAVE_WIDTH = 100 // hvor bredt gem/slet-feltet er (skal passe med flex: 0 0 100px i CSS)
const MIN_SWIPE = 50 // hvor langt man skal swipe før det tæller

// En enkelt artikel, som man kan swipe til venstre for at gemme eller slette
// type er enten "gem" eller "slet"
// gemt er true, hvis artiklen allerede ligger i arkivet (bruges kun når type er "gem")
// onKnap kører, når man trykker på knappen
function Artikel({ artikel, type, gemt, onKnap }) {
  // Hvor fingeren startede (vandret)
  const [startX, setStartX] = useState(0)

  // ref giver os adgang til selve HTML-elementet, så vi kan flytte det direkte
  // Vi bruger ikke state til flytningen, fordi siden ikke skal tegnes om
  const swiperRef = useRef(null)

  function handleTouchStart(event) {
    setStartX(event.touches[0].screenX)
  }

  function handleTouchEnd(event) {
    const endX = event.changedTouches[0].screenX
    const distance = startX - endX // positivt tal betyder swipe mod venstre

    if (distance > MIN_SWIPE) {
      // swipe til venstre, så knappen kommer frem
      // Hele rækken rykkes 100px til venstre, så knappen (som ligger til højre) kommer ind
      swiperRef.current.style.transform = 'translateX(-' + SAVE_WIDTH + 'px)'
    } else if (distance < -MIN_SWIPE) {
      // swipe til højre, så den går tilbage
      swiperRef.current.style.transform = 'translateX(0)'
    }
  }

  function handleKnap() {
    // Kører gem eller slet (bestemmes af den der bruger komponenten)
    onKnap()
    // Rykker rækken tilbage på plads
    swiperRef.current.style.transform = 'translateX(0)'
  }

  // Vælger hvilket ikon knappen skal have
  // Slet-knappen har altid skraldespanden
  // Gem-knappen har et tomt bogmærke, og et fyldt (hvidt indeni) hvis artiklen allerede er gemt
  let ikon = <BsTrash size={28} />
  if (type === 'gem') {
    if (gemt) {
      ikon = <BsBookmarkFill size={28} />
    } else {
      ikon = <BsBookmark size={28} />
    }
  }

  return (
    <div className="swiper__container">
      <section
        className="swiper"
        ref={swiperRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Selve artiklen er et link, som åbner nytimes.com i en ny fane */}
        {/* rel="noreferrer" er til sikkerhed, når man åbner en ny fane */}
        <a className="swiper__article" href={artikel.url} target="_blank" rel="noreferrer">
          <div className="swiper__img">
            {/* Viser kun billedet, hvis artiklen har et */}
            {artikel.billede && <img src={artikel.billede} alt="" />}
          </div>
          <div className="swiper__tekst">
            <h3>{artikel.title}</h3>
            <p>{artikel.abstract}</p>
          </div>
        </a>

        {/* Knappen ligger uden for skærmen, til man swiper. Farven afhænger af typen (grøn eller rød) */}
        <div className={'swiper__knap swiper__knap--' + type}>
          <button onClick={handleKnap}>{ikon}</button>
        </div>
      </section>
    </div>
  )
}

export default Artikel