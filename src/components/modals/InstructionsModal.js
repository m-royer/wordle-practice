import { ShowDoublesMessage } from '../notifications/ShowDoublesMessage.js'
import { BaseModal } from './BaseModal.js'
import newWord from '../../newWord.svg'

export const InstructionsModal = (props) => {

  return (
    <BaseModal 
      isShowing={props.showInstructionsModal} 
      titleImage="horizon3.png" 
      handleClose={props.handleClose}
      title="HOW TO PLAY"
    >
      <div className="instructions-wrapper">
        <p>Guess the Wordle in six tries.</p>
        <p>Each guess must be a valid five-letter word included in the official Wordle answer list. Hit the enter button to submit.</p>
        <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
        <hr />
        <p><em>Examples</em></p>
        <div className="game-board">
          <div className="game-row">
            <div className="correct">W</div>
            <div>E</div>
            <div>I</div>
            <div>R</div>
            <div>D</div>
          </div>
        </div>
        <p>The letter <em>W</em> is in the word and is in the correct spot.</p>
        <div className="game-board">
          <div className="game-row">
            <div>P</div>
            <div className="missed">R</div>
            <div>I</div>
            <div>M</div>
            <div>O</div>
          </div>
        </div>
        <p>The letter <em>R</em> is in the word but in the wrong spot.</p>
        <div className="game-board">
          <div className="game-row">
          <div>R</div>
          <div>A</div>
          <div>T</div>
          <div className="wrong">I</div>
          <div>O</div>
          </div>
        </div>
        <p>The letter <em>I</em> is not in the word in any spot.</p>
        <div className="game-board">
          <div className="game-row">
          {Array.from("RERUN").map( (letter, index) => (
            <div className="correct" key={index}>{letter}</div>
          ))}
          </div>
        </div>
        <ShowDoublesMessage hasDoubles={true} />
        <p>When this message shows the word contains at least one duplicate letter.</p>
        <hr />
        <p>Play as often as you like, the game is endless!</p>
        <div className="btn" onClick={() => props.handleClose()}>BEGIN GAME <img src={newWord} alt="icon showing a word being replaced" /></div>
      </div>
    </BaseModal>
  )
}