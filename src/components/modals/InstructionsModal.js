import { BaseModal } from './BaseModal.js'

export const InstructionsModal = (props) => {

  return (
    <BaseModal 
      isShowing={props.showInstructionsModal} 
      titleImage="horizon3.png" 
      handleClose={props.handleClose}
      title="HOW TO PLAY"
    >
      <div className="instructions-wrapper">
        First, you guess, then you win.
      </div>
    </BaseModal>
  )
}