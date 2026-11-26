import { kategorier } from '../data/kategorier'
import Logo from './Logo'

// Settings: slå kategorier til/fra og skift tema
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

      {/* En række for hver kategori: logo og navn til venstre, kontakten helt ude til højre (som i Figma) */}
      {kategorier.map((k) => (
        <div className="kontakt-raekke" key={k.sektion}>
          <Logo />
          <span className="kontakt-raekke__navn">{k.navn}</span>

          {/* Kontakten er en label om en skjult checkbox, så man kan trykke på hele kontakten */}
          <label className="kontakt">
            <input
              type="checkbox"
              checked={indstillinger[k.sektion]}
              onChange={() => skiftKategori(k.sektion)}
              aria-label={'Show ' + k.navn}
            />
            {/* Det er den her, man ser som en kontakt. CSS styrer den ud fra om checkboxen er afkrydset */}
            <span className="kontakt__glider"></span>
          </label>
        </div>
      ))}

      <button className="tema-knap" onClick={skiftTema}>
        Toggle dark mode
      </button>

      <p className="versjon">Version 4.8.15.16.23.42</p>
    </>
  )
}

export default Settings