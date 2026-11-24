import { useEffect, useState } from 'react'

// Ligesom useState, men værdien huskes i localStorage
export default function useLocalStorage(nøgle, startværdi) {
  const [værdi, setVærdi] = useState(() => {
    const gemt = localStorage.getItem(nøgle)
    return gemt ? JSON.parse(gemt) : startværdi
  })

  useEffect(() => {
    localStorage.setItem(nøgle, JSON.stringify(værdi))
  }, [nøgle, værdi])

  return [værdi, setVærdi]
}