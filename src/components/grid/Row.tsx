import { DIGITS_TO_GUESS_COUNT } from "../../constants/settings";
import Hint from "../../models/Hint";
import Cell from "./Cell"
import HintBox from "./HintBox";
import Separator from "./Separator";

type Props = {
  guess: string
  answer: number,
  hint?: Hint,
  isCurrentRow?: boolean
}

export default function Row({ guess, answer, hint, isCurrentRow }: Props) {
  const answerLength = answer.toString().length;

  const cells = Array.from(guess);

  let cellToHighlightIndex = -1;
  if (isCurrentRow && cells.length < 3) {
    cellToHighlightIndex = cells.length;
  }

  for (let index = 0; index < DIGITS_TO_GUESS_COUNT - guess.length; index++) {
    cells.push('?');
  }

  for (let index = 0; index < answerLength - DIGITS_TO_GUESS_COUNT; index++) {
    cells.push('0');
  }

  return (
    <div className="flex justify-center mb-1">
      {cells.map((cellValue, i) => (
        <div key={i} className='flex'>
          <Cell key={i} value={cellValue} isTrailingZero={i >= DIGITS_TO_GUESS_COUNT} highlight={i === cellToHighlightIndex} />
          {((cells.length - i - 1) % 3 === 0 && i !== cells.length - 1) && <Separator key={answerLength + i} />}
        </div>
      ))}
      <HintBox hint={hint} />
    </div>
  )
}
