import { WORDS } from '../constants/wordlist';
import { getGuessStatuses } from './statuses';

export const isValidWord = (word) => {
  return WORDS.indexOf(word.toLowerCase()) > 0 ? true : false
}

export const newSolution = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
}

export const getMissedLetters = (guess, solution) => {
  const missedLetters = []
  Array.from(guess || []).forEach( (letter, i) => {
    if( solution.includes(letter) && (guess.indexOf(letter) !== solution.indexOf(letter)) && (solution.indexOf(letter) !== i) ) {
      missedLetters.push(letter)
    }
  })

  return missedLetters;
}

export const getCorrectLetters = (guess, solution) => {
  const correctLetters = []
  Array.from(guess || []).forEach( (letter, i) => {
    if(solution[i] === letter) {
      correctLetters.push(letter)
    }
  })

  return correctLetters;
}

export const getWrongLetters = (guess, solution) => {
  const wrongLetters = []
  Array.from(guess || []).forEach( (letter, i) => {
    if(!solution.includes(letter)) {
      wrongLetters.push(letter)
    }
  })

  return wrongLetters;
}

// return revealedKeys object
export const calculateRevealedKeys = (guess, revealedKeys, solution) => {
  const missed = revealedKeys.missed
  const correct = revealedKeys.correct
  const wrong = revealedKeys.wrong

  // correct and wrong only gain letters, missed sometimes move into correct
  const newMissed = [...new Set([...missed,...getMissedLetters(guess, solution)])]
  const newCorrect = [...new Set([...correct,...getCorrectLetters(guess, solution)])]
  const newWrong = [...new Set([...wrong,...getWrongLetters(guess, solution)])]

  newMissed.filter(function(letter) {
    return newCorrect.includes(letter)
  })

  return {
    missed: newMissed,
    correct: newCorrect,
    wrong: newWrong
  }
}

// return void
export const calculateAllRevealedKeys = (guesses, solution) => {
  let revealedKeys = {
    missed: "",
    correct: "",
    wrong: ""
  }

  guesses.forEach(function(guess) {
    revealedKeys = calculateRevealedKeys(guess,revealedKeys,solution)
  })

  return revealedKeys
}

export const findUnused = (currentGuess, guesses, solution) => {
  if(guesses.length === 0){
    return false
  }

  const lettersLeft = []
  const lastGuess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(solution, lastGuess)

  for(let i=0; i < lastGuess.length; i++) {
    if(statuses[i] === "correct" || statuses[i] === "missed" ) {
      lettersLeft.push(lastGuess[i])
    }
    if(statuses[i] === "correct" && currentGuess[i] !== lastGuess[i]) {
      return "Must use " + lastGuess[i] + " in position " + (i+1)
    }
  }

  // go through the rest of the guess and return the first unused letter
  let letterPosition
  for (let letter of currentGuess) {
    letterPosition = lettersLeft.indexOf(letter)
    if(letterPosition !== -1) {
      lettersLeft.splice(letterPosition,1)
    }
  }

  if(lettersLeft.length > 0) {
    return "Guess must contain " + lettersLeft[0]
  }
  
  return false
}