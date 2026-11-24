import { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import Logo from './Logo'

// En boks som man kan folde ind og ud. Artiklerne kommer ind som children
function KategoriBoks({ navn, children }) {
  const [lukket, setLukket] = useState(false)

  return (
    <div className={lukket ? 'kategori lukket' : 'kategori'}>
      <button className="kategori__top" onClick={() => setLukket(!lukket)}>
        <Logo />
        <span>{navn}</span>
        <BsChevronDown className="kategori__pil" />
      </button>

      <div className="kategori__indhold">
        <div className="kategori__liste">{children}</div>
      </div>
    </div>
  )
}

export default KategoriBoks