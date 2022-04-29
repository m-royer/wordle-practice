import { Key } from './Key'
import newWord from '../../newWord.svg'
import { useEffect } from 'react'

export const Keyboard = (props) => {

  const onClick = (letter) => {
    if(letter === "ENTER") {
      props.keyDownEnter()
    } else if (letter === "BACK") {
      props.keyDownBack()
    } else {
      props.keyDownLetter(letter)
    }
  }
  
  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter') {
        props.keyDownEnter()
      } else if (e.code === 'Backspace') {
        props.keyDownBack()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          props.keyDownLetter(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [props.keyDownEnter, props.keyDownBack, props.keyDownLetter])

  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
        {['Q','W','E','R','T','Y','U','I','O','P'].map((letter, i) => (
          <Key 
            key={i}
            letter={letter}
            onClick={onClick}
            revealedKeys={props.revealedKeys}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {['A','S','D','F','G','H','J','K','L'].map((letter, i) => (
          <Key 
            key={i}
            letter={letter}
            onClick={onClick}
            revealedKeys={props.revealedKeys}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {['ENTER','Z','X','C','V','B','N','M','BACK'].map((letter, i) => (
          <Key 
            key={i}
            letter={letter}
            onClick={onClick}
            revealedKeys={props.revealedKeys}
          />
        ))}
      </div>
      { !props.isAnimating && (props.gameWon || props.gameLost) &&
      <div className="game-over-overlay">
          <p>GAME OVER</p>
          <div className="btn" onClick={() => props.handleRestart()}>NEW WORD <img src={newWord} alt="icon showing a word being replaced" /></div>
      </div>
      }
    </div>
  )
}