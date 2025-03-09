import { NewsHeader } from "@/components/NewsHeader";
import { NewsList } from "@/components/NewsList";
import { CategoryNav } from "@/components/CategoryNav";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <NewsHeader />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CategoryNav className="md:col-span-1" />
        <main className="md:col-span-3">
          <NewsList />
        </main>
      </div>
    </div>
  );
}