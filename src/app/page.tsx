"use client";

import { useEffect } from "react";
import { CenterLabels } from "@/components/center-labels";
import { GuessInput } from "@/components/guess-input";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Confetti } from "@/components/Confetti";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";

export default function Home() {
  const {
    state,
    hints,
    score,
    showConfetti,
    shakeInput,
    singleInputMode,
    handleGuessComplete,
    handleHintClick,
    onNextClick,
    toggleSingleInputMode,
  } = useGameState();

  // Advance to the next puzzle when Enter is pressed after a correct guess
  useEffect(() => {
    if (!showConfetti) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") onNextClick();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showConfetti, onNextClick]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-10">
      <main className="w-full max-w-lg p-6 bg-white rounded-none md:rounded-lg shadow-md">
        {showConfetti && <Confetti isActive={showConfetti} />}
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
              onClick={toggleSingleInputMode}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <span>{singleInputMode ? "Easy Mode" : "Hard Mode"}</span>
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
                className={shakeInput ? "shake text-red-500" : ""}
                singleInputMode={singleInputMode}
              />
            </div>
            {showConfetti && (
              <div className="py-4 flex items-center justify-center">
                <Button
                  onClick={onNextClick}
                  className="flex bottom-2 right-2 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Skeleton className="h-12 w-full" />
        )}
      </main>
      <Footer />
    </div>
  );
}
