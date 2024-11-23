"use client";

import { useEffect, useState } from "react";
import { CenterLabels } from "@/components/center-labels";
import { GuessInput } from "@/components/guess-input";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import getRandomState from "./utils/get-random-state";
import { State } from "./states/states";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [guess, setGuess] = useState("");
  const [hints, setHints] = useState<string | null>(null);

  const [state, setState] = useState<State | null>(null);

  // not sure yet how and if this is needed
  console.log({ guess });

  useEffect(() => {
    if (!state) {
      setState(getRandomState);
    }
  }, [state]);

  useEffect(() => {
    if (!hints && state) {
      setHints(" ".repeat(state.solution.length));
    }
  }, [hints, state]);

  const handleGuessComplete = (completedGuess: string) => {
    setGuess(completedGuess);

    if (completedGuess.toLowerCase() === state?.solution.toLowerCase()) {
      // two timeouts are needed because of hint logic and input update cycle
      setTimeout(() => {
        // TODO make win-state, add score
        alert("You got it!");
      }, 50);
    }
    console.log("Guess entered:", completedGuess);
  };

  const handleHintClick = () => {
    console.log("Hint button clicked");

    if (!hints || !state) return;

    console.log({ hints });

    // Find the spaces in hints for corresponding letter in the solution
    const possibleHints: number[] = [];

    // Loop through the hints string and collect indices of spaces
    for (let i = 0; i < hints.length; i++) {
      if (hints[i] === " ") {
        possibleHints.push(i); // Add the index of the space to the array
      }
    }

    // Example of picking a random index from the possible hints
    const hintIndex =
      possibleHints[Math.floor(Math.random() * possibleHints.length)];
    if (hintIndex !== -1) {
      // Replace any remaining space with the corresponding character from the solution
      const newHints = [...hints.split("")];
      newHints[hintIndex] = state.solution[hintIndex];

      const newHintsWord = newHints.join("");
      setHints(newHintsWord);
      console.log({ newHints });
      if (newHintsWord.toLowerCase() === state.solution.toLowerCase()) {
        handleGuessComplete(newHintsWord);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {state ? (
          <CenterLabels
            label1={state.label1}
            label2={state.label2}
            isAddition={state.isAddition}
            label3={state.label3}
            isL3Addition={state.isL3Addition}
            className="mb-6"
          />
        ) : (
          <div className="flex-col items-center align-center">
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
          </div>
        )}
        <Separator className="mb-6" />
        {hints && state ? (
          <GuessInput
            length={state.solution.length}
            onComplete={handleGuessComplete}
            hints={hints}
          />
        ) : (
          <Skeleton className="h-12 w-full" />
        )}
      </main>
      <Footer onHintClick={handleHintClick} />
    </div>
  );
}
