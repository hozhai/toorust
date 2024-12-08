import { SearchDialog } from "@/components/custom/search";
import { Switch } from "@/components/custom/theme-switch";

export default function Home() {
  return (
    <section className="h-screen bg-zinc-50 dark:bg-neutral-900 grid place-items-center">
      <div className="text-center">
        <h1 className="text-9xl text-zinc-800 dark:text-amber-100 brightness-125 font-sans font-extrabold dark:text-glow-orange-200">
          Toorust
        </h1>
        <h2 className="text-3xl text-gray-700 dark:text-amber-50 font-sans">
          tools that r --&gt; &bull;
        </h2>
        <div className="flex justify-center items-center space-x-3 mt-4">
          <SearchDialog />
          <Switch />
        </div>
      </div>
    </section>
  );
}
