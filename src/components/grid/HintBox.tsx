import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronUpIcon, TrophyIcon } from '@heroicons/react/24/outline'
import Direction from '../../enums/Direction'
import Trophy from '../../enums/Trophy'
import Hint from '../../models/Hint'

type Props = {
  hint?: Hint
}

export default function HintBox({ hint }: Props) {
  let icon = undefined;
  const iconSizeClasses = 'h-6 w-6';

  if (hint && !hint.isCorrect) {
    if (hint.arrowDirection === Direction.Up) {
      const chevronIconClasses = iconSizeClasses + ' text-green-700';

      if (hint.arrowCount === 2) {
        icon = <ChevronDoubleUpIcon className={chevronIconClasses} />;
      } else {
        icon = <ChevronUpIcon className={chevronIconClasses} />;
      }
    } else {
      const chevronIconClasses = iconSizeClasses + ' text-red-700'

      if (hint.arrowCount === 2) {
        icon = <ChevronDoubleDownIcon className={chevronIconClasses} />;
      } else {
        icon = <ChevronDownIcon className={chevronIconClasses} />;
      }
    }
  }

  if (hint && hint.isCorrect) {
    let trophyColor: string;

    switch (hint.trophy) {
      case Trophy.Gold:
        trophyColor = '#F8D000';
        break;
      case Trophy.Silver:
        trophyColor = '#C0C0C0';
        break;
      case Trophy.Bronze:
      default:
        trophyColor = '#CD7F32';
        break;
    }

    const trophyIconClasses = iconSizeClasses + ` text-[${trophyColor}]`;

    icon = <TrophyIcon className={trophyIconClasses} />;
  }

  return (
    <div className='w-9 h-10 flex items-center justify-center rounded ml-3 mr-0.5 bg-slate-100'>
      {icon}
    </div>
  )
}
