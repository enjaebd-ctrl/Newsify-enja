import { BsHouse, BsBookmark, BsStar, BsGear } from 'react-icons/bs'

// Alle knapperne i bunden
const sider = [
  { id: 'home', navn: 'Home', ikon: <BsHouse size={22} /> },
  { id: 'archive', navn: 'Archive', ikon: <BsBookmark size={22} /> },
  { id: 'popular', navn: 'Popular', ikon: <BsStar size={22} /> },
  { id: 'settings', navn: 'Settings', ikon: <BsGear size={22} /> },
]

function Tabbar({ side, setSide }) {
  return (
    <nav className="tabbar">
      {sider.map((s) => (
        <button
          key={s.id}
          className={side === s.id ? 'aktiv' : ''}
          onClick={() => setSide(s.id)}
        >
          {s.ikon}
          {s.navn}
        </button>
      ))}
    </nav>
  )
}

export default Tabbar