import { BaseModal } from './BaseModal.js'

export const AboutModal = (props) => {

  return (
    <BaseModal 
      isShowing={props.showAboutModal} 
      titleImage="horizon2.png" 
      handleClose={props.handleClose}
      title="ABOUT"
    >
      <div className="about-wrapper">
        By Michael Royer, &copy;2022
      </div>
    </BaseModal>
  )
}