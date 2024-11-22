import React, { useRef, useState } from "react";

interface GuessInputProps {
  length: number;
  onComplete: (guess: string) => void;
}

export function GuessInput({ length, onComplete }: GuessInputProps) {
  const [guess, setGuess] = useState(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newGuess = [...guess];
      newGuess[index] = value.toUpperCase();
      setGuess(newGuess);

      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newGuess.every((char) => char !== "")) {
        onComplete(newGuess.join(""));
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !guess[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
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
          className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          maxLength={1}
        />
      ))}
    </div>
  );
}
