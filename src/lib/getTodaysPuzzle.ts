import { differenceInDays, startOfToday } from 'date-fns'
import { puzzlesRO } from '../constants/puzzlesRO';
import { puzzlesEN } from "../constants/puzzlesEN";
import i18next from 'i18next';

const firstGameDateRO = new Date(2023, 2, 11); // 2 is March
const firstGameDateEN = new Date(2023, 2, 11);

export default function getTodaysPuzzle() {
  let puzzles = puzzlesEN;
  let firstGameDate = firstGameDateEN;

  if (i18next.language === 'ro') {
    puzzles = puzzlesRO;
    firstGameDate = firstGameDateRO;
  }

  const difference = differenceInDays(startOfToday(), firstGameDate);

  return puzzles[difference % puzzles.length];
}
