import { MAX_TRIES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

export const GameBoard = (props) => {
  // get completed rows
  const emptyRows = 
    props.guesses.length < MAX_TRIES
    ? Array.from(Array(MAX_TRIES - props.currentRow))
    : []

  return (
    <div className="game-board">
      {props.guesses.map( (row,i) => (
        <CompletedRow 
          key={i}
          word={row}
          solution={props.solution}
          gameWon={props.gameWon}
        />
      ))}
      {props.guesses.length <= MAX_TRIES && (
        <CurrentRow 
          currentGuess={props.currentGuess}
          gameWon={props.gameWon}
          isRevealing={false}
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