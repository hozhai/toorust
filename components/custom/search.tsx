"use client";

import { Calculator, Calendar, Smile } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SearchDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [isMac, setIsMac] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    setIsMac(
      typeof window !== "undefined"
        ? navigator.userAgent.includes("Mac")
        : false,
    );

    const down = (e: KeyboardEvent) => {
      if (e.key === "e" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const getData = setTimeout(async () => {
      const req = await fetch(`api/echo?msg=${searchInput}`);
      const res = await req.json();

      console.log(res);
    }, 500);

    return () => clearTimeout(getData);
  }, [searchInput]);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">{isMac ? "⌘" : "^"} E</span>
        </kbd>{" "}
        to search
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type to search..."
          onValueChange={(str) => {
            setSearchInput(str);
          }}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {!searchInput && (
            <CommandGroup heading="Suggestions">
              <CommandItem
                value="calendar"
                onSelect={(str: string) => alert(str)}
              >
                <Calendar />
                <span className="flex flex-col">
                  <span>Calendar</span>
                  <span className="text-xs text-ellipsis">
                    A calendar tool.
                  </span>
                </span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
