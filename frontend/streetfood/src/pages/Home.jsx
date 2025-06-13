import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import StallCard from "../components/StallCard";

const Home = () => {
  const [stalls, setStalls] = useState([]);
  const [search, setSearch] = useState("");
  const [topRated, setTopRated] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();

  const fetchStalls = async () => {
    try {
      const res = await axios.get("/api/stalls");
      setStalls(res.data);
    } catch (err) {
      console.error("Error fetching stalls:", err);
    }
  };

  const fetchTopRated = async () => {
    try {
      const res = await axios.get("/api/stalls/top-rated");
      setTopRated(res.data);
    } catch (err) {
      console.error("Error fetching top rated:", err);
    }
  };

  const fetchRecommended = async () => {
    try {
      const res = await axios.get("/api/stalls/recommended");
      setRecommended(res.data);
    } catch (err) {
      console.error("Error fetching recommended:", err);
    }
  };

  // Only redirect, don't fetch search results here
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  useEffect(() => {
    fetchStalls();
    fetchTopRated();
    fetchRecommended();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      
      <form
        onSubmit={handleSearch}
        className="flex justify-between items-center mb-4"
      >
        <input
          type="text"
          placeholder="Search by dish"
          className="border p-2 rounded w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Top Rated Stalls</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topRated.map((stall) => (
            <StallCard key={stall._id} stall={stall} />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Recommended Stalls</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommended.map((stall) => (
            <StallCard key={stall._id} stall={stall} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">All Stalls</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stalls.map((stall) => (
            <StallCard key={stall._id} stall={stall} />
          ))}
        </div>
      </section>
    </div>
  );
};


export default Home;

