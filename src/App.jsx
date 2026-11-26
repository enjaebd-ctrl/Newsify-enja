/*
  HUSKESEDDEL TIL NEWSIFY

  HVAD ER DET?
  En nyheds-app til mobilen. Den henter nyheder fra New York Times,
  viser dem i kategorier, og man kan swipe en artikel for at gemme den.

  HVORDAN HÆNGER FILERNE SAMMEN?
  main.jsx            Starter hele appen og lægger den ind i index.html

  App.jsx             Hjernen. Her ligger alt det, appen skal huske
                      (arkiv, tema, indstillinger), og den sender det ned til resten

  api.js              Henter nyhederne fra New York Times, gemmer dem i 10 minutter
                      og prøver igen, hvis NYT siger "for mange kald"

  data/kategorier.js  Listen over kategorier (World, Health, ...)

  hooks/useLocalStorage.js  Min egen hjælper, der husker ting, selv om man lukker siden

  components/         Byggeklodserne (se nedenfor)
  scss/               Alt udseendet, delt op i små filer

  KOMPONENTERNE (byggeklodserne)
  Splash, Onboarding, Auth   De tre skærme før selve appen
  Tabbar                     Knapperne i bunden
  Home                       Forsiden med søgefelt og kategorier
  Kategori                   Én kategori, som henter sine egne nyheder
  KategoriBoks               Boksen med overskrift, som kan foldes ind og ud
  Artikel                    Én nyhed, som man kan swipe
  Populaer                   Forsidens nyheder sorteret efter sektion
  Arkiv                      De gemte artikler
  Settings                   Slå kategorier til/fra og skift tema
  Logo                       Det lille logo, der bruges mange steder

  ORDLISTE (hvis nogen spørger, hvad det betyder)
  Komponent     En byggeklods i appen, fx en artikel eller tabbaren.
                Hver ligger i sin egen fil, så man kan bruge den flere gange.
  State         Noget appen husker, mens den kører, fx hvilken side man er på.
                Når det ændrer sig, tegner React skærmen om.
  Props         Ting en komponent får givet udefra, ligesom en funktion får
                noget at arbejde med. Fx får Artikel en artikel at vise.
  useEffect     "Gør det her, når komponenten kommer frem" eller "når den
                ting ændrer sig". Bruges fx til at hente nyheder.
  Hook          En funktion der starter med "use" og giver en komponent en
                ekstra evne. useLocalStorage er min egen.
  localStorage  Browserens lille gemmested. Her ligger arkivet, temaet og
                nyhederne, så de huskes, når man lukker og åbner siden igen.
  API           Den adresse hos New York Times, hvor man kan hente nyhederne.
  Cache         En midlertidig kopi af nyhederne, så vi ikke spørger igen og igen.
  Vite          Værktøjet der kører appen, mens jeg udvikler, og pakker den
                sammen til sidst.
  SCSS          CSS med ekstra funktioner, fx variabler og at skrive styling
                inde i hinanden. Vite laver det om til almindelig CSS.

  HVAD SKER DER, NÅR ...
  ... appen starter?
    main.jsx starter App. App viser splash 1 (1,2 sek), så splash 2 (1,8 sek).
    Første gang kommer onboarding (tutorialen) og login, ellers går man
    direkte ind i appen.

  ... nyhederne bliver vist?
    Hver Kategori kalder hentTopStories i api.js. Den kigger først i
    localStorage. Er der nyheder under 10 minutter gamle, bruger den dem.
    Ellers spørger den New York Times og gemmer svaret.

  ... man gemmer en artikel?
    Man swiper til venstre og trykker på bogmærket. Artikel kalder onKnap,
    og Kategori tilføjer kategorien. App tilføjer artiklen til arkivet.
    useLocalStorage gemmer arkivet, og bogmærket bliver fyldt næste gang.

  ... man skifter tema?
    Settings kalder setTema. App sætter klassen "dark" på siden, og så skifter
    CSS-farverne (se :root.dark i _base.scss).

  ... man swiper ned for at opdatere?
    App sletter de gemte nyheder fra localStorage og genindlæser siden,
    så nyhederne bliver hentet igen.
  ============================================================
*/

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
// Det bliver et objekt som { world: true, health: true, ... }
const startIndstillinger = {}
kategorier.forEach((k) => {
  startIndstillinger[k.sektion] = true
})

// Bruger telefonens tema, hvis brugeren ikke har valgt et selv
// Det står uden for App, så det kun bliver tjekket én gang
let systemTema = 'light'
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  systemTema = 'dark'
}

