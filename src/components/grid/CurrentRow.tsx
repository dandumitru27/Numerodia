import { DIGITS_TO_GUESS_COUNT } from "../../constants/settings";
import Cell from "./Cell"

type Props = {
  guess: string
  answer: number
}

export default function CurrentRow({ guess, answer }: Props) {
  var guessDigits = Array.from(String(guess));

  const questionCells = Array.from(Array(DIGITS_TO_GUESS_COUNT - guessDigits.length));

  const answerLength = answer.toString().length;
  const zeroCells = Array.from(Array(answerLength - DIGITS_TO_GUESS_COUNT));

  return (
    <div className="flex justify-center mb-1">
      {guessDigits.map((digit, i) => (
        <Cell key={i} value={digit} />
      ))}
      {questionCells.map((_, i) => (
        <Cell key={i} value="?" />
      ))}
      {zeroCells.map((_, i) => (
        <Cell key={i} value="0" isTrailingZero={true} />
      ))}
    </div>
  )
}
