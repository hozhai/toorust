"use client";

import { type ComponentType, memo, Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { SearchHTTPResponse, SearchAPIElem } from "@/api/api";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SearchDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [isMac, setIsMac] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchAPIElem[]>();

  const router = useRouter();

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
    if (!searchInput) {
      return;
    }

    const timeout = setTimeout(async () => {
      const req = await fetch(`api/search?q=${searchInput}`);
      const res: SearchHTTPResponse = await req.json();

      if (res.query.results.toString() !== searchResults?.toString()) {
        setSearchResults(res.query.results.slice(0, 7));
      }
    }, 100);

    return () => clearInterval(timeout);
  }, [searchInput, searchResults]);

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
          value={searchInput}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {!searchInput && (
            <CommandGroup heading="Suggestions">
              <CommandItem
                value="calendar"
                onSelect={(str: string) => alert(str)}
              >
                <span className="flex flex-col">
                  <span>Calendar</span>
                  <span className="text-xs text-ellipsis">A calendar tool</span>
                </span>
              </CommandItem>
            </CommandGroup>
          )}
          {searchResults && (
            <CommandGroup heading={searchInput ? "Results" : "Recent"}>
              {searchResults.map((v: SearchAPIElem) => (
                <CommandItem
                  className="cursor-pointer transition-colors duration-300"
                  onSelect={() => router.push(`/${v.id}`)}
                  key={nanoid()}
                >
                  <span className="flex flex-col">
                    <span>{v.name}</span>
                    <span className="text-xs text-ellipsis">
                      {v.description}
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
