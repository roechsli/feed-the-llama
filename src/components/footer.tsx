"use client";

import { Button } from "@/components/ui/button";
import GameDialog from "./game-rules-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Check if window is available
  const getStatisticsHref = () => {
    if (typeof window !== "undefined") {
      return "//" + window.location.host + "/statistics";
    }
    return "/statistics"; // Fallback for SSR
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100">
      <div className="flex justify-center md:gap-8 gap-4">
        {pathname === "/" ? null : null}
        <GameDialog />
        {pathname === "/" ? null : (
          <Button variant="outline">
            <Link href={"/"}>{"Play"}</Link>
          </Button>
        )}
        {pathname === "/statistics" ? null : (
          <Button variant="outline">
            <Link href={getStatisticsHref()}>{"Statistics"}</Link>
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
