import { useState, useEffect } from "react";

export type DataItem = {
  word: string;
  guess: string;
  occurrence: number;
};

const MOCK_DATA: DataItem[] = [
  { word: "queen", guess: "king", occurrence: 7 },
  { word: "lawyer", guess: "doctor", occurrence: 3 },
  { word: "madrid", guess: "paris", occurrence: 5 },
  { word: "shakespeare", guess: "einstein", occurrence: 6 },
  { word: "artist", guess: "chef", occurrence: 9 },
  { word: "spacex", guess: "tesla", occurrence: 2 },
  { word: "picasso", guess: "beethoven", occurrence: 4 },
  { word: "football", guess: "soccer", occurrence: 8 },
  { word: "winter olympics", guess: "summer", occurrence: 1 },
  { word: "iced coffee", guess: "cold", occurrence: 10 },
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
