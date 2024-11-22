import { cn } from "@/lib/utils";

interface CenterLabelsProps {
  label1: string;
  label2: string;
  className?: string;
  isAddition?: boolean; // Determines the symbol
}

export function CenterLabels({
  label1,
  label2,
  className,
  isAddition = false,
}: CenterLabelsProps) {
  return (
    <div className={cn("text-center", className)}>
      <h1 className="text-4xl font-bold mb-2 ml-6">{label1}</h1>

      <div className="flex justify-between">
        <span className="text-5xl font-bold mr-2">
          {isAddition ? "+" : "-"}
        </span>
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-semibold">{label2}</h1>
        </div>
        <div></div>
      </div>
    </div>
  );
}
