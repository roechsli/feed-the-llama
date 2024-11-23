import React, { useRef, useState, useEffect } from "react";

interface GuessInputProps {
  length: number;
  onComplete: (guess: string) => void;
  hints: string; // A string with fixed letters and spaces for hints
}

export function GuessInput({ length, onComplete, hints }: GuessInputProps) {
  const [guess, setGuess] = useState(() =>
    hints.split("").map((char) => (char.trim() ? char.toUpperCase() : ""))
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setGuess(
      hints.split("").map((char) => (char.trim() ? char.toUpperCase() : ""))
    );
  }, [hints]);

  const handleChange = (index: number, value: string) => {
    if (hints[index] !== " " || value.length > 1) return; // Prevent changing hint values

    const newGuess = [...guess];
    newGuess[index] = value.toUpperCase();
    setGuess(newGuess);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newGuess.every((char) => char !== "")) {
      onComplete(newGuess.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (hints[index] === " ") {
      if (e.key === "Backspace" && !guess[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {guess.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          value={char}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={`w-12 h-12 text-center text-2xl border-2 rounded-md focus:outline-none ${
            hints[index] !== " "
              ? "bg-green-200 border-green-500 text-green-800"
              : "border-gray-300 focus:border-blue-500"
          }`}
          maxLength={1}
          disabled={hints[index] !== " "} // Disable input if it's part of the hints
        />
      ))}
    </div>
  );
}
