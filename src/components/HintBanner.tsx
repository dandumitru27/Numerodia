type Props = {
  text: string
}

export default function HintBanner({
  text
}: Props) {

  return (
    <div className="max-h-8 flex grow flex-col items-center justify-center rounded bg-slate-100 text-slate-500 mt-2">
      {text}
    </div>
  )
}
