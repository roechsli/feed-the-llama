import { useState, useEffect } from "react";

export type DataItem = {
  word: string;
  guess: string;
  occurrence: number;
};

const MOCK_DATA: DataItem[] = [
  { word: "iced coffee", guess: "cold brew", occurrence: 214 },
  { word: "lawyer", guess: "physician", occurrence: 184 },
  { word: "shakespeare", guess: "locke", occurrence: 152 },
  { word: "queen", guess: "lady", occurrence: 120 },
  { word: "artist", guess: "designer", occurrence: 101 },
  { word: "picasso", guess: "dali", occurrence: 97 },
  { word: "spacex", guess: "flying", occurrence: 43 },
  { word: "madrid", guess: "capital", occurrence: 32 },
  { word: "football", guess: "basketball", occurrence: 27 },
  { word: "winter olympics", guess: "winter games", occurrence: 19 },
];

export function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState<DataItem[]>(() => {
    if (typeof window === "undefined") {
      return MOCK_DATA;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : MOCK_DATA;
    } catch (error) {
      console.log(error);
      return MOCK_DATA;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = storedValue.length > 0 ? storedValue : MOCK_DATA;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
