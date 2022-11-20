type Props = {
  value?: string,
  isTrailingZero?: boolean
}

export default function Cell({
  value,
  isTrailingZero
}: Props) {
  var classes = 'w-11 h-11 flex items-center justify-center border-2 border-slate-300 text-3xl font-bold rounded mx-0.5';

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
