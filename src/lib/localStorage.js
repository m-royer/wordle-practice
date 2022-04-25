import { GAME_STATE_KEY } from './../constants/settings'


export const loadGameState = () => {
  const gameState = localStorage.getItem(GAME_STATE_KEY)
  return gameState ? JSON.parse(gameState) : null
}

export const saveGameState = (guesses, solution) => {
  console.log(guesses,solution)
  localStorage.setItem(GAME_STATE_KEY,JSON.stringify({"guesses": guesses,"solution":solution}))
}