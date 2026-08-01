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

function isDataItem(value: unknown): value is DataItem {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.word === "string" &&
    typeof v.guess === "string" &&
    typeof v.occurrence === "number"
  );
}

function parseStoredData(raw: string): DataItem[] {
  const parsed: unknown = JSON.parse(raw);
  if (Array.isArray(parsed) && parsed.every(isDataItem)) {
    return parsed;
  }
  // Data shape doesn't match — fall back to mock data to avoid runtime crashes
  console.warn("useLocalStorage: stored data has an unexpected shape; resetting to defaults.");
  return MOCK_DATA;
}

export function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState<DataItem[]>(() => {
    if (typeof window === "undefined") {
      return MOCK_DATA;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? parseStoredData(item) : MOCK_DATA;
    } catch (error) {
      console.error("useLocalStorage: failed to read from localStorage:", error);
      return MOCK_DATA;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = storedValue.length > 0 ? storedValue : MOCK_DATA;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("useLocalStorage: failed to write to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
