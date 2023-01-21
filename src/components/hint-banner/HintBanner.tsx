import { useEffect, useState } from "react";

type Props = {
  text: string,
  isBanner2?: boolean
}

export default function HintBanner({
  text,
  isBanner2: isBanner2 = false
}: Props) {
  const [flipInnerTransform, setFlipInnerTransform] = useState('');
  const [flipFrontClasses, setFlipFrontClasses] = useState('');
  const [flipBackClasses, setFlipBackClasses] = useState('');

  const [textFront, setTextFront] = useState('');
  const [textBack, setTextBack] = useState('');

  const [isBackShown, setIsBackShown] = useState(false);

  useEffect(() => {
    if (text) {
      // don't flip the Sum Banner on the last attempt
      if (isBanner2 && text === ' ') {
        setTextBack(text);
        return;
      }

      if (!isBackShown) {
        setTextFront('');
        setFlipFrontClasses('');

        setTextBack(text);
        setFlipBackClasses(' h-full');

        setFlipInnerTransform('rotateX(180deg)');
        setIsBackShown(true);
      } else {
        setTextBack('');
        setFlipBackClasses('');

        setTextFront(text);
        setFlipFrontClasses(' h-full');

        setFlipInnerTransform('rotateX(360deg)');
        setIsBackShown(false);
      }
    }
    // eslint-disable for a warning pointing to put isBackShown in the effect dependencies, which would complicate things
    // eslint-disable-next-line
  }, [text]);

  const flipInnerTransition = !isBanner2
    ? 'transform 1s ease 0.5s'
    : 'transform 1s ease 1.5s';

  return (
    <div className="h-7 mt-2 mx-8" style={{ perspective: '200px' }}>
      <div className="h-full rounded-lg bg-slate-50 text-sm text-slate-500 border-[1px] border-slate-300 flip-inner"
        style={{ transition: flipInnerTransition, transform: flipInnerTransform }}>
        <div className={'flex items-center justify-center flip-front' + flipFrontClasses}>
          {textFront}
        </div>
        <div className={'flex items-center justify-center flip-back' + flipBackClasses}>
          {textBack}
        </div>
      </div>
    </div>
  )
}
