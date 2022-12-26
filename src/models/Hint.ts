import Direction from "../enums/Direction";
import Trophy from "../enums/Trophy";

export default interface Hint {
  text?: string,
  isCorrect?: boolean;
  isGameLost?: boolean;
  arrowDirection?: Direction,
  arrowCount?: number,
  trophy?: Trophy
}