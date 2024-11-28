import { State, states } from "../states/states";

let shuffledStates: State[] = [];
let currentIndex = 0;

// Function to shuffle the states array
const shuffleStates = () => {
  shuffledStates = [...states];
  for (let i = shuffledStates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledStates[i], shuffledStates[j]] = [
      shuffledStates[j],
      shuffledStates[i],
    ];
  }
  currentIndex = 0; // Reset the index
};

// Function to get the next random state
const getRandomState = (): State => {
  // Shuffle states if the array is empty or fully iterated
  if (currentIndex === 0 || currentIndex >= shuffledStates.length) {
    shuffleStates();
  }

  // Return the current state and increment the index
  const state = shuffledStates[currentIndex];
  currentIndex++;
  return state;
};

export default getRandomState;
