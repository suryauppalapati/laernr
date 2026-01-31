"use client";

import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 text-3xl font-bold">
      <p className="text-primary">Home!</p>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        type="submit"
        className="cursor-pointer rounded-full bg-primary p-2 text-sm font-medium text-white hover:bg-primary/80 focus:ring-4 focus:ring-primary/50 focus:outline-none"
      >
        Toogle theme - {theme}
      </button>
    </div>
  );
}
