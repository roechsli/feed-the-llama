"use client";

import { useState } from "react";
import { Plus, Minus, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Skeleton } from "./ui/skeleton";

const NO_RESULT = "no word found";
const ERROR_RESULT = "error fetching result";

const isValid = (result: string | null) => {
  if (!result) return false;
  return [ERROR_RESULT, NO_RESULT].every((val) => val !== result.toLowerCase());
};

export default function MathEquationInputMask() {
  const [label1, setLabel1] = useState("");
  const [label2, setLabel2] = useState("");
  const [label3, setLabel3] = useState("");
  const [isAddition, setIsAddition] = useState(true);
  const [isL3Addition, setIsL3Addition] = useState(false);

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isResultValid = isValid(result);

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
        sign1: isAddition ? 1 : -1,
        word2: label2,
        sign2: isL3Addition ? 1 : -1,
        word3: label3,
      };

      // Make the POST request with the payload in the body
      const response = await fetch("http://127.0.0.1:8080/select-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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

  const onCopyClick = () => {
    const copyText = `{
      label1: "${
        String(label1).charAt(0).toUpperCase() + String(label1).slice(1)
      }",
      label2: "${
        String(label2).charAt(0).toUpperCase() + String(label2).slice(1)
      }",
      isAddition: ${isAddition},
      label3: "${
        String(label3).charAt(0).toUpperCase() + String(label3).slice(1)
      }",
      isL3Addition: ${isL3Addition},
      solution: "${String(result).toLowerCase()}",
    },
    `;
    navigator.clipboard.writeText(copyText);
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
        <div className="flex flex-col mt-4 p-3">
          <div
            className={`w-full p-3 rounded-md ${
              isResultValid
                ? "bg-green-100 dark:bg-green-700"
                : "bg-red-100 dark:bg-red-700"
            }`}
          >
            <p className="text-sm font-medium text-center">{result}</p>
          </div>

          {isResultValid ? (
            <div className="mt-3">
              <Button
                onClick={onCopyClick}
                className="flex items-center space-x-2 bg-gray-400 w-full"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
