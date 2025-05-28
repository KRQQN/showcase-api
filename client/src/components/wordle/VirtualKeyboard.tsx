import "./VirtualKeyboard.scss";

const defaultLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

interface KeyboardProps {
  //onKeyPress?: (key: string) => void;
  layout?: string[][];
  className?: string;
  keyClassName?: string;
}

const VirtualKeyboard = ({
  layout = defaultLayout,
  className = "",
  keyClassName = "",
}: KeyboardProps) => {
  const handleKeyClick = (key: string) => {
    let keyCode = key.charCodeAt(0);

    const event = new KeyboardEvent("keydown", {
      key: key,
      code: `Key${key.toUpperCase()}`,
      keyCode: keyCode,
      which: keyCode,
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <div className={`keyboard ${className}`}>
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`key ${keyClassName}}`}
              onClick={() => handleKeyClick(key)}
            >
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
