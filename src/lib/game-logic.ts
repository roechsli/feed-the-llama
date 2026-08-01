/**
 * Pure game logic functions for Feed the Llama.
 * These functions are side-effect-free and can be unit-tested in isolation.
 */

/**
 * Creates the initial hints string for a solution.
 * All positions start as spaces (unrevealed).
 */
export function initHints(solution: string): string {
  return " ".repeat(solution.length);
}

/**
 * Checks whether a guess matches the solution (case-insensitive).
 */
export function isCorrectGuess(guess: string, solution: string): boolean {
  return guess.toLowerCase() === solution.toLowerCase();
}

/**
 * Calculates the score delta for a correctly solved puzzle.
 * Score = solution length - number of already-revealed hint characters - 1.
 * Rewards solving with fewer hints used.
 */
export function computeScoreDelta(solution: string, hints: string): number {
  const revealedCount = hints.split("").filter((c) => c !== " ").length;
  return solution.length - revealedCount - 1;
}

/**
 * Returns a new hints string with one randomly chosen unrevealed position
 * filled in from the solution, or null if no positions remain to reveal.
 */
export function revealNextHint(hints: string, solution: string): string | null {
  const availableIndices: number[] = [];
  for (let i = 0; i < hints.length; i++) {
    if (hints[i] === " ") availableIndices.push(i);
  }
  if (availableIndices.length === 0) return null;

  const hintIndex =
    availableIndices[Math.floor(Math.random() * availableIndices.length)];
  const newHints = hints.split("");
  newHints[hintIndex] = solution[hintIndex];
  return newHints.join("");
}
