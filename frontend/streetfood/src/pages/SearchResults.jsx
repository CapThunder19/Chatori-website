import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import StallCard from "../components/StallCard";


const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query) {
      axios
        .get(`/api/stalls/search?dish=${encodeURIComponent(query)}`)
        .then(res => setResults(res.data))
        .catch(() => setResults([]));
    }
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No stalls found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map(stall => (
            <StallCard key={stall._id} stall={stall} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
