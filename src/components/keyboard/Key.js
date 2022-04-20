import back from '../../back.svg'

export const Key = (props) => {

  const handleClick = (e) => {
      props.onClick(props.letter)
  }

  let style=""
  if(props.revealedKeys["missed"].indexOf(props.letter) > -1) {style = "missed"}
  if(props.revealedKeys["wrong"].indexOf(props.letter) > -1) {style = "wrong"}
  if(props.revealedKeys["correct"].indexOf(props.letter) > -1) {style = "correct"}
  if(props.letter === "BACK") {style = "back"}
  if(props.letter === "ENTER") {style = "enter"}
  

  return (
    <div 
      key="{props.letter}" 
      onClick={handleClick}
      className={style}
    >
      {props.letter === "BACK" ? <img src={back} alt='back' /> : props.letter}
    </div>
  )
}