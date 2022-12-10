type Props = {
  value?: string,
  isTrailingZero?: boolean
}

export default function Cell({
  value,
  isTrailingZero
}: Props) {
  var classes = 'w-9 h-10 flex items-center justify-center border-2 border-slate-300 text-2xl font-bold rounded mx-0.5';

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
