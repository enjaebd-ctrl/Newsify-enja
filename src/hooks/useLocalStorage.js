import { useEffect, useState } from 'react'

// Virker ligesom useState, men gemmer også værdien i localStorage
export default function useLocalStorage(noegle, startvaerdi) {
  const [vaerdi, setVaerdi] = useState(() => {
    const gemt = localStorage.getItem(noegle)

    // Hvis der er noget gemt bruger vi det, ellers startværdien
    if (gemt) {
      return JSON.parse(gemt)
    }
    return startvaerdi
  })

  // Gemmer hver gang værdien ændrer sig
  useEffect(() => {
    localStorage.setItem(noegle, JSON.stringify(vaerdi))
  }, [noegle, vaerdi])

  return [vaerdi, setVaerdi]
}