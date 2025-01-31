import Trophy from "../enums/Trophy";
import GameStats from "../models/GameStats";
import { t } from 'i18next';

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

export function getTrophyExclamation(trophy?: Trophy): string {
  let exclamation = '';

  switch (trophy) {
    case Trophy.Gold:
      exclamation = 'Impressive';
      break;
    case Trophy.Silver:
      exclamation = 'Awesome';
      break;
    case Trophy.Bronze:
      exclamation = 'Well done';
      break;
  }

  return t(exclamation) + '!';
}
