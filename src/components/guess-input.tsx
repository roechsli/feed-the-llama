"use client";
import React, { useRef, useState, useEffect } from "react";

interface GuessInputProps {
  length: number;
  solution: string;
  onComplete: (guess: string) => void;
  hints: string; // A string with fixed letters and spaces for hints
  className?: string;
  singleInputMode?: boolean; // New prop to toggle between modes
}

export function GuessInput({
  length,
  solution,
  onComplete,
  hints,
  className,
  singleInputMode = false, // Default to the original mode
}: GuessInputProps) {
  const [guess, setGuess] = useState(() =>
    hints.split("").map((char) => (char.trim() ? char.toUpperCase() : ""))
  );
  const [singleInputValue, setSingleInputValue] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first box
    if (!singleInputMode) {
      inputRefs.current[0]?.focus();
    }
  }, [singleInputMode]);

  useEffect(() => {
    // When a hint is revealed, only overwrite positions that now have a hint
    // character — preserve everything the user has already typed elsewhere.
    setGuess((prevGuess) =>
      hints.split("").map((char, i) =>
        char.trim()
          ? char.toUpperCase() // hint character — always authoritative
          : (prevGuess[i] ?? "") // blank slot — keep the user's typed value
      )
    );
    // Reset single-input text only when the puzzle resets (all spaces = new puzzle)
    if (hints.split("").every((c) => c === " ")) {
      setSingleInputValue("");
    }
  }, [hints]);

  const handleSingleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSingleInputValue(e.target.value);
  };

  const handleSingleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && singleInputValue.trim() !== "") {
      onComplete(singleInputValue);
    }
  };

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
      if (solution[nextIndex] !== " ") {
        inputRefs.current[nextIndex]?.focus();
      } else {
        if (nextIndex + 1 < length) inputRefs.current[nextIndex + 1]?.focus();
      }
    }

    if (
      newGuess.filter((char) => char !== "").length ===
      solution.split("").filter((c) => c !== " ").length
    ) {
      // Rebuild the guess string by inserting spaces from the solution
      const shiftGuess = [...newGuess.map((c) => (c === "" ? " " : c))];

      onComplete(shiftGuess.join(""));
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

  // Group inputs by words
  const words = solution.split(" ").map((word, i) => ({
    word,
    startIndex: solution.split(" ", i).join(" ").length + (i > 0 ? 1 : 0),
  }));

  return (
    // key uses only `length` so React remounts on a new puzzle but NOT on
    // every hint reveal — remounting on hint change caused focus loss and
    // cleared all of the user's already-typed characters.
    <div
      key={length}
      className={`flex flex-wrap gap-2 ${
        className ? className : ""
      } justify-center`}
    >
      {singleInputMode ? (
        // Single input field mode
        <div className="flex w-full">
          <div className="flex text-gray-800 text-5xl font-bold mr-2 min-w-[30px]">
            {"="}
          </div>
          <input
            type="text"
            value={singleInputValue}
            onChange={handleSingleInputChange}
            onKeyDown={handleSingleInputKeyDown}
            className="w-full h-12 text-center text-2xl border-2 rounded-md focus:outline-none border-gray-300 focus:border-blue-500"
            placeholder="Type your guess here"
            aria-label="Type your answer and press Enter"
            autoFocus
          />
        </div>
      ) : (
        // Original mode with individual input fields
        words.map(({ word, startIndex }, wordIdx) => (
          <div
            key={startIndex}
            className="flex gap-1 flex-shrink flex-nowrap"
            style={{ flexShrink: 1 }}
          >
            {startIndex === 0 ? (
              <div className="flex text-gray-800 text-5xl font-bold mr-2 min-w-[30px]">
                {"="}
              </div>
            ) : null}
            {word.split("").map((_, index) => {
              const charIndex = startIndex + index;
              const isHint = hints[charIndex] !== " ";
              return (
                <input
                  key={charIndex}
                  ref={(el) => {
                    inputRefs.current[charIndex] = el;
                  }}
                  type="text"
                  value={guess[charIndex]}
                  onChange={(e) => handleChange(charIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(charIndex, e)}
                  aria-label={`Letter ${index + 1} of ${word.length}, word ${wordIdx + 1}${isHint ? " (revealed)" : ""}`}
                  readOnly={isHint}
                  className={`w-8 sm:w-10 h-12 text-center text-2xl border-2 rounded-md focus:outline-none ${
                    isHint
                      ? "bg-green-200 border-green-500 text-green-800"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  maxLength={1}
                />
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}
