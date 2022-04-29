import './scss/App.scss'
import { useState, useEffect } from 'react'
import { 
  WORD_LENGTH, 
  MAX_TRIES,
  ANIMATION_TIME
} from './constants/settings'
import {
  isValidWord,
  newSolution,
  calculateRevealedKeys,
  calculateAllRevealedKeys,
  findUnused
} from './lib/words'
import { Navbar } from './components/navbar/Navbar'
import { Notifications } from './components/notifications/Notifications'
import { GameBoard } from './components/gameboard/GameBoard'
import { ShowDoublesMessage } from './components/notifications/ShowDoublesMessage'
import { Keyboard } from './components/keyboard/Keyboard'
import { InstructionsModal } from './components/modals/InstructionsModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { share, getShareText } from './lib/share'
import { 
  loadGameState, 
  loadGameStats, 
  saveGameState,
  updateStats,
  checkGameStats,
  loadHardMode,
  loadHighContrast,
  saveSettings
} from './lib/localStorage'



function App() {

  const [currentGuess, setCurrentGuess] = useState("")
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [isGameRunning, setIsGameRunning] = useState(true)
  const [stats, setStats] = useState(loadGameStats)
  const [hardMode, setHardMode] = useState(loadHardMode())
  const [highContrast, setHighContrast] = useState(loadHighContrast())
  const [currentRow, setCurrentRow] = useState(0)
  const [showInstructionsModal, setShowInstructionsModal] = useState(() => {return !checkGameStats()})
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasDoubles, setHasDoubles] = useState(false)
  const [notification,setNotification] = useState("")
  const [solution, setSolution] = useState(() => {
    const loadState = loadGameState()
    if(!loadState || !loadState.solution) {
      let s = newSolution()
      saveGameState([],s)
      return s
    }

    return loadState?.solution
  })
  const [guesses, setGuesses] = useState(() => {
    let loadState = loadGameState()
    // no game saved or game has been won/lost
    if(!loadState || !loadState.solution || loadState?.guesses.length === 0) {
      return []
    }

    if(loadState.guesses.includes(loadState.solution)) {
      setShowStatsModal(true)
      setGameWon(true)
    }

    if(loadState.guesses.length === MAX_TRIES) {
      setShowStatsModal(true)
      setGameLost(true)
    }
    
    setCurrentRow(loadState.guesses.length)
    return loadState.guesses
  })
  const [revealedKeys, setRevealedKeys] = useState(calculateAllRevealedKeys(guesses,solution))



/**  HOOKS  */
  useEffect(() => {
    if(notification !== "" && !gameWon && !gameLost) {
      setTimeout(function() {
        setNotification("")
      },5000)
    }
  },[notification,gameWon,gameLost])

  useEffect(() => {
    if(gameWon === true)
      setNotification("You won!")

    if(gameLost === true)
      setNotification("No more tries remaining!")
  },[gameWon,gameLost])

  useEffect(() => {
    let uniques = [...new Set(solution)]
    setHasDoubles(solution.length === uniques.length ? false : true)
  },[solution])

  useEffect(() => {
    saveGameState(guesses,solution)
  },[guesses,solution])

  useEffect(() => {
    saveSettings(hardMode,highContrast)
  },[hardMode,highContrast])


/**  EVENTS  **/
  const handleShare = () => {
    const shareText = getShareText(guesses, solution, highContrast)
    share(shareText)
    setNotification("copied!")
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
    let s = newSolution()
    saveGameState([],s)
    setSolution(s)
    setIsGameRunning(true)
  }

  const keyDownEnter = () => {
    if(gameWon || gameLost) {
      return
    }

    if(currentGuess.length < WORD_LENGTH) {
      setNotification("Too short")
      return
    }

    if(!isValidWord(currentGuess)) {
      setNotification("Invalid word")
      return
    }

    // Hard mode stuff
    if(hardMode) {
      const hasUnused = findUnused(currentGuess, guesses, solution)
      if(hasUnused) {
        setNotification(hasUnused)
        return
      }
    }

    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
    },ANIMATION_TIME * 6)

    // Where the magic happens
    if(currentGuess !== solution) {
      setNotification(currentGuess + " != " + solution)
      setRevealedKeys(calculateRevealedKeys(currentGuess,revealedKeys,solution))
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
      setCurrentRow(currentRow + 1)
      if(guesses.length === MAX_TRIES - 1) {
        setGameLost(true)
        setStats(updateStats(stats,currentRow + 1))
        setTimeout(function() {
          setShowStatsModal(true)
        },ANIMATION_TIME * 6 + 500)
      }
    } else {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
      setCurrentRow(currentRow + 1)
      setStats(updateStats(stats,currentRow))
      setIsGameRunning(false)
      setGameWon(true)
      setTimeout(function() {
        setShowStatsModal(true)
      },ANIMATION_TIME * 6 + 500)
    }
  }

  const keyDownBack = () => {
    if(currentGuess.length > 0 && isGameRunning) {
      const currentGuessArray = Array.from(currentGuess)
      currentGuessArray.pop()
      setCurrentGuess(currentGuessArray.join(''))
    }
  }

  const keyDownLetter = (letter) => {
    if(currentGuess.length < WORD_LENGTH && isGameRunning) {
      setCurrentGuess(currentGuess + letter)
    }
  }


  return (
    <div className={"App " + ((highContrast && "high-contrast") || "")}>
      <Navbar
        setShowInstructionsModal={setShowInstructionsModal}
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
      <ShowDoublesMessage
        hasDoubles={hasDoubles}
      />
      <Keyboard 
        keyDownEnter={keyDownEnter}
        keyDownBack={keyDownBack}
        keyDownLetter={keyDownLetter}
        revealedKeys={revealedKeys}
        gameLost={gameLost}
        gameWon={gameWon}
        isAnimating={isAnimating}
        handleRestart={handleRestart}
      />
      <InstructionsModal 
        showInstructionsModal={showInstructionsModal}
        handleClose={() => setShowInstructionsModal(false)}
      />
      <StatsModal 
        gameWon={gameWon}
        gameLost={gameLost}
        showStatsModal={showStatsModal}
        stats={stats}
        handleClose={() => setShowStatsModal(false)}
        handleRestart={handleRestart}
        handleShare={handleShare}
      />
      <SettingsModal 
        showSettingsModal={showSettingsModal}
        handleClose={() => setShowSettingsModal(false)}
        hardMode={hardMode}
        highContrast={highContrast}
        gameWon={gameWon}
        gameLost={gameLost}
        guesses={guesses}
        setNotification={setNotification}
        setHardMode={setHardMode}
        setHighContrast={setHighContrast}
      />
    </div>
  )
}


export default App