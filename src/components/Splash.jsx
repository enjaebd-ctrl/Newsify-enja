import logo from '../assets/logo.svg'

// stor er false på splash 1 og true på splash 2
function Splash({ stor }) {
  return (
    <div className="splash">
      <img className={stor ? 'splash__logo splash__logo--stor' : 'splash__logo'} src={logo} alt="" />
      {stor && <h1 className="splash__navn">Newsify</h1>}
    </div>
  )
}

export default Splash