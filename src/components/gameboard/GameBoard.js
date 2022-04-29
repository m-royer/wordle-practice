import { MAX_TRIES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

export const GameBoard = (props) => {
  // get completed rows
  const emptyRows = 
    props.guesses.length < MAX_TRIES - 1
    ? Array.from(Array(MAX_TRIES - props.currentRow - 1))
    : []

  return (
    <div className="game-board">
      {props.guesses.map( (row,i) => (
        <CompletedRow 
          key={i}
          word={row}
          solution={props.solution}
          gameWon={props.gameWon}
          isAnimating={(i === props.guesses.length - 1) ? props.isAnimating : false}
        />
      ))}
      {props.guesses.length <= MAX_TRIES - 1 && (
        <CurrentRow 
          currentGuess={props.currentGuess}
          gameWon={props.gameWon}
        />
      )}
      {emptyRows.map( (row,i) => (
        <EmptyRow 
          key={i} 
        />
      ))}
    </div>
  )
}