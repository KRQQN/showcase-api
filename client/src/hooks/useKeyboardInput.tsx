import { useEffect, useCallback, useState } from "react";

interface KeyAction {
  key: string;
  action?: (input: string) => Promise<void>;
}

export const useKeyboardInput = (
  wordLength: number,
  mapKeyAction?: KeyAction,
) => {
  const [currentInput, setCurrentInput] = useState("");
  const handleKeyPress = useCallback(
    async (key: string) => {
      if (key === "Enter" && currentInput.length === wordLength) {
        // TODO: Refactor this
        if (mapKeyAction?.action && mapKeyAction?.key === "Enter") {
          await mapKeyAction.action(currentInput);
          setCurrentInput("");
        }
        return;
      }

      if (key === "Backspace") {
        setCurrentInput(currentInput.slice(0, -1));
        return;
      }

      if (currentInput.length >= wordLength) return;

      const upperKey = key.toUpperCase();
      if (upperKey.length === 1 && /^[A-Z]$/.test(upperKey)) {
        setCurrentInput(currentInput + upperKey);
      }
    },
    [currentInput, wordLength, setCurrentInput, mapKeyAction],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress, currentInput]);

  return { currentInput, handleKeyPress };
};
