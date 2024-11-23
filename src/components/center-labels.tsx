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
      <h2 key={label1} className="text-3xl text-gray-800 font-bold mb-2 ml-6">
        {label1}
      </h2>

      <div
        className={`flex justify-between ${
          isAddition ? "text-algae-green-600" : "text-vanilla-600"
        }`}
      >
        <span className="text-5xl font-bold mr-2 min-w-[30px]">
          {isAddition ? "+" : "-"}
        </span>
        <div className="flex items-center justify-center">
          <h2 key={label2} className="text-3xl font-semibold">
            {label2}
          </h2>
        </div>
        <div></div>
      </div>

      {label3 !== undefined ? (
        <div
          className={`flex justify-between ${
            isL3Addition ? "text-algae-green-600" : "text-vanilla-600"
          }`}
        >
          <span className="text-5xl font-bold mr-2 min-w-[30px]">
            {isL3Addition ? "+" : "-"}
          </span>
          <div className="flex items-center justify-center">
            <h2 key={label3} className="text-3xl font-semibold">
              {label3}
            </h2>
          </div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
}
