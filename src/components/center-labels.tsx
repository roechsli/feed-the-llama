"use client";

import { cn } from "@/lib/utils";

interface CenterLabelsProps {
  label1: string;
  label2: string;
  isAddition?: boolean; // Determines the operator
  label3?: string;
  className?: string;
  isL3Addition?: boolean; // Determines the operator
}

export function CenterLabels({
  label1,
  label2,
  className,
  isAddition = false,
  label3 = undefined,
  isL3Addition = false,
}: CenterLabelsProps) {
  return (
    <div className={cn("text-center", className)}>
      <h1 key={label1} className="text-4xl font-bold mb-2 ml-6">
        {label1}
      </h1>

      <div
        className={`flex justify-between ${
          isAddition ? "text-green-900" : "text-red-900"
        }`}
      >
        <span className="text-5xl font-bold mr-2 min-w-[28px]">
          {isAddition ? "+" : "-"}
        </span>
        <div className="flex items-center justify-center">
          <h1 key={label2} className="text-4xl font-semibold">
            {label2}
          </h1>
        </div>
        <div></div>
      </div>

      {label3 !== undefined ? (
        <div
          className={`flex justify-between ${
            isL3Addition ? "text-green-900" : "text-red-900"
          }`}
        >
          <span className="text-5xl font-bold mr-2">
            {isL3Addition ? "+" : "-"}
          </span>
          <div className="flex items-center justify-center">
            <h1 key={label3} className="text-4xl font-semibold">
              {label3}
            </h1>
          </div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
}
