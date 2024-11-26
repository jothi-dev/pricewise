"use client";

import { FormEvent, useState } from "react";
import { scrapeAndStoreProduct } from "@/lib/actions";

const SearchBar = () => {
  const isValidAmazonProductUrl = (url: string) => {
    try{
      const parsedUrl = new URL(url)
      const hostname = parsedUrl.hostname;
      if(
        hostname.includes('amazon.com') || 
        hostname.includes ('amazon.') || 
        hostname.endsWith('amazon')
      )
      return true;
    }catch(error){
      return false;
    }
    return false;

  }
  const [searchPrompt, setSearchPrompt] = useState('');
  const[isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductUrl(searchPrompt)
    if(!isValidLink) return alert('Please provide a valid amazon link');
    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-wrap items-center gap-4 mt-12"
      onSubmit={handleSubmit}
      aria-label="Search Form"
    >
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) =>setSearchPrompt(e.target.value)}
        placeholder="enter product link"
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled ={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
