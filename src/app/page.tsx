"use client"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";
export default function Home() {
  const [input, setInput] = useState<string>("")
  const [searchResults, setSearchResults] = useState<{
    results: string[]
    duration: number
  }>()

  useEffect(()=>{
    const fetchResults = async () =>{
      if(!input)
        {return setSearchResults(undefined)} 

      const res = await fetch(`/api/search?q=${input}`)
      const data = (await res.json()) as {results: string[]; duration: number}
      setSearchResults(data)
    }
    fetchResults()
  },[input])


  return (
    <main className=" h-screen w-screen grainy">
      <div className=" flex flex-col gap-6 items-center pt-32 duration-500
       animate-in animate fade-in-5 slide-in-from-bottom-3">
        <h1 className=" text-5xl tracking-tight font-bold"> ⚡ Lightening Speed Search</h1>
        <p className=" text-zinc-600 text-lg max-w-prose text-center">
          Very fast search functionality built with Hono, Next, and Cloudflare
          <br /> Search for country name below and get results almost instantly
          </p>

          <div className=" max-w-md w-full">
            <Command>
              <CommandInput value={input} onValueChange={setInput} placeholder="Search Countries"
              className="placeholder:text-zinc-500" />
              <CommandList>
                {searchResults?.results.length === 0 ? (
                  <CommandEmpty>No results were found</CommandEmpty>
                ): null}

                {searchResults?.results ? (
                  <CommandGroup heading="Results">
                    {searchResults?.results.map((result)=>(
                      <CommandItem key={result}
                       value={result}
                       onSelect={setInput}>
                        {result}
                       </CommandItem>
                    ))}
                  </CommandGroup>
                ): null}

                {searchResults?.results ? (
                  <>
                  <div className=" h-px w-full bg-zinc-200"/>
                  <p className='p-2 text-xs text-zinc-500'>
                    Found {searchResults.results.length} results in{' '}
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
