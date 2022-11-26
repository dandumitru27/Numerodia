import { DIGITS_TO_GUESS_COUNT } from "../../constants/settings";
import Cell from "./Cell"
import Separator from "./Separator";

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
        <div key={i} className='flex'>
          <Cell key={i} value={digit} />
          {((answerLength - i - 1) % 3 === 0) && <Separator key={answerLength - i - 1} />}
        </div>
      ))}
      {zeroCells.map((_, i) => (
        <div key={i} className='flex'>
          <Cell key={i} value="0" isTrailingZero={true} />
          {((zeroCells.length - i - 1) % 3 === 0 && i !== zeroCells.length - 1) && <Separator key={zeroCells.length - i - 1} />}
        </div>
      ))}
    </div>
  )
}
