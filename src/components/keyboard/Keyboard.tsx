import Key from "./Key";

type Props = {
  onChar: (value: string) => void
}

export default function Keyboard({
  onChar,
}: Props) {
  const onClick = (value: string) => {
    // if (value === 'ENTER') {
    //   onEnter()
    // } else if (value === 'DELETE') {
    //   onDelete()
    // } else {
    //   onChar(value)
    // }

    onChar(value);
  }

  return (
    <div>
      <div className="mb-1.5">
        {['1', '2', '3'].map((key) => (
          <Key
            key={key}
            value={key}
            onClick={onClick}
          />
        ))}
      </div>
      <div className="mb-1.5">
        {['4', '5', '6'].map((key) => (
          <Key
            key={key}
            value={key}
            onClick={onClick}
          />
        ))}
      </div>
      <div className="mb-1.5">
        {['7', '8', '9'].map((key) => (
          <Key
            key={key}
            value={key}
            onClick={onClick}
          />
        ))}
      </div>
      <div className="mb-1.5">
        {['⌫', '0', '✔️'].map((key) => (
          <Key
            key={key}
            value={key}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  )
}
