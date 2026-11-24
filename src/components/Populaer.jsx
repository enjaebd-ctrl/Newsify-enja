import { useEffect, useState } from 'react'
import { hentTopStories } from '../api'
import Artikel from './Artikel'

function Populaer({ onGem }) {
  const [artikler, setArtikler] = useState([])

  useEffect(() => {
    // "home" er forsiden på nytimes.com
    hentTopStories('home').then(setArtikler)
  }, [])

  return (
    <>
      {artikler.map((a) => (
        <Artikel key={a.url} artikel={a} type="gem" onKnap={() => onGem(a)} />
      ))}
    </>
  )
}

export default Populaer