import {
  getMissedLetters,
  getWrongLetters
} from './words'

export const getShareText = (guesses, solution) => {
  let shareText = "Wordle Practice: " + solution;
  guesses.forEach( (word) => {
    let guessLine = ""
    const missedLetters = getMissedLetters(word,solution)
    const wrongLetters = getWrongLetters(word,solution)
    const letters = Array.from(word)
    letters.forEach((letter,i) => {
      if(solution[i] === letter) {
        guessLine += "🟩"
      } else if(missedLetters.indexOf(letter) > -1) {
        guessLine += "🟨"
      } else {
        guessLine += "◼️"
      }
    })
    shareText += "\n" + guessLine
  })
  return shareText
}

export const share = (copyText) => {
  navigator.clipboard.writeText(copyText);
}