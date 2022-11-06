type Props = {
  value: string
}

const Key = ({
  value
}: Props) => {
  return (
    <button className="w-16 h-12 font-mono text-3xl bg-slate-200 hover:bg-slate-300 mx-0.5 rounded">
      {value}
    </button>
  )
}

export default Key;