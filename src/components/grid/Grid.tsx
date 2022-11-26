import { MAX_CHALLENGES } from "../../constants/settings"
import CompletedRow from "./CompletedRow"
import CurrentRow from "./CurrentRow"
import EmptyRow from "./EmptyRow"

type Props = {
  answer: number
  guesses: string[]
  currentGuess: string
}

export default function Grid({
  answer,
  guesses,
  currentGuess,
}: Props) {
  const emptyRows =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} answer={answer} />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow guess={currentGuess} answer={answer} />
      )}
      {emptyRows.map((_, i) => (
        <EmptyRow key={i} answer={answer} />
      ))}
    </>
  )
}
