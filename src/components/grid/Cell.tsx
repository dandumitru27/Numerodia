type Props = {
  value?: string,
  isTrailingZero?: boolean,
  highlight?: boolean
}

export default function Cell({
  value,
  isTrailingZero,
  highlight
}: Props) {
  var classes = 'w-9 h-10 flex items-center justify-center border-2 text-2xl font-bold rounded mx-0.5';

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
