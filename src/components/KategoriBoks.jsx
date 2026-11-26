import { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import Logo from './Logo'

// En boks som man kan folde ind og ud. Artiklerne kommer ind som children
// children er alt det, man skriver mellem <KategoriBoks> og </KategoriBoks>
// Den bruges både på Home, Popular og Arkiv, så vi kun har animationen ét sted
function KategoriBoks({ navn, children }) {
  const [lukket, setLukket] = useState(false)

  return (
    // Klassen "lukket" gør, at CSS folder indholdet sammen og drejer pilen
    <div className={lukket ? 'kategori lukket' : 'kategori'}>
      {/* !lukket vender værdien om: åben bliver lukket, og lukket bliver åben */}
      <button className="kategori__top" onClick={() => setLukket(!lukket)}>
        <Logo />
        <span>{navn}</span>
        <BsChevronDown className="kategori__pil" />
      </button>

      {/* To div'er er nødvendige til animationen (se _kategori.scss) */}
      <div className="kategori__indhold">
        <div className="kategori__liste">{children}</div>
      </div>
    </div>
  )
}

export default KategoriBoks