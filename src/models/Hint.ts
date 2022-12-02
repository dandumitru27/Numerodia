import Direction from "../enums/Direction";
import Medal from "../enums/Medal";

export default interface Hint {
  text?: string,
  isCorrect?: boolean;
  arrowDirection?: Direction,
  arrowCount?: number,
  medal?: Medal
}