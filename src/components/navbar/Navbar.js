import instructions from '../../instructions.svg'
import about from '../../about.svg'
import settings from '../../settings.svg'
import statistics from '../../statistics.svg'

export const Navbar = (props) => {

  return (
    <header>
      <div className="menu-container">
        <img src={about} alt="About"  onClick={() => props.setShowAboutModal(true)} />
        <img src={instructions} alt="How to play"  onClick={() => props.setShowInstructionsModal(true)} />
      </div>
      <div className="title">Wordle Practice</div>
      <div className="statistics-settings">
        <img src={statistics} className="statistics" alt="Results &amp; Statistics" onClick={() => props.setShowStatsModal(true)} />
        <img src={settings} alt="Settings" onClick={() => props.setShowSettingsModal(true)} />
      </div>
    </header>
  )
}