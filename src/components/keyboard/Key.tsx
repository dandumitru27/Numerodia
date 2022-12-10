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
    icon = <CheckCircleIcon className='h-6 w-6' />;
  }

  return (
    <button
      className="w-20 h-12 flex items-center justify-center font-mono text-2xl bg-slate-200 hover:bg-slate-300 mr-1.5 rounded-lg"
      onClick={() => onClick(value)}
    >
      {icon ?? value}
    </button>
  )
}
