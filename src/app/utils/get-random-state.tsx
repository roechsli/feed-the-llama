export interface State {
  label1: string;
  label2: string;
  isAddition: boolean;
  label3?: string;
  isL3Addition?: boolean;
  solution: string;
}

const states: State[] = [
  {
    label1: "Man",
    label2: "Woman",
    isAddition: true,
    solution: "blabla",
  },
];

const getRandomState = (): State => {
  const randomIndex = Math.floor(Math.random() * states.length);
  return states[randomIndex];
};

export default getRandomState;
