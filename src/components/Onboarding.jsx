import { useState } from 'react'
import onboarding1 from '../assets/Onboarding1.png'
import onboarding1Mork from '../assets/Onboarding1-dark.png'
import onboarding2 from '../assets/Onboarding2.png'
import onboarding2Mork from '../assets/Onboarding2-dark.png'
import onboarding3 from '../assets/Onboarding3.png'
import onboarding3Mork from '../assets/Onboarding3-dark.png'

// De tre sider i onboarding, med et billede til hvert tema
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

function Onboarding({ tema, onFaerdig }) {
  const [nr, setNr] = useState(0)
  const sidste = nr === sider.length - 1

  function fortsaet() {
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

        <div className="onboarding__prikker">
          {sider.map((s, i) => (
            <span key={i} className={i === nr ? 'prik aktiv' : 'prik'}></span>
          ))}
        </div>

        <div className="onboarding__knapper">
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