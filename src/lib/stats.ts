import Trophy from "../enums/Trophy";
import GameStats from "../models/GameStats"
import Hint from "../models/Hint"
import { loadStatsFromLocalStorage, saveStatsToLocalStorage } from "./localStorage"

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  hint: Hint
) => {
  const stats = { ...gameStats };

  if (hint.isCorrect) {
    stats.currentStreak += 1;

    switch (hint.trophy) {
      case Trophy.Gold:
        stats.goldTrophies += 1;
        break;
      case Trophy.Silver:
        stats.silverTrophies += 1;
        break;
      case Trophy.Bronze:
        stats.bronzeTrophies += 1;
        break;
    }
  } else if (hint.isGameLost) {
    stats.currentStreak = 0;
  }

  saveStatsToLocalStorage(stats);

  return stats;
}

const defaultStats: GameStats = {
  goldTrophies: 0,
  silverTrophies: 0,
  bronzeTrophies: 0,
  currentStreak: 0
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}