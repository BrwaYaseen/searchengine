"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchResults = async () => {
      if (!input) {
        return setSearchResults(undefined);
      }

      const res = await fetch(
        `https://searchfast.brwayasin29.workers.dev/api/search?q=${input}`
      );
      const data = (await res.json()) as {
        results: string[];
        duration: number;
      };
      setSearchResults(data);
    };
    fetchResults();
  }, [input]);

  return (
    <main className="min-h-screen w-full grainy px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 items-center pt-16 sm:pt-24 lg:pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-center">
          Search Functionality
        </h1>
        <p className="text-zinc-600 text-base sm:text-lg max-w-prose text-center">
          Search functionality built with Hono, Next, and Cloudflare
          <br className="hidden sm:inline" /> Search for country name below and
          get results
        </p>

        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search Countries"
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results were found</CommandEmpty>
              ) : null}

              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults?.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={setInput}
                    >
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200" />
                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResults.results.length} results in{" "}
                    {searchResults?.duration.toFixed(0)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  );
}
