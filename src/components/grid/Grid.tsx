import EmptyRow from "./EmptyRow"

const Grid = () => {
  const emptyRows = Array.from(Array(5))

  return (
    <>
      {emptyRows.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  )
}

export default Grid;