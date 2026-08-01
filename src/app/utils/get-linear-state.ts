import { State, states } from "../states/states";

let currentIndex = -1; // Initialize with -1 so the first call starts at 0

const getLinearState = (): State => {
  currentIndex = (currentIndex + 1) % states.length; // Increment and loop back to 0 when exceeding length
  return states[currentIndex];
};

export default getLinearState;
