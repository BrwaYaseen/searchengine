"use client"

import { useEffect, useState } from "react";
export default function Home() {
  const [input, setInput] = useState<string>("")
  const [searchResults, setSearchResults] = useState<{
    results: string[]
    duraion: number
  }>()

  useEffect(()=>{
    const fetchResults = async () =>{
      if(!input)
        {return setSearchResults(undefined)} 

      const res = await fetch(`/api/search?q=${input}`)
    }
    fetchResults()
  },[input])


  return (
    <main className=" h-screen w-screen grainy">
      <div className=" flex flex-col gap-6 items-center pt-32 duration-500
       animate-in animate fade-in-5 slide-in-from-bottom-3">
        <h1 className=" text-5xl tracking-tight font-bold">Lightening Speed Search</h1>
      <input type="text"
       value={input}
       onChange={(e)=>{setInput(e.target.value)}}
       className=" text-zinc-900" />
       </div>
    </main>
  );
}
