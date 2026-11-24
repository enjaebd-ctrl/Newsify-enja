import { useEffect, useState } from 'react'
import { hentTopStories } from '../api'
import Artikel from './Artikel'

function Kategori({ navn, sektion, onGem }) {
  const [artikler, setArtikler] = useState([])
  const [lukket, setLukket] = useState(false)

  useEffect(() => {
    hentTopStories(sektion).then(setArtikler)
  }, [sektion])

  return (
    <div className={lukket ? 'kategori lukket' : 'kategori'}>
      <button className="kategori__top" onClick={() => setLukket(!lukket)}>
        {navn}
        <span>⌄</span>
      </button>

      <div className="kategori__indhold">
        <div className="kategori__liste">
          {artikler.map((a) => (
            <Artikel key={a.url} artikel={a} type="gem" onKnap={() => onGem(a)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Kategori