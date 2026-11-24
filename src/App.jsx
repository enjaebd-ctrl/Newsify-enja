import { useEffect, useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import { kategorier } from './data/kategorier'
import Logo from './components/Logo'
import Home from './components/Home'
import Arkiv from './components/Arkiv'
import Populaer from './components/Populaer'
import Settings from './components/Settings'
import Tabbar from './components/Tabbar'

// Første gang er alle kategorier slået til
const startIndstillinger = {}
kategorier.forEach((k) => {
  startIndstillinger[k.sektion] = true
})

// Bruger telefonens tema, hvis brugeren ikke har valgt et selv
let systemTema = 'light'
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  systemTema = 'dark'
}

function App() {
  const [side, setSide] = useState('home')
  const [arkiv, setArkiv] = useLocalStorage('newsify-arkiv', [])
  const [indstillinger, setIndstillinger] = useLocalStorage('newsify-kategorier', startIndstillinger)
  const [tema, setTema] = useLocalStorage('newsify-tema', systemTema)

  // Sætter klassen "dark" på <html>, når temaet ændrer sig
  useEffect(() => {
    if (tema === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [tema])

  function gemArtikel(artikel) {
    // Man må ikke gemme den samme artikel to gange
    const findes = arkiv.some((a) => a.url === artikel.url)
    if (findes) return

    setArkiv([...arkiv, artikel])
  }

  function sletArtikel(url) {
    setArkiv(arkiv.filter((a) => a.url !== url))
  }

  return (
    <>
      <header className="top">
        <Logo />
        <h1>Newsify</h1>
      </header>

      <main>
        {/* Alle sider ligger i DOM'en hele tiden, så nyhederne ikke hentes igen. Kun den aktive vises */}
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