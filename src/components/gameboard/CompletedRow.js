import {
  getMissedLetters,
  getWrongLetters
} from '../../lib/words'

export const CompletedRow = (props) => {
  const letters = Array.from(props.word)
  const missedLetters = getMissedLetters(props.word,props.solution)
  const wrongLetters = getWrongLetters(props.word,props.solution)

  return (
    <div className="game-row">
      {letters.map((letter, i) => (
        <div 
          key={i}
          className={
            (props.solution[i] === letter && "correct") ||
            (missedLetters.indexOf(letter) > -1 && "missed") ||
            (wrongLetters.indexOf(letter) > -1 && "wrong") ||
            ""
          }
        >
          {letter}
        </div>
      ))}
    </div>
  )
}