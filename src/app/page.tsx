"use client";

import { useState } from "react";
import { CenterLabels } from "@/components/center-labels";
import { GuessInput } from "@/components/guess-input";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import getRandomState, { State } from "./utils/get-random-state";

export default function Home() {
  const [guess, setGuess] = useState("");

  const state: State = getRandomState();

  console.log({ guess });

  const handleGuessComplete = (completedGuess: string) => {
    setGuess(completedGuess);

    if (completedGuess.toLowerCase() === state.solution.toLowerCase()) {
      setTimeout(() => {
        // TODO make win-state, add score
        alert("You got it!");
      });
    }
    console.log("Guess entered:", completedGuess);
  };

  const handleHintClick = () => {
    console.log("Hint button clicked");
    // Add your hint logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <CenterLabels
          label1={state.label1}
          label2={state.label2}
          className="mb-6"
        />
        <Separator className="mb-6" />
        <GuessInput length={6} onComplete={handleGuessComplete} />
      </main>
      <Footer onHintClick={handleHintClick} />
    </div>
  );
}
