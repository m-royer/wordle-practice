import { isFocusable } from '@testing-library/user-event/dist/utils'
import { WORD_LENGTH } from '../../constants/settings'

export const CurrentRow = (props) => {
  const letters = Array.from(props.currentGuess)
  const emptySpaces = Array.from(Array(WORD_LENGTH - letters.length))

  if(props.gameWon)
    return null;

  return (
    <div className="game-row">
      
      {letters.map((letter, i) => (
        <div key={i}>{letter}</div>
      ))}
      {emptySpaces.map((blank,i) => (
        <div key={i}></div>
      ))}
    </div>
  )
}