"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useState } from "react";

const Switch = ({ className, ...props }: React.JSX.IntrinsicElements["p"]) => {
  const { theme, setTheme } = useTheme();
  const [isMac, setIsMac] = useState(false);

  const toggleTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      default:
        setTheme("dark");
        break;
    }
  };

  useEffect(() => {
    setIsMac(
      typeof window !== "undefined"
        ? navigator.userAgent.includes("Mac")
        : false,
    );

    const down = (e: KeyboardEvent) => {
      if (e.key === "x" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">{isMac ? "⌘" : "^"} X</span>
      </kbd>{" "}
      to switch themes
    </p>
  );
};

export { Switch };
