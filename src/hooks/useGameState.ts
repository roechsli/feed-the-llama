"use client";

import { useState, useEffect, useCallback } from "react";
import { State } from "@/app/states/states";
import getRandomState from "@/app/utils/get-random-state";
import {
  initHints,
  isCorrectGuess,
  computeScoreDelta,
  revealNextHint,
} from "@/lib/game-logic";

export interface GameStateHook {
  state: State | null;
  hints: string | null;
  score: number;
  showConfetti: boolean;
  shakeInput: boolean;
  singleInputMode: boolean;
  handleGuessComplete: (guess: string) => void;
  handleHintClick: () => void;
  onNextClick: () => void;
  toggleSingleInputMode: () => void;
}

/**
 * Encapsulates all game state and interaction logic for the main game screen.
 * Separates business logic from presentation in page.tsx.
 */
export function useGameState(): GameStateHook {
  const [state, setState] = useState<State | null>(null);
  const [hints, setHints] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [singleInputMode, setSingleInputMode] = useState(false);

  // Load the next puzzle whenever state is cleared, and initialise hints
  // in the same effect to avoid a two-render initialisation cycle.
  useEffect(() => {
    if (!state) {
      const nextState = getRandomState();
      setState(nextState);
      setHints(initHints(nextState.solution));
    }
  }, [state]);

  const onNextClick = useCallback(() => {
    setState(null);
    setHints(null);
    setShowConfetti(false);
  }, []);

  const handleGuessComplete = useCallback(
    (completedGuess: string) => {
      if (!state || !hints) return;

      if (isCorrectGuess(completedGuess, state.solution)) {
        // Two timeouts are needed because of the hint-state/input update cycle.
        setTimeout(() => {
          setShowConfetti(true);
          setScore((prev) => prev + computeScoreDelta(state.solution, hints));
          setHints(state.solution);

          if (singleInputMode) {
            setTimeout(() => {
              onNextClick();
            }, 1500);
          }
        }, 50);
        setShakeInput(false);
      } else {
        setShakeInput(true);
        setTimeout(() => setShakeInput(false), 500);
      }
    },
    [state, hints, singleInputMode, onNextClick]
  );

  const handleHintClick = useCallback(() => {
    if (!hints || !state || isCorrectGuess(hints, state.solution)) return;

    const newHints = revealNextHint(hints, state.solution);
    if (newHints) {
      setHints(newHints);
      if (isCorrectGuess(newHints, state.solution)) {
        handleGuessComplete(newHints);
      }
    }
  }, [hints, state, handleGuessComplete]);

  const toggleSingleInputMode = useCallback(() => {
    setSingleInputMode((prev) => !prev);
  }, []);

  return {
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
  };
}
