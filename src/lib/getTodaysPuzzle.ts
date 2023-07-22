import { differenceInDays, startOfToday } from 'date-fns'
import { puzzlesRO } from '../constants/puzzlesRO';
import { puzzlesEN } from "../constants/puzzlesEN";
import i18next from 'i18next';

const firstGameDateRO = new Date(2023, 3, 19); // 3 is April
const firstGameDateEN = new Date(2023, 6, 22); // 6 is July

export default function getTodaysPuzzle() {
  let puzzles = puzzlesEN;
  let firstGameDate = firstGameDateEN;

  if (i18next.language === 'ro') {
    puzzles = puzzlesRO;
    firstGameDate = firstGameDateRO;
  }

  const difference = Math.abs(differenceInDays(startOfToday(), firstGameDate));

  return puzzles[difference % puzzles.length];
}
