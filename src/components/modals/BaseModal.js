import close from '../../close.svg'

export const BaseModal = (props) => {

  const clickVoid = (e) => {
    e.stopPropagation()
  }

  return (
    <div className={`modal-overlay ${props.isShowing? "modal-show" : ""}`} onClick={() => props.handleClose()}>
      <div className={`modal-wrapper ${props.isShowing ? "modal-show" : ""}`} onClick={clickVoid}>
        <div className="modal-exit"><img src={close} onClick={() => props.handleClose()} alt="Close and return to game" /></div>
        <div className="title" style={{backgroundImage:`url(${require('../../' + props.titleImage)})`, backgroundSize:"cover", backgroundPosition: "bottom"}}>{props.title}</div>
        {props.children}
      </div>
    </div>
  )
}