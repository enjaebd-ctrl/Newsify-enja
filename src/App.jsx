import { useEffect, useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import { kategorier } from './data/kategorier'
import Logo from './components/Logo'
import Home from './components/Home'
import Arkiv from './components/Arkiv'
import Populaer from './components/Populaer'
import Settings from './components/Settings'
import Tabbar from './components/Tabbar'
import Splash from './components/Splash'
import Onboarding from './components/Onboarding'
import Auth from './components/Auth'

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
  // fase bestemmer hvad man ser: splash1, splash2, onboarding, auth eller app
  const [fase, setFase] = useState('splash1')
  const [side, setSide] = useState('home')
  const [arkiv, setArkiv] = useLocalStorage('newsify-arkiv', [])
  const [indstillinger, setIndstillinger] = useLocalStorage('newsify-kategorier', startIndstillinger)
  const [tema, setTema] = useLocalStorage('newsify-tema', systemTema)
  const [raekkefolge, setRaekkefolge] = useLocalStorage('newsify-raekkefolge', kategorier)

  // Husker om brugeren har været igennem onboarding og login
  const [introSet, setIntroSet] = useLocalStorage('newsify-intro-set', false)

  // Til swipe-down to refresh
  const [start, setStart] = useState({ x: 0, y: 0, top: false })
  const [opdaterer, setOpdaterer] = useState(false)

  // Sætter klassen "dark" på <html>, når temaet ændrer sig
  useEffect(() => {
    if (tema === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [tema])

  // Styrer de to splash screens med timere
  useEffect(() => {
    if (fase === 'splash1') {
      const timer = setTimeout(() => setFase('splash2'), 1200)
      return () => clearTimeout(timer)
    }

    if (fase === 'splash2') {
      const timer = setTimeout(() => {
        // Har man set intro før, springer vi direkte ind i appen
        if (introSet) {
          setFase('app')
        } else {
          setFase('onboarding')
        }
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [fase, introSet])

  function efterOnboarding() {
    // Ser man tutorialen igen fra settings, skal man ikke logge ind igen
    if (introSet) {
      setFase('app')
    } else {
      setFase('auth')
    }
  }

  function efterAuth() {
    setIntroSet(true)
    setFase('app')
  }

  function gemArtikel(artikel) {
    // Man må ikke gemme den samme artikel to gange
    const findes = arkiv.some((a) => a.url === artikel.url)
    if (findes) return

    setArkiv([...arkiv, artikel])
  }

  function sletArtikel(url) {
    setArkiv(arkiv.filter((a) => a.url !== url))
  }

  function handleTouchStart(event) {
    setStart({
      x: event.touches[0].screenX,
      y: event.touches[0].screenY,
      top: window.scrollY === 0, // stod man øverst på siden?
    })
  }

  function handleTouchEnd(event) {
    // Det virker kun på Home og Popular
    if (side !== 'home' && side !== 'popular') return

    // Man skal have stået øverst, da man begyndte at swipe
    if (!start.top) return

    const dx = Math.abs(event.changedTouches[0].screenX - start.x)
    const dy = event.changedTouches[0].screenY - start.y

    // Langt nok nedad, og ikke mest til siden
    if (dy > 100 && dx < 50) {
      opdater()
    }
  }

  function opdater() {
    setOpdaterer(true)

    // Sletter de gemte nyheder, så de bliver hentet igen
    // Jeg løber bagfra, fordi listen bliver kortere når jeg sletter
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const noegle = localStorage.key(i)
      if (noegle.startsWith('newsify-cache-')) {
        localStorage.removeItem(noegle)
      }
    }

    // Venter lidt, så man kan nå at se beskeden, og genindlæser siden
    setTimeout(() => {
      window.location.reload()
    }, 600)
  }

  // Alt det her kommer før selve appen
  if (fase === 'splash1') return <Splash stor={false} />
  if (fase === 'splash2') return <Splash stor={true} />
  if (fase === 'onboarding') return <Onboarding tema={tema} onFaerdig={efterOnboarding} />
  if (fase === 'auth') return <Auth onFaerdig={efterAuth} />

  return (
    <>
      <header className="top">
        <Logo />
        <h1>Newsify</h1>
      </header>

      {opdaterer && <p className="opdaterer">Refreshing...</p>}

      <main onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* Alle sider ligger i DOM'en hele tiden, så nyhederne ikke hentes igen. Kun den aktive vises */}
        <div className={side === 'home' ? 'side aktiv' : 'side'}>
          <Home raekkefolge={raekkefolge} indstillinger={indstillinger} onGem={gemArtikel} />
        </div>
        <div className={side === 'archive' ? 'side aktiv' : 'side'}>
          <Arkiv arkiv={arkiv} onSlet={sletArtikel} />
        </div>
        <div className={side === 'popular' ? 'side aktiv' : 'side'}>
          <Populaer onGem={gemArtikel} />
        </div>
        <div className={side === 'settings' ? 'side aktiv' : 'side'}>
          <Settings
            raekkefolge={raekkefolge}
            setRaekkefolge={setRaekkefolge}
            indstillinger={indstillinger}
            setIndstillinger={setIndstillinger}
            tema={tema}
            setTema={setTema}
            onVisTutorial={() => setFase('onboarding')}
          />
        </div>
      </main>

      <Tabbar side={side} setSide={setSide} />
    </>
  )
}

export default App