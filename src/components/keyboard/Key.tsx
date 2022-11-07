type Props = {
  value: string
}

const Key = ({
  value
}: Props) => {
  return (
    <button className="w-20 h-12 font-mono text-3xl bg-slate-200 hover:bg-slate-300 mr-1.5 rounded-lg">
      {value}
    </button>
  )
}

export default Key;