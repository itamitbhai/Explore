import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../data/destinations";
import TagFilter from "../components/TagFilter";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", "Nature", "Waterfalls", "Wildlife", "Heritage", "Culture", "Adventure"];

  const filteredDestinations = destinations.filter((destination) => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !q ||
      (destination.name && destination.name.toLowerCase().includes(q)) ||
      (destination.description && destination.description.toLowerCase().includes(q)) ||
      (destination.location && destination.location.toLowerCase().includes(q)) ||
      (destination.tags && destination.tags.some(tag => tag.toLowerCase().includes(q)));

    const matchesTag = selectedTag === "All" || (destination.tags && destination.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-gradient-to-b from-green-500 to-emerald-300 text-white pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Jharkhand</h1>
            <p className="text-lg text-white/90 mb-8">Discover nature, culture, waterfalls, wildlife and more.</p>
            <div className="mb-8">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 pt-6">
        <div className="sticky top-0 z-10 bg-gradient-to-b from-gray-500 to-gray-300 pt-4 pb-3 shadow-md backdrop-blur-sm pointer-events-none">
          <div className="pointer-events-auto">
            <TagFilter tags={tags} selectedTag={selectedTag} onTagChange={setSelectedTag} />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">All Destinations</h2>
            <p className="text-gray-600 mt-1">{filteredDestinations.length} destinations found</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
            New Trip Plan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <motion.div key={destination.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }}>
              <DestinationCard destination={destination} />
            </motion.div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No destinations found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
