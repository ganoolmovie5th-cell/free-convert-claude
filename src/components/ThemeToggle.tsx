"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Mode terang" : "Mode gelap"}
      className="grid h-9 w-9 place-items-center rounded-lg border border-black/10 bg-white text-ink-700 transition hover:border-brand-300 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200"
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}
