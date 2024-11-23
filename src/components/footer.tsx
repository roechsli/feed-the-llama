import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import GameRulesDialog from "./game-rules-dialog";
import Link from "next/link";

interface FooterProps {
  onHintClick?: () => void;
  isStatistics?: boolean;
}

export function Footer({ onHintClick, isStatistics = false }: FooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100">
      <div className="flex justify-center md:gap-8 gap-4">
        {isStatistics ? null : (
          <Button onClick={onHintClick} className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Hint</span>
          </Button>
        )}
        <GameRulesDialog />
        <Button variant="outline">
          <Link href={isStatistics ? "/" : "/statistics"}>
            {isStatistics ? "Play" : "Statistics"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
