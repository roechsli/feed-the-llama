"use client";
import React, { useRef, useState, useEffect } from "react";

interface GuessInputProps {
  length: number;
  solution: string;
  onComplete: (guess: string) => void;
  hints: string; // A string with fixed letters and spaces for hints
  className?: string;
}

export function GuessInput({
  length,
  solution,
  onComplete,
  hints,
  className,
}: GuessInputProps) {
  const [guess, setGuess] = useState(() =>
    hints.split("").map((char) => (char.trim() ? char.toUpperCase() : ""))
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // auto-focus first box
    inputRefs.current[0]?.focus();
  }, []);

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

    // Find the next editable input
    let nextIndex = index + 1;
    while (nextIndex < length && hints[nextIndex] !== " ") {
      nextIndex++;
    }

    if (value && nextIndex < length) {
      inputRefs.current[nextIndex]?.focus();
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
        // Find the previous editable input
        let prevIndex = index - 1;
        while (prevIndex >= 0 && hints[prevIndex] !== " ") {
          prevIndex--;
        }
        if (prevIndex >= 0) {
          inputRefs.current[prevIndex]?.focus();
        }
      }
    }
  };

  return (
    <div
      key={`${length}-${hints}`}
      className={`flex flex-wrap justify-center gap-2 space-x-2 ${
        className ? className : ""
      }`}
    >
      {guess.map((char, index) =>
        solution[index] === " " ? (
          // Render a placeholder or empty space for spaces
          <span key={index} className="w-12 h-12" />
        ) : (
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
          />
        )
      )}
    </div>
  );
}
