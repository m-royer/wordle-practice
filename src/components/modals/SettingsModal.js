import { BaseModal } from './BaseModal.js'
import external from '../../external.svg'

export const SettingsModal = (props) => {

  const toggleHardMode = () => {
    console.log(props.guesses)
    if(props.gameWon || props.gameLost ||  props.guesses.length > 0) {
      props.handleClose()
      props.setNotification("Can only activate hard mode at the start of a game before any guesses!")
    } else {
      props.setHardMode(!props.hardMode)
    }
  }

  const toggleHighContrast = () => {
    props.setHighContrast(!props.highContrast)
  }

  return (
    <BaseModal 
      isShowing={props.showSettingsModal} 
      titleImage="horizon2.png" 
      handleClose={props.handleClose}
      title="SETTINGS"
    >
      <div className="settings-wrapper">
        <div className="checkbox-wrapper">
          <label htmlFor="chkHard">
            Hard Mode<br />
            <small>Any revealed hints must be used in subsequent guesses</small>
          </label>
          <input type="checkbox" name="chkHard" checked={props.hardMode} onChange={toggleHardMode} />
        </div>
        <div className="checkbox-wrapper">
          <label htmlFor="chkContrast">
            High Contrast<br />
          </label>
          <input type="checkbox" name="chkContrast" checked={props.highContrast} onChange={toggleHighContrast} />
        </div>
        <div className="flex-center" style={{marginTop: "1.5rem"}}>Created 2022 by <a href="https://royerwebdesign.com/"> MICHAEL ROYER</a> <img src={external} className="icon" alt="" /></div>
      </div>
    </BaseModal>
  )
}