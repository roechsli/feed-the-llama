"use client";

import { useState } from "react";
import { CenterLabels } from "@/components/center-labels";
import { CodeInput } from "@/components/code-input";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [code, setCode] = useState("");

  console.log({ code });

  const handleCodeComplete = (completedCode: string) => {
    setCode(completedCode);
    console.log("Code entered:", completedCode);
    // You can add your logic here for what to do when the code is complete
  };

  const handleHintClick = () => {
    console.log("Hint button clicked");
    // Add your hint logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <CenterLabels
          label1="Enter Code"
          label2="Security Verification"
          className="mb-6"
        />
        <Separator className="mb-6" />
        <CodeInput length={6} onComplete={handleCodeComplete} />
      </main>
      <Footer onHintClick={handleHintClick} />
    </div>
  );
}
