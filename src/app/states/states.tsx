export interface State {
  label1: string;
  label2: string;
  isAddition: boolean;
  label3?: string;
  isL3Addition?: boolean;
  solution: string;
}

export const states: State[] = [
  {
    label1: "Man",
    label2: "Woman",
    isAddition: true,
    solution: "blabla",
  },
  {
    label1: "King",
    label2: "Woman",
    isAddition: false,
    label3: "Man",
    isL3Addition: true,
    solution: "bla",
  },
];
