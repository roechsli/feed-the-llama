"use client";

import { useEffect, useState } from "react";
import { CenterLabels } from "@/components/center-labels";
import { GuessInput } from "@/components/guess-input";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import getRandomState from "./utils/get-random-state";
import { State } from "./states/states";
import { Skeleton } from "@/components/ui/skeleton";
import { Confetti } from "@/components/Confetti";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
// import getLinearState from "./utils/get-linear-state";

export default function Home() {
  const [hints, setHints] = useState<string | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeInput, setShakeInput] = useState(false); // State to trigger shake
  const [singleInputMode, setSingleInputMode] = useState(false);

  useEffect(() => {
    if (!state) {
      setState(getRandomState);
      console.log({ getRandomState });
      // setState(getLinearState);
    }
  }, [state]);

  useEffect(() => {
    if (!hints && state) {
      setHints(" ".repeat(state.solution.length));
    }
  }, [hints, state]);

  // Add keyboard listener for "Enter" key when showConfetti is true
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showConfetti && event.key === "Enter") {
        onNextClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showConfetti]); // Dependency ensures listener runs when showConfetti changes

  const handleGuessComplete = (completedGuess: string) => {
    if (completedGuess.toLowerCase() === state?.solution.toLowerCase()) {
      // two timeouts are needed because of hint logic and input update cycle
      setTimeout(() => {
        setShowConfetti(true);
        setScore(
          (prevScore) =>
            prevScore +
            state.solution.length -
            (hints ?? "").split("").filter((c) => c !== " ").length -
            1
        );
        setHints(state.solution);
        
        // If in single input mode, automatically move to next puzzle after a delay
        if (singleInputMode) {
          setTimeout(() => {
            onNextClick();
          }, 1500); // Delay to show confetti animation
        }
      }, 50);
      setShakeInput(false); // Reset the shake if the guess is correct
    } else {
      // Trigger shake animation if the guess is incorrect
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    }
  };

  const handleHintClick = () => {
    // return if either one was not initialized yet
    if (
      !hints ||
      !state ||
      hints.toLowerCase() === state.solution.toLowerCase()
    )
      return;

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
      if (newHintsWord.toLowerCase() === state.solution.toLowerCase()) {
        handleGuessComplete(newHintsWord);
      }
    }
  };

  const onNextClick = () => {
    // reset the state
    setState(null);
    setHints(null);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-10">
      <main className="w-full max-w-lg p-6 bg-white rounded-none md:rounded-lg shadow-md">
        {showConfetti ? <Confetti isActive={showConfetti} /> : null}
        <div className="flex justify-between">
          <div className="flex space-x-2">
            {!singleInputMode && (
              <Button
                onClick={handleHintClick}
                className="flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Hint</span>
              </Button>
            )}
            
            <Button
              onClick={() => setSingleInputMode(!singleInputMode)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <span>{singleInputMode ? "Character Mode" : "Word Mode"}</span>
            </Button>
          </div>

          <div>Score: {score}</div>
        </div>

        <div className="mt-2">
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
            <div className="flex-col items-center align-center mb-8">
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full mb-2" />
            </div>
          )}
        </div>

        <Separator className="mb-6" />
        {hints && state ? (
          <div>
            <div className="flex justify-center relative">
              <GuessInput
                length={state.solution.length}
                solution={state.solution}
                onComplete={handleGuessComplete}
                hints={hints}
                className={shakeInput ? "shake text-red-500" : ""} // Add the shake class conditionally
                singleInputMode={singleInputMode}
              />
            </div>
            {showConfetti ? (
              <div className="py-4 flex items-center justify-center">
                <Button
                  onClick={onNextClick}
                  className="flex bottom-2 right-2 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
          <Skeleton className="h-12 w-full" />
        )}
      </main>
      <Footer />
    </div>
  );
}