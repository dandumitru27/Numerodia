type Props = {
  value: string,
  onClick: (value: string) => void
}

export default function Key({
  value,
  onClick
}: Props) {
  return (
    <button
      className="w-20 h-12 font-mono text-3xl bg-slate-200 hover:bg-slate-300 mr-1.5 rounded-lg"
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  )
}
