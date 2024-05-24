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
    <div>
      <input type="text"
       value={input}
       onChange={(e)=>{setInput(e.target.value)}} />
    </div>
  );
}
