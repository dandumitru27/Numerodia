import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronUpIcon, FaceFrownIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import Direction from '../../enums/Direction'
import getTrophyColor from '../../lib/trophies'
import Hint from '../../models/Hint'

type Props = {
  hint?: Hint,
  useLargeCells: boolean
}

export default function HintBox({ hint, useLargeCells }: Props) {
  const [flipInnerTransform, setFlipInnerTransform] = useState('');

  useEffect(() => {
    if (hint) {
      setFlipInnerTransform('rotateX(180deg)');
    }
  }, [hint]);

  let boxSizeClasses = 'w-9 h-10';
  let iconSizeClasses = 'h-6 w-6';

  if (useLargeCells) {
    boxSizeClasses = 'w-12 h-14';
    iconSizeClasses = 'h-8 w-8';
  }

  let icon = undefined;

  if (hint && hint.isGameLost) {
    icon = <FaceFrownIcon className={iconSizeClasses} />
  }

  if (hint && !hint.isCorrect && !icon) {
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
    let trophyColor = getTrophyColor(hint.trophy);

    const trophyIconClasses = iconSizeClasses + ` text-[${trophyColor}]`;

    icon = <TrophyIcon className={trophyIconClasses} />;
  }

  var boxClasses = boxSizeClasses + ' ml-3 mr-0.5';

  return (
    <div className={boxClasses} style={{ perspective: '100px' }}>
      {/* The div below is hidden, it's just to overcome a bug where these custom trophy colors are not displayed properly */}
      <div className='text-[#F8D000] text-[#C0C0C0] text-[#CD7F32]'></div>

      <div className='w-full h-full rounded bg-slate-50 border-2 flip-inner' style={{ transform: flipInnerTransform }}>
        <div className='flip-front'>
        </div>
        <div className='w-full h-full flex items-center justify-center flip-back'>
          {icon}
        </div>
      </div>
    </div>
  )
}
