import logo from '../assets/logo.svg'

// De to splash screens er den samme komponent med forskellig størrelse
// stor er false på splash 1 og true på splash 2
function Splash({ stor }) {
  return (
    <div className="splash">
      {/* Når stor bliver true, får logoet en ekstra klasse, og CSS animerer væksten */}
      <img className={stor ? 'splash__logo splash__logo--stor' : 'splash__logo'} src={logo} alt="" />
      {/* Navnet vises kun på splash 2 */}
      {stor && <h1 className="splash__navn">Newsify</h1>}
    </div>
  )
}

export default Splash