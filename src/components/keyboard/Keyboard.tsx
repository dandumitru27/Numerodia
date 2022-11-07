import Key from "./Key";

const Keyboard = () => {
  return (
    <div>
      <div className="mb-1.5">
        {['1', '2', '3'].map((key) => (
          <Key
            key={key}
            value={key}
          />
        ))}
      </div>
      <div className="mb-1.5">
        {['4', '5', '6'].map((key) => (
          <Key
            key={key}
            value={key}
          />
        ))}
      </div>
      <div className="mb-1.5">
        {['7', '8', '9'].map((key) => (
          <Key
            key={key}
            value={key}
          />
        ))}
      </div>
      <div className="mb-1.5">
        {['⌫', '0', '✔️'].map((key) => (
          <Key
            key={key}
            value={key}
          />
        ))}
      </div>
    </div>
  )
}

export default Keyboard;