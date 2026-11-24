import { kategorier } from '../data/kategorier'
import Logo from './Logo'

function Settings({ indstillinger, setIndstillinger, tema, setTema }) {
  // Slår en kategori til eller fra
  function skiftKategori(sektion) {
    setIndstillinger({ ...indstillinger, [sektion]: !indstillinger[sektion] })
  }

  // Skifter mellem mørkt og lyst tema
  function skiftTema() {
    if (tema === 'dark') {
      setTema('light')
    } else {
      setTema('dark')
    }
  }

  return (
    <>
      <h2 className="settings__titel">Settings</h2>
      <p className="settings__under">Categories</p>

      {kategorier.map((k) => (
        <label className="kontakt" key={k.sektion}>
          <Logo />
          <span className="kontakt__navn">{k.navn}</span>
          <input
            type="checkbox"
            checked={indstillinger[k.sektion]}
            onChange={() => skiftKategori(k.sektion)}
          />
          <span className="kontakt__glider"></span>
        </label>
      ))}

      <button className="tema-knap" onClick={skiftTema}>
        Toggle dark mode
      </button>

      <p className="versjon">Version 1.0.0</p>
    </>
  )
}

export default Settings