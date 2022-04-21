import { BaseModal } from './BaseModal.js'
import external from '../../external.svg'

export const SettingsModal = (props) => {

  const checkIt = (e) => {
    e.stopPropagation()
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
          <input type="checkbox" name="chkHard" onClick={checkIt} />
        </div>
        <div className="checkbox-wrapper">
          <label htmlFor="chkContrast">
            High Contrast<br />
          </label>
          <input type="checkbox" name="chkContrast" onClick={checkIt} />
        </div>
        <div className="flex-center" style={{marginTop: "1.5rem"}}>Created 2022 by <a href="https://royerwebdesign.com/"> MICHAEL ROYER</a> <img src={external} className="icon" /></div>
      </div>
    </BaseModal>
  )
}