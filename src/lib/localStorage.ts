import GameStats from "../models/GameStats"

const gameStatsKey = 'gameStats'

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatsKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatsKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}