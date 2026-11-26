import { kategorier } from '../data/kategorier'
import Logo from './Logo'

// Settings: slå kategorier til/fra og skift mellem lyst og mørkt tema
// Alt bliver gemt i localStorage via App, så det huskes
function Settings({ indstillinger, setIndstillinger, tema, setTema }) {
  // Slår en kategori til eller fra
  // { ...indstillinger } kopierer de gamle indstillinger
  // [sektion] bruger værdien af sektion som nøgle, fx world, og !-tegnet vender true/false om
  function skiftKategori(sektion) {
    setIndstillinger({ ...indstillinger, [sektion]: !indstillinger[sektion] })
  }

  // Skifter mellem mørkt og lyst tema
  // App sørger for at sætte klassen "dark" på siden, når temaet ændrer sig
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

      {/* En kontakt for hver kategori */}
      {/* Det er en label om en skjult checkbox, så man kan trykke hvor som helst på rækken */}
      {kategorier.map((k) => (
        <label className="kontakt" key={k.sektion}>
          <Logo />
          <span className="kontakt__navn">{k.navn}</span>
          <input
            type="checkbox"
            checked={indstillinger[k.sektion]}
            onChange={() => skiftKategori(k.sektion)}
          />
          {/* Det er den her, man ser som en kontakt. CSS styrer den ud fra om checkboxen er afkrydset */}
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