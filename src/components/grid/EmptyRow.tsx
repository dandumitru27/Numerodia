import Cell from "./Cell"

const EmptyRow = () => {
  const emptyCells = Array.from(Array(7))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}

export default EmptyRow;