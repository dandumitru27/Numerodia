type Props = {
  value?: string,
  isTrailingZero?: boolean,
  highlight?: boolean,
  useLargeCells: boolean,
  answer: number
}

export default function Cell({
  value,
  isTrailingZero,
  highlight,
  useLargeCells,
  answer
}: Props) {
  var widthClass = 'w-9';
  var heightClass = 'h-10';
  var textSizeClass = 'text-2xl';

  if (answer >= 1_000_000) {
    widthClass = 'w-7';
  }

  if (answer >= 100_000_000) {
    widthClass = 'w-6';
    textSizeClass = 'text-xl';
  }

  if (useLargeCells) {
    widthClass = 'w-12';
    heightClass = 'h-14';
    textSizeClass = 'text-3xl';
  }

  var classes = `${widthClass} ${heightClass} ${textSizeClass} flex items-center justify-center border-2 font-bold rounded mx-0.5`;

  let borderColor = 'border-slate-300';
  if (highlight) {
    borderColor = 'border-green-400';
  }
  classes += ' ' + borderColor;

  let textColor = 'text-slate-600';
  if (value === '?')
    textColor = 'text-slate-200';
  else if (isTrailingZero)
    textColor = 'text-slate-400';

  classes += ' ' + textColor;

  return (
    <div className={classes}>
      {value}
    </div>
  )
}
