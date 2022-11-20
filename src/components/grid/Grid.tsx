import { MAX_CHALLENGES } from "../../constants/settings"
import CurrentRow from "./CurrentRow"
import EmptyRow from "./EmptyRow"

type Props = {
  answer: number
  currentGuess: string
}

export default function Grid({
  answer,
  currentGuess,
}: Props) {
  const emptyRows = Array.from(Array(MAX_CHALLENGES - 1))

  return (
    <>
      <CurrentRow guess={currentGuess} answer={answer} />
      {emptyRows.map((_, i) => (
        <EmptyRow key={i} answer={answer} />
      ))}
    </>
  )
}
