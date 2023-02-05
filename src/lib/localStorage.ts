import GameStats from "../models/GameStats"
import Hint from "../models/Hint"

const currentGameStateKey = 'currentGameState'
const statsKey = 'stats'

export type CurrentGameState = {
  guesses: string[]
  hints: Hint[]
  question: string
}

export const saveCurrentGameStateToLocalStorage = (currentGameState: CurrentGameState) => {
  localStorage.setItem(currentGameStateKey, JSON.stringify(currentGameState));
}

export const loadCurrentGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(currentGameStateKey);
  return state ? (JSON.parse(state) as CurrentGameState) : null;
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(statsKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(statsKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}