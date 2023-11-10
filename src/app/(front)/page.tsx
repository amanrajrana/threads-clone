import ThemeToggleBtn from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center items-center gap-8 dark:bg-slate-950 bg-slate-200">
      <Button>Click me</Button>
      <ThemeToggleBtn />
    </div>
  );
}
