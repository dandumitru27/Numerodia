import { MAX_CHALLENGES } from "../../constants/settings"
import Hint from "../../models/Hint"
import Row from "./Row"

type Props = {
  answer: number
  guesses: string[]
  currentGuess: string,
  hints: Hint[],
  isGameWon: boolean
}

export default function Grid({
  answer,
  guesses,
  currentGuess,
  hints,
  isGameWon
}: Props) {
  const emptyRows =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <>
      {guesses.map((guess, i) => (
        <Row key={i} guess={guess} answer={answer} hint={hints[i]} />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <Row key={guesses.length} guess={currentGuess} answer={answer} isCurrentRow={!isGameWon} />
      )}
      {emptyRows.map((_, i) => (
        <Row key={guesses.length + i + 1} guess={''} answer={answer} />
      ))}
    </>
  )
}
