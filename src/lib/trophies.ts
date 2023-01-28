import Trophy from "../enums/Trophy";
import GameStats from "../models/GameStats";

export default function getTrophyColor(trophy?: Trophy) {
  switch (trophy) {
    case Trophy.Gold:
      return '#F8D000';
    case Trophy.Silver:
      return '#C0C0C0';
    case Trophy.Bronze:
      return '#CD7F32';
  }
}

export function getTrophyCountFromStats(trophy: Trophy, gameStats: GameStats) {
  switch (trophy) {
    case Trophy.Gold:
      return gameStats.goldTrophies;
    case Trophy.Silver:
      return gameStats.silverTrophies;
    case Trophy.Bronze:
      return gameStats.bronzeTrophies;
  }
}