import {
  getMissedLetters
} from '../../lib/words'

export const CompletedRow = (props) => {
  const letters = Array.from(props.word)
  const missedLetters = getMissedLetters(props.word,props.solution)

  return (
    <div className={"game-row " + (props.isAnimating && "animating")}>
      {letters.map((letter, i) => (
        <div 
          key={i}
          className={
            (props.solution[i] === letter && "correct") ||
            (missedLetters.indexOf(letter) > -1 && "missed") ||
            "wrong"
          }
        >
          {letter}
        </div>
      ))}
    </div>
  )
}