function App() {
  // fase bestemmer hvad man ser: splash1, splash2, onboarding, auth eller app
  const [fase, setFase] = useState('splash1')

  // side bestemmer hvilken fane man er på i selve appen
  const [side, setSide] = useState('home')

  // Disse tre gemmes i localStorage, så de huskes næste gang
  const [arkiv, setArkiv] = useLocalStorage('newsify-arkiv', [])
  const [indstillinger, setIndstillinger] = useLocalStorage('newsify-kategorier', startIndstillinger)
  const [tema, setTema] = useLocalStorage('newsify-tema', systemTema)

  // Husker om brugeren har været igennem onboarding og login
  const [introSet, setIntroSet] = useLocalStorage('newsify-intro-set', false)

  // Til swipe-down to refresh
  // Vi gemmer hvor fingeren startede, og om man stod øverst på siden
  const [start, setStart] = useState({ x: 0, y: 0, top: false })
  const [opdaterer, setOpdaterer] = useState(false)

  // En liste med url'erne på alle gemte artikler
  // Den bliver sendt ned til artiklerne, så de kan se, om de allerede er gemt
  // (url er unik for hver artikel, så den bruger vi til at kende dem fra hinanden)
  const gemteUrls = arkiv.map((a) => a.url)

  // Sætter klassen "dark" på <html>, når temaet ændrer sig
  // I CSS har :root.dark andre farver, så hele appen skifter udseende
  useEffect(() => {
    if (tema === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [tema])

  // Styrer de to splash screens med timere
  // Når fase ændrer sig, kører denne kode igen og starter næste timer
  useEffect(() => {
    if (fase === 'splash1') {
      const timer = setTimeout(() => setFase('splash2'), 1200)
      // Oprydning: stopper timeren, hvis fasen skifter før den er færdig
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

  // Kører når man trykker Skip eller er færdig med sidste onboarding-side
  // Onboarding vises kun første gang, så man går altid videre til login-siden
  function efterOnboarding() {
    setFase('auth')
  }

  // Kører når man trykker på en knap på login-siden
  function efterAuth() {
    // Gemmer at intro er set, så splash-skærmen springer det over næste gang
    setIntroSet(true)
    setFase('app')
  }

  function gemArtikel(artikel) {
    // Man må ikke gemme den samme artikel to gange
    // some giver true, hvis mindst én artikel i arkivet har samme url
    const findes = arkiv.some((a) => a.url === artikel.url)
    if (findes) return

    // Vi laver en ny liste med alle de gamle, plus den nye (vi ændrer aldrig state direkte)
    setArkiv([...arkiv, artikel])
  }

  function sletArtikel(url) {
    // filter beholder alle artikler, undtagen den med den url vi vil slette
    setArkiv(arkiv.filter((a) => a.url !== url))
  }

  // Når fingeren rører skærmen: husk hvor den startede
  function handleTouchStart(event) {
    setStart({
      x: event.touches[0].screenX,
      y: event.touches[0].screenY,
      top: window.scrollY === 0, // stod man øverst på siden?
    })
  }

  // Når fingeren slipper: tjek om det var et swipe ned
  function handleTouchEnd(event) {
    // Det virker kun på Home og Popular
    if (side !== 'home' && side !== 'popular') return

    // Man skal have stået øverst, da man begyndte at swipe
    if (!start.top) return

    // dx = hvor langt til siden (Math.abs fjerner minus), dy = hvor langt nedad
    const dx = Math.abs(event.changedTouches[0].screenX - start.x)
    const dy = event.changedTouches[0].screenY - start.y

    // Langt nok nedad, og ikke mest til siden
    if (dy > 100 && dx < 50) {
      opdater()
    }
  }

  function opdater() {
    // Viser beskeden "Refreshing..."
    setOpdaterer(true)

    // Sletter de gemte nyheder, så de bliver hentet igen
    // Jeg løber bagfra, fordi listen bliver kortere når jeg sletter
    // Vi sletter kun nøgler der starter med newsify-cache-, så arkivet og indstillinger bliver
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
  // Hvis fasen ikke er "app", viser vi bare den skærm og stopper her
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
        {/* Klassen "aktiv" gør siden synlig i CSS, de andre har display: none */}
        <div className={side === 'home' ? 'side aktiv' : 'side'}>
          {/* gemteUrls bruges til at vise et fyldt bogmærke på de artikler, der allerede er gemt */}
          <Home indstillinger={indstillinger} onGem={gemArtikel} gemteUrls={gemteUrls} />
        </div>
        <div className={side === 'archive' ? 'side aktiv' : 'side'}>
          <Arkiv arkiv={arkiv} onSlet={sletArtikel} />
        </div>
        <div className={side === 'popular' ? 'side aktiv' : 'side'}>
          {/* aktiv fortæller Populaer, om man står på siden, så den først henter nyheder, når man åbner den */}
          <Populaer onGem={gemArtikel} aktiv={side === 'popular'} gemteUrls={gemteUrls} />
        </div>
        <div className={side === 'settings' ? 'side aktiv' : 'side'}>
          {/* Settings får både værdierne og funktionerne til at ændre dem (props) */}
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