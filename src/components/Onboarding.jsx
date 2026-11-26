import { useState } from 'react'
import onboarding1 from '../assets/Onboarding1.png'
import onboarding1Mork from '../assets/Onboarding1-dark.png'
import onboarding2 from '../assets/Onboarding2.png'
import onboarding2Mork from '../assets/Onboarding2-dark.png'
import onboarding3 from '../assets/Onboarding3.png'
import onboarding3Mork from '../assets/Onboarding3-dark.png'

// De tre sider i onboarding, med et billede til hvert tema
// Det er en liste, så vi kun skal skrive komponenten én gang og bare skifte indhold
const sider = [
  {
    billede: onboarding1,
    billedeMork: onboarding1Mork,
    titel: 'Stay Connected, Everywhere, Anytime',
    tekst: 'Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.',
  },
  {
    billede: onboarding2,
    billedeMork: onboarding2Mork,
    titel: 'Become a Savvy Global Citizen.',
    tekst: 'Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!',
  },
  {
    billede: onboarding3,
    billedeMork: onboarding3Mork,
    titel: 'Enhance your News Journey Now!',
    tekst: 'Be part of our dynamic community and contribute your insights and participate in enriching conversations.',
  },
]

// tema bruges til at vælge billede, onFaerdig kører når onboarding er slut
function Onboarding({ tema, onFaerdig }) {
  // nr er hvilken side vi er på (0, 1 eller 2)
  const [nr, setNr] = useState(0)

  // true når vi er på den sidste side
  const sidste = nr === sider.length - 1

  function fortsaet() {
    // Sidste side: færdig. Ellers gå en side frem
    if (sidste) {
      onFaerdig()
    } else {
      setNr(nr + 1)
    }
  }

  // Vælger billedet efter temaet
  let billede = sider[nr].billede
  if (tema === 'dark') {
    billede = sider[nr].billedeMork
  }

  return (
    <div className="onboarding">
      <div className="onboarding__billede">
        <img src={billede} alt="" />
      </div>

      <div className="onboarding__indhold">
        <h2>{sider[nr].titel}</h2>
        <p>{sider[nr].tekst}</p>

        {/* En prik for hver side. Den aktive prik får klassen "aktiv" og bliver lang og grøn */}
        <div className="onboarding__prikker">
          {sider.map((s, i) => (
            <span key={i} className={i === nr ? 'prik aktiv' : 'prik'}></span>
          ))}
        </div>

        <div className="onboarding__knapper">
          {/* Skip går direkte til slutningen */}
          <button className="knap knap--outline" onClick={onFaerdig}>
            Skip
          </button>
          <button className="knap" onClick={fortsaet}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding