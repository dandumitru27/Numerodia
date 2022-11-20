import { DIGITS_TO_GUESS_COUNT } from "../../constants/settings";
import Cell from "./Cell"

type Props = {
  answer: number
}

export default function EmptyRow({ answer }: Props) {
  const answerLength = answer.toString().length;

  const questionCells = Array.from(Array(DIGITS_TO_GUESS_COUNT));

  const zeroCells = Array.from(Array(answerLength - DIGITS_TO_GUESS_COUNT));

  return (
    <div className="flex justify-center mb-1">
      {questionCells.map((_, i) => (
        <Cell key={i} value="?" />
      ))}
      {zeroCells.map((_, i) => (
        <Cell key={i} value="0" isTrailingZero={true} />
      ))}
    </div>
  )
}
