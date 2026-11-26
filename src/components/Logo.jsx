import logo from '../assets/logo.svg'

// Det lille logo bruges mange steder (header, kategorier, settings)
// Derfor er det sin egen komponent, så vi ikke skal skrive det samme igen og igen
function Logo() {
  return <img className="logo" src={logo} alt="" />
}

export default Logo