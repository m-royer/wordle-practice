import { WORD_LENGTH } from '../../constants/settings'

export const EmptyRow = () => {
  const blanks = Array.from(Array(WORD_LENGTH))

  return (
    <div className="game-row">
      { blanks.map( (_, i) => (
         <div key={i}></div>
      )) }
    </div>
  )
}