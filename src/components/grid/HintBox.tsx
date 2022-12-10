import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import Direction from '../../enums/Direction'
import Hint from '../../models/Hint'

type Props = {
  hint?: Hint
}

export default function HintBox({ hint }: Props) {
  let icon = undefined;
  const iconSizeClasses = 'h-6 w-6';

  if (hint && !hint.isCorrect) {
    if (hint.arrowDirection === Direction.Up) {
      const textColorClass = 'text-green-700';
      const iconClasses = iconSizeClasses + ' ' + textColorClass;

      if (hint.arrowCount === 2) {
        icon = <ChevronDoubleUpIcon className={iconClasses} />;
      } else {
        icon = <ChevronUpIcon className={iconClasses} />;
      }
    } else {
      const textColorClass = 'text-red-700';
      const iconClasses = iconSizeClasses + ' ' + textColorClass;

      if (hint.arrowCount === 2) {
        icon = <ChevronDoubleDownIcon className={iconClasses} />;
      } else {
        icon = <ChevronDownIcon className={iconClasses} />;
      }
    }
  }

  return (
    <div className='w-9 h-10 flex items-center justify-center rounded ml-3 mr-0.5 bg-slate-200'>
      {icon}
    </div>
  )
}
