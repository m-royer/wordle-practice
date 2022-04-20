import { WORDS } from '../constants/wordlist';

export const isValidWord = (word) => {
  return WORDS.indexOf(word.toLowerCase()) > 0 ? true : false
}

export const newSolution = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
}

export const getMissedLetters = (guess, solution) => {
  const missedLetters = []
  Array.from(guess || []).forEach( (letter, i) => {
    if( (solution.includes(letter)) && (solution.indexOf(letter) !== i) ) {
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

export const calculateRevealedKeys = (guess, revealedKeys, solution) => {
  const missed = revealedKeys.missed
  const correct = revealedKeys.correct
  const wrong = revealedKeys.wrong

  // correct and wrong letters only gain in numbers, missed sometimes move into correct
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