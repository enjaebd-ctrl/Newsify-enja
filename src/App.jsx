import { useEffect, useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import { kategorier } from './data/kategorier'
import Home from './components/Home'
import Arkiv from './components/Arkiv'
import Populaer from './components/Populaer'
import Settings from './components/Settings'
import Tabbar from './components/Tabbar'

// Alle kategorier er slået til, første gang appen bruges
const startIndstillinger = {}
kategorier.forEach((k) => (startIndstillinger[k.sektion] = true))

// Systemets tema bruges, hvis der ikke er gemt noget
const systemTema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

function App() {
  const [side, setSide] = useState('home')
  const [arkiv, setArkiv] = useLocalStorage('arkiv', [])
  const [indstillinger, setIndstillinger] = useLocalStorage('kategorier', startIndstillinger)
  const [tema, setTema] = useLocalStorage('theme', systemTema)

  // Sætter klassen "dark" på <html>, når temaet ændrer sig
  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'dark')
  }, [tema])

  function gemArtikel(artikel) {
    // Gem kun, hvis artiklen ikke allerede ligger i arkivet
    if (arkiv.some((a) => a.url === artikel.url)) return
    setArkiv([...arkiv, artikel])
  }

  function sletArtikel(url) {
    setArkiv(arkiv.filter((a) => a.url !== url))
  }

  return (
    <>
      <header className="top">
        <h1>Newsify</h1>
      </header>

      <main>
        {/* Alle sider er med hele tiden, så nyhederne ikke hentes igen. Kun den aktive vises. */}
        <div className={side === 'home' ? 'side aktiv' : 'side'}>
          <Home indstillinger={indstillinger} onGem={gemArtikel} />
        </div>
        <div className={side === 'archive' ? 'side aktiv' : 'side'}>
          <Arkiv arkiv={arkiv} onSlet={sletArtikel} />
        </div>
        <div className={side === 'popular' ? 'side aktiv' : 'side'}>
          <Populaer onGem={gemArtikel} />
        </div>
        <div className={side === 'settings' ? 'side aktiv' : 'side'}>
          <Settings
            indstillinger={indstillinger}
            setIndstillinger={setIndstillinger}
            tema={tema}
            setTema={setTema}
          />
        </div>
      </main>

      <Tabbar side={side} setSide={setSide} />
    </>
  )
}

export default App