import './scss/App.scss'
import { useState, useEffect } from 'react'
import { 
  WORD_LENGTH, 
  MAX_TRIES, 
  HARD_MODE,
  ANIMATION_TIME
} from './constants/settings'
import {
  isValidWord,
  newSolution,
  calculateRevealedKeys
} from './lib/words'
import { Navbar } from './components/navbar/Navbar'
import { Notifications } from './components/notifications/Notifications'
import { GameBoard } from './components/gameboard/GameBoard'
import { Keyboard } from './components/keyboard/Keyboard'
import { InstructionsModal } from './components/modals/InstructionsModal'
import { AboutModal } from './components/modals/AboutModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'



function App() {

  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState(() => {
    // Load existing game from local storage if exists

    // If not, no guesses
    return [];
  })
  const [solution, setSolution] = useState("HOWDY")
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [isGameRunning, setIsGameRunning] = useState(true)
  const [stats, setStats] = useState(false)
  const [currentRow, setCurrentRow] = useState(0)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showInstructionsModal, setShowInstructionsModal] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [notification,setNotification] = useState("init")
  const [revealedKeys, setRevealedKeys] = useState({
    missed: [],
    correct: [],
    wrong: []
  })

  useEffect(() => {
    if(gameWon) {
      // show win message
      
    }
  },[gameWon])

  useEffect(() => {
    if(notification !== "" && !gameWon && !gameLost) {
      setTimeout(function() {
        setNotification("")
      },5000)
    }
  },[notification,gameWon,gameLost])

  const keyDownEnter = () => {
    if(gameWon || gameLost) {
      return
    }

    if(currentGuess.length < WORD_LENGTH) {
      setNotification("Too short")
      return
    }

    if(!isValidWord(currentGuess)) {
      // not valid word
      setNotification("Invalid word")
      return
    }

    if(currentGuess !== solution) {
      setNotification(currentGuess + " != " + solution)
      setRevealedKeys(calculateRevealedKeys(currentGuess,revealedKeys,solution))
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
      setCurrentRow(currentRow + 1)
      if(guesses.length === MAX_TRIES) {
        setGameLost(true)
        setNotification("No tries left")
        setTimeout(function() {
          setShowStatsModal(true)
        },2000)
      }
    } else {
      setNotification("You won!")
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
      setCurrentRow(currentRow + 1)
      setIsGameRunning(false)
      setGameWon(true)
      setTimeout(function() {
        setShowStatsModal(true)
      },2000)
    }
  }

  const handleRestart = () => {
    setShowStatsModal(false)
    setCurrentGuess("")
    setCurrentRow(0)
    setGuesses([])
    setRevealedKeys({
      missed: [],
      correct: [],
      wrong: []
    })
    setGameLost(false)
    setGameWon(false)
    setSolution(newSolution())
    setIsGameRunning(true)
    setNotification(solution)
  }

  const keyDownBack = () => {
    if(currentGuess.length > 0 && isGameRunning) {
      const currentGuessArray = Array.from(currentGuess)
      currentGuessArray.pop();
      setCurrentGuess(currentGuessArray.join(''))
    }
  }

  const keyDownLetter = (letter) => {
    if(currentGuess.length < WORD_LENGTH && isGameRunning) {
      setCurrentGuess(currentGuess + letter)
    }
  }


  return (
    <div className="App">
      <Navbar
        setShowInstructionsModal={setShowInstructionsModal}
        setShowAboutModal={setShowAboutModal}
        setShowSettingsModal={setShowSettingsModal}
        setShowStatsModal={setShowStatsModal}
      />
      <Notifications 
        isNotifying={false}
        message={notification}
      />
      <GameBoard 
        currentGuess={currentGuess} 
        currentRow={currentRow}
        guesses={guesses}
        solution={solution}
        isAnimating={isAnimating}
      />
      <Keyboard 
        keyDownEnter={keyDownEnter}
        keyDownBack={keyDownBack}
        keyDownLetter={keyDownLetter}
        revealedKeys={revealedKeys}
        gameLost={gameLost}
        gameWon={gameWon}
        handleRestart={handleRestart}
      />
      <InstructionsModal 
        showInstructionsModal={showInstructionsModal}
        handleClose={() => setShowInstructionsModal(false)}
      />
      <AboutModal 
        showAboutModal={showAboutModal}
        handleClose={() => setShowAboutModal(false)}
      />
      <StatsModal 
        gameWon={gameWon}
        gameLost={gameLost}
        showStatsModal={showStatsModal}
        handleClose={() => setShowStatsModal(false)}
        handleRestart={handleRestart}
      />
      <SettingsModal 
        showSettingsModal={showSettingsModal}
        handleClose={() => setShowSettingsModal(false)}
      />
    </div>
  )
}


export default App