import { 
  GAME_STATE_KEY,
  GAME_STATS_KEY,
  GAME_SETTINGS_KEY,
  MAX_TRIES
} from './../constants/settings'


export const loadGameState = () => {
  const gameState = localStorage.getItem(GAME_STATE_KEY)
  return gameState ? JSON.parse(gameState) : null
}

export const saveGameState = (guesses, solution) => {
  localStorage.setItem(GAME_STATE_KEY,JSON.stringify({"guesses": guesses,"solution":solution}))
}

export const checkGameStats = () => {
  const gameStats = localStorage.getItem(GAME_STATS_KEY)
  if(!gameStats || !gameStats.practiced)
    return false
  
  return (JSON.parse(gameStats.practiced) > 0 ? true : false) ?? false
}

export const loadGameStats = () => {
  const gameStats = localStorage.getItem(GAME_STATS_KEY)
  return gameStats ? JSON.parse(gameStats) : {
    practiced: 0,
    totalWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: Array.from(new Array(MAX_TRIES), () => 0)
  }
}

export const saveGameStats = (gameStats) => {
  localStorage.setItem(GAME_STATS_KEY,JSON.stringify(gameStats))
}

export const updateStats = (stats,guessCount) => {
  const newStats = {... stats}
  newStats.practiced += 1
  
  if(guessCount >= MAX_TRIES) {
    newStats.currentStreak = 0
  } else {
    newStats.totalWon += 1
    newStats.currentStreak += 1
    newStats.distribution[guessCount] += 1
    if(newStats.maxStreak < newStats.currentStreak) {
      newStats.maxStreak = newStats.currentStreak
    }
  }

  saveGameStats(newStats)
  return newStats
}