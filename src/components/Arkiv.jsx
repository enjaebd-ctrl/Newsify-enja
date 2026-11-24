import Artikel from './Artikel'

function Arkiv({ arkiv, onSlet }) {
  if (arkiv.length === 0) {
    return <p className="tom">Ingen gemte artikler endnu</p>
  }

  return (
    <>
      {arkiv.map((a) => (
        <Artikel key={a.url} artikel={a} type="slet" onKnap={() => onSlet(a.url)} />
      ))}
    </>
  )
}

export default Arkiv