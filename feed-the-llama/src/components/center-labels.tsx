import { cn } from "@/lib/utils"

interface CenterLabelsProps {
  label1: string
  label2: string
  className?: string
}

export function CenterLabels({ label1, label2, className }: CenterLabelsProps) {
  return (
    <div className={cn("text-center", className)}>
      <h1 className="text-4xl font-bold mb-2">{label1}</h1>
      <h2 className="text-3xl font-semibold">{label2}</h2>
    </div>
  )
}

