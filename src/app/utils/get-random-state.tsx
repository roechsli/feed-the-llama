import { State, states } from "../states/states";

const getRandomState = (): State => {
  const randomIndex = Math.floor(Math.random() * states.length);
  return states[randomIndex];
};

export default getRandomState;
