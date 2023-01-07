import { BackspaceIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

type Props = {
  value: string,
  onClick: (value: string) => void
}

export default function Key({
  value,
  onClick
}: Props) {
  let icon = undefined;

  if (value === 'DELETE') {
    icon = <BackspaceIcon className='h-6 w-6' />;
  } else if (value === "ENTER") {
    icon = <CheckCircleIcon className='h-7 w-7 text-green-700' />;
  }

  return (
    <button
      className="h-10 flex grow flex-row basis-0 items-center justify-center font-mono text-xl bg-slate-200 hover:bg-slate-300 rounded-lg"
      onClick={() => onClick(value)}
    >
      {icon ?? value}
    </button>
  )
}
