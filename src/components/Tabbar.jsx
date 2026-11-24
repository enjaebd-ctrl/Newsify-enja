const sider = [
  { id: 'home', navn: 'Home' },
  { id: 'archive', navn: 'Archive' },
  { id: 'popular', navn: 'Popular' },
  { id: 'settings', navn: 'Settings' },
]

function Tabbar({ side, setSide }) {
  return (
    <nav className="tabbar">
      {sider.map((s) => (
        <button key={s.id} className={side === s.id ? 'aktiv' : ''} onClick={() => setSide(s.id)}>
          {s.navn}
        </button>
      ))}
    </nav>
  )
}

export default Tabbar