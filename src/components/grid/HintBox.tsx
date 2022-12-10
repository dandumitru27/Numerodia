import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid'

type Props = {
}

export default function HintBox({ }: Props) {
  return (
    <div className='w-9 h-10 flex items-center justify-center rounded ml-3 mr-0.5 bg-slate-200'>
      <ChevronDoubleUpIcon className='h-6 w-6 text-green-700' />
    </div>
  )
}
