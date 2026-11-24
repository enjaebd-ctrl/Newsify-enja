import { useRef, useState } from 'react'
import { BsBookmark, BsTrash } from 'react-icons/bs'

const SAVE_WIDTH = 100 // hvor bredt gem/slet-feltet er
const MIN_SWIPE = 50 // hvor langt man skal swipe før det tæller

// type er enten "gem" eller "slet"
// onKnap kører, når man trykker på knappen
function Artikel({ artikel, type, onKnap }) {
  const [startX, setStartX] = useState(0)
  const swiperRef = useRef(null)

  function handleTouchStart(event) {
    setStartX(event.touches[0].screenX)
  }

  function handleTouchEnd(event) {
    const endX = event.changedTouches[0].screenX
    const distance = startX - endX // positivt tal betyder swipe mod venstre

    if (distance > MIN_SWIPE) {
      // swipe til venstre, så knappen kommer frem
      swiperRef.current.style.transform = 'translateX(-' + SAVE_WIDTH + 'px)'
    } else if (distance < -MIN_SWIPE) {
      // swipe til højre, så den går tilbage
      swiperRef.current.style.transform = 'translateX(0)'
    }
  }

  function handleKnap() {
    onKnap()
    swiperRef.current.style.transform = 'translateX(0)'
  }

  return (
    <div className="swiper__container">
      <section
        className="swiper"
        ref={swiperRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <a className="swiper__article" href={artikel.url} target="_blank" rel="noreferrer">
          <div className="swiper__img">
            {artikel.billede && <img src={artikel.billede} alt="" />}
          </div>
          <div className="swiper__tekst">
            <h3>{artikel.title}</h3>
            <p>{artikel.abstract}</p>
          </div>
        </a>

        <div className={'swiper__knap swiper__knap--' + type}>
          <button onClick={handleKnap}>
            {type === 'gem' ? <BsBookmark size={28} /> : <BsTrash size={28} />}
          </button>
        </div>
      </section>
    </div>
  )
}

export default Artikel