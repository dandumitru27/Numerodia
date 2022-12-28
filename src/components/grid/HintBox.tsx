import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronUpIcon, FaceFrownIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import Direction from '../../enums/Direction'
import Trophy from '../../enums/Trophy'
import Hint from '../../models/Hint'

type Props = {
  hint?: Hint
}

export default function HintBox({ hint }: Props) {
  const [flipInnerTransform, setFlipInnerTransform] = useState('');

  useEffect(() => {
    if (hint) {
      setFlipInnerTransform('rotateX(180deg)');
    }
  }, []);

  let icon = undefined;
  const iconSizeClasses = 'h-6 w-6';

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
    <div className='w-9 h-10 ml-3 mr-0.5 flip-main'>
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
