import "./VirtualKeyboard.scss";

const defaultLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", "backspace"],
];

interface KeyboardProps {
  onKeyPress?: (key: string) => void;
  layout?: string[][];
  className?: string;
  keyClassName?: string;
}

const VirtualKeyboard = ({
  onKeyPress = () => {},
  layout = defaultLayout,
  className = "",
  keyClassName = "",
}: KeyboardProps) => {
  const handleKeyClick = (key: string) => {
    let keyValue = key;
    if (key === "backspace") keyValue = "Backspace";
    onKeyPress(keyValue);
  };

  return (
    <div className={`keyboard ${className}`}>
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`key ${keyClassName} ${key === "backspace" ? "backspace" : ""}`}
              onClick={() => handleKeyClick(key)}
            >
              {key === "backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
