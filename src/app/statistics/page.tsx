import { Footer } from "@/components/footer";
import SortableDataTable from "@/components/SortableDataTable";

export default function Home() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <main className="flex min-h-screen flex-col items-center justify-between">
        <SortableDataTable />
      </main>
      <Footer isStatistics={true} />
    </div>
  );
}
