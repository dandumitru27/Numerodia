import EmptyRow from "./EmptyRow"

export default function Grid() {
  const emptyRows = Array.from(Array(5))

  return (
    <>
      {emptyRows.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  )
}
