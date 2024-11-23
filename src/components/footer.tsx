"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import GameRulesDialog from "./game-rules-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterProps {
  onHintClick?: () => void;
}

export function Footer({ onHintClick }: FooterProps) {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100">
      <div className="flex justify-center md:gap-8 gap-4">
        {pathname === "/" ? (
          <Button onClick={onHintClick} className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Hint</span>
          </Button>
        ) : null}
        <GameRulesDialog />
        {pathname === "/" ? null : (
          <Button variant="outline">
            <Link href={"/"}>{"Play"}</Link>
          </Button>
        )}
        {pathname === "/statistics" ? null : (
          <Button variant="outline">
            <Link href={"/statistics"}>{"Statistics"}</Link>
          </Button>
        )}
        {pathname === "/generate" ? null : (
          <Button variant="outline">
            <Link href={"/generate"}>{"Generate"}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
