import note from '../../note.svg'

export const ShowDoublesMessage = (props) => {
  if(!props.hasDoubles) {
    return <div></div>
  }

  return (
    <div className="doubles-wrapper">
      <img src={note} /> Double letters present
    </div>
  )
}