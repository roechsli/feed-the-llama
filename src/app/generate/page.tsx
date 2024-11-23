import { Footer } from "@/components/footer";
import MathEquationInputMask from "@/components/math-equation-input-mask";

export default function Home() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-10">
      <main className="flex min-h-screen flex-col items-center justify-between">
        <MathEquationInputMask />
      </main>
      <Footer />
    </div>
  );
}
