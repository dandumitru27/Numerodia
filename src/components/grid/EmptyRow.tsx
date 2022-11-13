import Cell from "./Cell"

export default function EmptyRow() {
  const solutionLength = 7;

  const questionCells = Array.from(Array(3));

  const zeroCells = Array.from(Array(solutionLength - 3));

  return (
    <div className="flex justify-center mb-1">
      {questionCells.map((_, i) => (
        <Cell key={i} value="?" />
      ))}
      {zeroCells.map((_, i) => (
        <Cell key={i} value="0" />
      ))}
    </div>
  )
}
