"use client";
import { useState } from "react";
import Image from "next/image";
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
import { Lightbulb, Database, User } from "lucide-react";

interface ContentProps {
  onClose: () => void;
}

function InfoContent({
  onClose,
  onShowRules,
}: ContentProps & { onShowRules: () => void }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Why Play This Game?</DialogTitle>
        <p className="text-sm text-muted-foreground">
          Explore how language models understand words and their relationships.
        </p>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-sm font-semibold">Understand LLMs</h3>
              <p className="text-sm text-muted-foreground">
                Words in a GPT model are represented as vectors in a
                high-dimensional space, revealing semantic and contextual
                relationships.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <User className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-sm font-semibold">Interactive Learning</h3>
              <p className="text-sm text-muted-foreground">
                Solve word equations to experience how models think. Discover
                surprising relations between words.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Database className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-sm font-semibold">Build a Better Dataset</h3>
              <p className="text-sm text-muted-foreground">
                Your guesses contribute to a dataset that helps improve language
                models by identifying biases and refining their understanding.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
      <DialogFooter>
        <Button onClick={onShowRules}>How to play?</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogFooter>
    </>
  );
}

function RulesContent({
  onClose,
  onShowInfo,
}: ContentProps & { onShowInfo: () => void }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>How to Play</DialogTitle>
        <DialogDescription>Here are the rules of the game.</DialogDescription>
        <DialogDescription>
          A large language model (LLM) has its own understanding of words.
          Solve these word puzzles to see how words relate.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Image
            src="/how_to_image.png"
            alt="Game rules illustration"
            width={300}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-muted-foreground">
            You will see a simple word equation. Your task is to figure out the
            resulting word. Use logic to guess the correct answer. Omit spaces.
          </p>
          <p className="text-sm">
            Once you think you figured it out, enter your guess to solve the
            equation. Good luck!
          </p>
        </div>
      </ScrollArea>
      <DialogFooter>
        <Button onClick={onShowInfo}>Why play?</Button>
        <Button onClick={onClose}>Got it</Button>
      </DialogFooter>
    </>
  );
}

export default function GameDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">How to Play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        {showInfo ? (
          <InfoContent
            onClose={handleClose}
            onShowRules={() => setShowInfo(false)}
          />
        ) : (
          <RulesContent
            onClose={handleClose}
            onShowInfo={() => setShowInfo(true)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
