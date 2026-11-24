import { kategorier } from '../data/kategorier'

function Settings({ indstillinger, setIndstillinger, tema, setTema }) {
  function skiftKategori(sektion) {
    setIndstillinger({ ...indstillinger, [sektion]: !indstillinger[sektion] })
  }

  return (
    <>
      <h2 className="settings__titel">Settings</h2>
      <p className="settings__under">Categories</p>

      {kategorier.map((k) => (
        <label className="kontakt" key={k.sektion}>
          <span>{k.navn}</span>
          <input
            type="checkbox"
            checked={indstillinger[k.sektion]}
            onChange={() => skiftKategori(k.sektion)}
          />
          <span className="kontakt__glider"></span>
        </label>
      ))}

      <button className="tema-knap" onClick={() => setTema(tema === 'dark' ? 'light' : 'dark')}>
        Toggle dark mode
      </button>
    </>
  )
}

export default Settings