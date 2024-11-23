export interface State {
  label1: string;
  label2: string;
  isAddition: boolean;
  label3?: string;
  isL3Addition?: boolean;
  solution: string;
}

// These states have been generated using the word2vec LLM offline and
// exported here.
// In the future, we will integrate this into a running edge function for getting
// a new random state.
export const states: State[] = [
  {
    label1: "Doctor",
    label2: "Medicine",
    isAddition: false,
    label3: "Law",
    isL3Addition: true,
    solution: "lawyer",
  },
  {
    label1: "Gym",
    label2: "Exercise",
    isAddition: false,
    label3: "Relax",
    isL3Addition: true,
    solution: "spa",
  },
  {
    label1: "Penguin",
    label2: "Cold",
    isAddition: false,
    label3: "Desert",
    isL3Addition: true,
    solution: "camel",
  },
  {
    label1: "Paris",
    label2: "France",
    isAddition: false,
    label3: "Spain",
    isL3Addition: true,
    solution: "madrid",
  },
  {
    label1: "Santa Clause",
    label2: "Christmas",
    isAddition: false,
    label3: "Halloween",
    isL3Addition: true,
    solution: "dracula",
  },
  {
    label1: "Cow",
    label2: "Farm",
    isAddition: false,
    label3: "City",
    isL3Addition: true,
    solution: "pigeon",
  },
  {
    label1: "Beethoven",
    label2: "Music",
    isAddition: false,
    label3: "Painting",
    isL3Addition: true,
    solution: "picasso",
  },
  {
    label1: "Tesla",
    label2: "Electric Cars",
    isAddition: false,
    label3: "Space",
    isL3Addition: true,
    solution: "spacex",
  },
  {
    label1: "Soccer",
    label2: "Europe",
    isAddition: false,
    label3: "USA",
    isL3Addition: true,
    solution: "football",
  },
  {
    label1: "Zombie",
    label2: "Brains",
    isAddition: false,
    label3: "Muscles",
    isL3Addition: true,
    solution: "bodybuilder",
  },
  {
    label1: "King",
    label2: "Man",
    isAddition: false,
    label3: "Woman",
    isL3Addition: true,
    solution: "queen",
  },
  {
    label1: "Einstein",
    label2: "Physics",
    isAddition: false,
    label3: "Literature",
    isL3Addition: true,
    solution: "shakespeare",
  },
  {
    label1: "Chef",
    label2: "Kitchen",
    isAddition: false,
    label3: "Studio",
    isL3Addition: true,
    solution: "artist",
  },
  {
    label1: "Olympics",
    label2: "Summer",
    isAddition: false,
    label3: "Winter",
    isL3Addition: true,
    solution: "winterolympics",
  },
  {
    label1: "Coffee",
    label2: "Hot",
    isAddition: false,
    label3: "Cold",
    isL3Addition: true,
    solution: "icedcoffee",
  },
  {
    label1: "iPhone",
    label2: "Apple",
    isAddition: false,
    label3: "Alphabet",
    isL3Addition: true,
    solution: "pixel",
  },
  {
    label1: "Book",
    label2: "Reading",
    isAddition: false,
    label3: "Watching",
    isL3Addition: true,
    solution: "movie",
  },
  {
    label1: "Vampire",
    label2: "Night",
    isAddition: false,
    label3: "Day",
    isL3Addition: true,
    solution: "sunbather",
  },
  {
    label1: "Mermaid",
    label2: "Ocean",
    isAddition: false,
    label3: "Land",
    isL3Addition: true,
    solution: "hiker",
  },
  {
    label1: "Wizard",
    label2: "Magic",
    isAddition: false,
    label3: "Science",
    isL3Addition: true,
    solution: "scientist",
  },
  {
    label1: "Dragon",
    label2: "Fire",
    isAddition: false,
    label3: "Ice",
    isL3Addition: true,
    solution: "polarbear",
  },
];
