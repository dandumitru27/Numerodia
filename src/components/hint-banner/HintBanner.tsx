type Props = {
  text: string
}

export default function HintBanner({
  text
}: Props) {

  return (
    <div className="max-h-7 flex grow flex-col items-center justify-center rounded-full bg-slate-100 text-sm text-slate-500 border-[1px] border-slate-300 mt-2 mx-8">
      {text}
    </div>
  )
}
