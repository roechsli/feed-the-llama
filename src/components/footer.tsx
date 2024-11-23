import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import GameRulesDialog from "./game-rules-dialog";

interface FooterProps {
  onHintClick: () => void;
}

export function Footer({ onHintClick }: FooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100">
      <div className="flex justify-center gap-8">
        <Button onClick={onHintClick} className="flex items-center space-x-2">
          <Search className="w-4 h-4" />
          <span>Hint</span>
        </Button>
        <GameRulesDialog />
      </div>
    </div>
  );
}
