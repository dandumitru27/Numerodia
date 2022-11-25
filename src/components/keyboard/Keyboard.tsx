import Key from "./Key";

type Props = {
  onChar: (value: string) => void,
  onDelete: () => void,
  onEnter: () => void
}

export default function Keyboard({
  onChar,
  onDelete,
  onEnter
}: Props) {
  return (
    <div>
      <div className="mb-1.5">
        {['1', '2', '3'].map((key) => (
          <Key
            key={key}
            value={key}
            onClick={onChar}
          />
        ))}
      </div>
      <div className="mb-1.5">
        {['4', '5', '6'].map((key) => (
          <Key
            key={key}
            value={key}
            onClick={onChar}
          />
        ))}
      </div>
      <div className="mb-1.5">
        {['7', '8', '9'].map((key) => (
          <Key
            key={key}
            value={key}
            onClick={onChar}
          />
        ))}
      </div>
      <div className="mb-1.5">
        <Key
          key='DELETE'
          value='⌫'
          onClick={onDelete}
        />
        <Key
          key='0'
          value='0'
          onClick={onChar}
        />
        <Key
          key='ENTER'
          value='✔️'
          onClick={onEnter}
        />
      </div>
    </div>
  )
}
