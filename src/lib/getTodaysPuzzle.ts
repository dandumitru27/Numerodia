import { differenceInDays, startOfToday } from 'date-fns'
import { puzzles } from "../constants/puzzles";

const firstGameDate = new Date(2022, 10, 11);

export default function getTodaysPuzzle() {
  var difference = differenceInDays(startOfToday(), firstGameDate);

  return puzzles[difference % puzzles.length];
}
