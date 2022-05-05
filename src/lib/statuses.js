

export const getStatuses = (solution, guesses) => {
  const charObj = {}
  
  guesses.forEach( (word) => {
    word.forEach( (letter, i) => {
      if(!solution.includes(letter)) {
        return (charObj[letter] = "wrong")
      }

      if(letter === solution[i]) {
        return (charObj[letter] = "correct")
      }

      if(charObj[letter] !== "correct") {
        return (charObj[letter] = "missed")
      }
    })
  })
}

export const getGuessStatuses = (solution, guess) => {
  const solutionArray = Array.from(solution)
  const guessArray = Array.from(guess)
  const solutionCharsTaken = solutionArray.map((_) => false)
  const statuses = Array.from(Array(guess.length))

  guessArray.forEach( (letter, i) => {
    if(letter === solutionArray[i]) {
      statuses[i] = "correct"
      solutionCharsTaken[i] = true
    }
  })

  guessArray.forEach( (letter, i) => {
    if(statuses[i]) 
      return

    if(!solutionArray.includes(letter)) {
      statuses[i] = "wrong"
      return
    }

    const indexOfPresentChar = solutionArray.findIndex( (x, index) => x === letter && !solutionCharsTaken[index])

    if(indexOfPresentChar > -1) {
      statuses[i] = "missed"
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = "wrong"
      return
    }
  })

  return statuses
}