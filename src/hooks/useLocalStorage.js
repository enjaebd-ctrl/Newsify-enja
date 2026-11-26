import { useEffect, useState } from 'react'

// Virker ligesom useState, men gemmer også værdien i localStorage
// Det gør, at appen husker tingene, når man lukker og åbner den igen
// noegle = navnet i localStorage, startvaerdi = det man får første gang (hvis intet er gemt)
export default function useLocalStorage(noegle, startvaerdi) {
  // Når vi giver useState en funktion, kører den kun én gang (første gang komponenten vises)
  // Så vi læser ikke fra localStorage hver gang siden opdateres
  const [vaerdi, setVaerdi] = useState(() => {
    const gemt = localStorage.getItem(noegle)

    // Er der noget gemt, bruger vi det. JSON.parse laver teksten om til den rigtige værdi igen
    // (Selv teksten "false" tæller som noget her, fordi den ikke er tom)
    if (gemt) {
      return JSON.parse(gemt)
    }
    return startvaerdi
  })

  // Hver gang værdien ændrer sig, gemmer vi den
  // localStorage kan kun gemme tekst, så vi bruger JSON.stringify
  useEffect(() => {
    localStorage.setItem(noegle, JSON.stringify(vaerdi))
  }, [noegle, vaerdi])

  // Samme som useState: [værdien, funktion til at ændre den]
  return [vaerdi, setVaerdi]
}