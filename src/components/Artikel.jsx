import { useRef, useState } from 'react'
import { BsBookmark, BsTrash } from 'react-icons/bs'

const SAVE_WIDTH = 100 // bredden på gem/slet-feltet
const MIN_SWIPE = 50 // så langt skal man swipe, før det tæller

// type er "gem" eller "slet". onKnap kører, når man trykker på knappen.
function Artikel({ artikel, type, onKnap }) {
  const [startX, setStartX] = useState(0)
  const swiperRef = useRef(null)

  function handleTouchStart(event) {
    setStartX(event.touches[0].screenX)
  }

  function handleTouchEnd(event) {
    const endX = event.changedTouches[0].screenX
    const distance = startX - endX // positivt tal = swipe mod venstre

    if (distance > MIN_SWIPE) {
      swiperRef.current.style.transform = `translateX(-${SAVE_WIDTH}px)`
    } else if (distance < -MIN_SWIPE) {
      swiperRef.current.style.transform = 'translateX(0)'
    }
  }

  function handleKnap() {
    onKnap()
    swiperRef.current.style.transform = 'translateX(0)'
  }

  return (
    <div className="swiper__container">
      <section className="swiper" ref={swiperRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <a className="swiper__article" href={artikel.url} target="_blank" rel="noreferrer">
          <div className="swiper__img">
            <img src={artikel.billede} alt="" />
          </div>
          <div className="swiper__tekst">
            <h3>{artikel.title}</h3>
            <p>{artikel.abstract}</p>
          </div>
        </a>

        <div className={`swiper__knap swiper__knap--${type}`}>
          <button onClick={handleKnap}>
            {type === 'gem' ? <BsBookmark size={32} /> : <BsTrash size={32} />}
          </button>
        </div>
      </section>
    </div>
  )
}

export default Artikel