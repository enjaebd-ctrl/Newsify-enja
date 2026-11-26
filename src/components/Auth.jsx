import logo from '../assets/logo.svg'

// Der er ikke noget rigtigt login, så alle knapper går bare videre til appen
// Siden er lavet for at ligne designet i Figma
// onFaerdig kommer fra App og skifter fasen til "app"
function Auth({ onFaerdig }) {
  return (
    <div className="auth">
      <img className="auth__logo" src={logo} alt="" />
      <h1 className="auth__navn">Newsify</h1>
      <p className="auth__tekst">Welcome! Let’s dive into your account!</p>

      <button className="knap knap--sosial" onClick={onFaerdig}>
        Continue with Facebook
      </button>
      <button className="knap knap--sosial" onClick={onFaerdig}>
        Continue with Google
      </button>

      {/* Linjerne på hver side af "or" bliver lavet i CSS med ::before og ::after */}
      <div className="auth__eller">or</div>

      <button className="knap auth__login" onClick={onFaerdig}>
        Sign in with password
      </button>

      <p className="auth__bund">
        Don’t have an account?{' '}
        <button className="auth__link" onClick={onFaerdig}>
          Sign up
        </button>
      </p>
    </div>
  )
}

export default Auth