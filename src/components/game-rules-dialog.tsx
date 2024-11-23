import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function GameRulesDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">How to Play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>How to Play</DialogTitle>
          <DialogDescription>
            Here are the rules of the game. Read carefully before you start!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Game rules illustration"
              width={300}
              height={300}
              className="rounded-md"
            />
            <p className="text-sm text-muted-foreground">
              A large language model (LLM) has its own understanding of words.
              Solve these word puzzles to see how words relate.
            </p>
            <p className="text-sm">
              You will see a simple equation, and your task is to figure out the
              resulting word. Use logic to guess the correct answer.
            </p>
            <p className="text-sm">
              Once you think you figured it out, enter your guess to solve the
              equation. Good luck!
            </p>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
