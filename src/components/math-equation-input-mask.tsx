"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Skeleton } from "./ui/skeleton";

export default function MathEquationInputMask() {
  const [label1, setLabel1] = useState("");
  const [label2, setLabel2] = useState("");
  const [label3, setLabel3] = useState("");
  const [isAddition, setIsAddition] = useState(true);
  const [isL3Addition, setIsL3Addition] = useState(false);

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const equation = `${label1} ${isAddition ? "+" : "-"} ${label2} ${
      isL3Addition ? "+" : "-"
    } ${label3}`;
    console.log("Submitted equation:", equation);

    setIsLoading(true);

    try {
      // Construct the payload
      const payload = {
        word1: label1,
        sign1: isAddition ? "1" : "-1",
        word2: label2,
        sign2: isL3Addition ? "1" : "-1",
        word3: label3,
      };

      // Construct the query string
      const queryString = new URLSearchParams(payload).toString();

      // Make the GET request with the query string
      const response = await fetch(
        `https://hackatum-be-767195590327.europe-west3.run.app?${queryString}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Parse the response
      const data = await response.json();
      console.log("Response from server:", data);

      // Update the result state with the predicted word
      setResult(data.predicted_word || "No word predicted");
    } catch (error) {
      console.error("Error submitting equation:", error);
      setResult("Error fetching result");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="label1">Label 1</Label>
          <Input
            id="label1"
            value={label1}
            onChange={(e) => setLabel1(e.target.value)}
            placeholder="Enter first term"
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <Toggle
            pressed={isAddition}
            onPressedChange={setIsAddition}
            aria-label="Toggle addition or subtraction"
          >
            {isAddition ? (
              <Plus className="h-4 w-4" />
            ) : (
              <Minus className="h-4 w-4" />
            )}
          </Toggle>
        </div>

        <div>
          <Label htmlFor="label2">Label 2</Label>
          <Input
            id="label2"
            value={label2}
            onChange={(e) => setLabel2(e.target.value)}
            placeholder="Enter second term"
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <Toggle
            pressed={isL3Addition}
            onPressedChange={setIsL3Addition}
            aria-label="Toggle addition or subtraction for third term"
          >
            {isL3Addition ? (
              <Plus className="h-4 w-4" />
            ) : (
              <Minus className="h-4 w-4" />
            )}
          </Toggle>
        </div>

        <div>
          <Label htmlFor="label3">Label 3</Label>
          <Input
            id="label3"
            value={label3}
            onChange={(e) => setLabel3(e.target.value)}
            placeholder="Enter third term"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Get Result
      </Button>

      {isLoading ? <Skeleton className="mt-4 p-3" /> : null}
      {result ? (
        <div className="mt-4 p-3 bg-green-100 rounded-md dark:bg-green-700">
          <p className="text-sm font-medium text-center">{result}</p>
        </div>
      ) : null}
    </form>
  );
}
