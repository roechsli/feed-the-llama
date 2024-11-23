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
    solution: "parents",
  },
  {
    label1: "Queen",
    label2: "Woman",
    isAddition: false,
    label3: "Man",
    isL3Addition: true,
    solution: "king",
  },
];
