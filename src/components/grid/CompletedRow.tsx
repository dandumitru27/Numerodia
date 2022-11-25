import { DIGITS_TO_GUESS_COUNT } from "../../constants/settings";
import Cell from "./Cell"

type Props = {
  guess: string
  answer: number
}

export default function CompletedRow({ guess, answer }: Props) {
  var guessDigits = Array.from(String(guess));

  const answerLength = answer.toString().length;
  const zeroCells = Array.from(Array(answerLength - DIGITS_TO_GUESS_COUNT));

  return (
    <div className="flex justify-center mb-1">
      {guessDigits.map((digit, i) => (
        <Cell key={i} value={digit} />
      ))}
      {zeroCells.map((_, i) => (
        <Cell key={i} value="0" isTrailingZero={true} />
      ))}
    </div>
  )
}
