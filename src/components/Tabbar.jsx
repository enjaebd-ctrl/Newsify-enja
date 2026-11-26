import { BsHouse, BsBookmark, BsStar, BsGear } from 'react-icons/bs'

// Alle knapperne i bunden
// id er det, App bruger til at vide hvilken side der er valgt
// Det er en liste, så vi kan bruge map i stedet for at skrive fire næsten ens knapper
const sider = [
  { id: 'home', navn: 'Home', ikon: <BsHouse size={22} /> },
  { id: 'archive', navn: 'Archive', ikon: <BsBookmark size={22} /> },
  { id: 'popular', navn: 'Popular', ikon: <BsStar size={22} /> },
  { id: 'settings', navn: 'Settings', ikon: <BsGear size={22} /> },
]

// side = den valgte side, setSide = funktionen der skifter side (kommer fra App)
function Tabbar({ side, setSide }) {
  return (
    <nav className="tabbar">
      {sider.map((s) => (
        <button
          key={s.id}
          // Den valgte knap får klassen "aktiv", så den bliver grøn
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