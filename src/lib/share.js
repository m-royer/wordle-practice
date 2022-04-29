import {
  getMissedLetters,
  getWrongLetters
} from './words'

export const emojiBoxes = (highContrast) => {
  return highContrast ? ["🟧","🟦","◼️"] : ["🟩","🟨","◼️"]
}

export const getShareText = (guesses, solution, highContrast) => {
  let shareText = "Wordle Practice: " + solution;
  let emojis = emojiBoxes(highContrast)
  guesses.forEach( (word) => {
    let guessLine = ""
    const missedLetters = getMissedLetters(word,solution)
    const letters = Array.from(word)
    letters.forEach((letter,i) => {
      if(solution[i] === letter) {
        guessLine += emojis[0]
      } else if(missedLetters.indexOf(letter) > -1) {
        guessLine += emojis[1]
      } else {
        guessLine += emojis[2]
      }
    })
    shareText += "\n" + guessLine
  })
  return shareText
}

export const share = (copyText) => {
  navigator.clipboard.writeText(copyText);
}