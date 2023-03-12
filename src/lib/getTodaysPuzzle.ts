import { differenceInDays, startOfToday } from 'date-fns'
import { puzzlesRO } from '../constants/puzzlesRO';
import { puzzlesEN } from "../constants/puzzlesEN";
import i18next from 'i18next';

const firstGameDateRO = new Date(2023, 2, 11); // 2 is March
const firstGameDateEN = new Date(2023, 2, 11);

export default function getTodaysPuzzle() {
  switch (i18next.language) {
    case 'ro':
      const differenceRO = differenceInDays(startOfToday(), firstGameDateRO);
      console.log(differenceRO);

      return puzzlesRO[differenceRO % puzzlesRO.length];
    case 'en':
    default:
      const differenceEN = differenceInDays(startOfToday(), firstGameDateEN);

      return puzzlesEN[differenceEN % puzzlesEN.length];
  }
}
