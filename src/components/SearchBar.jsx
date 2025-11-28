import React from "react";

const SearchBar = ({ onSearch, placeholder = "Search destinations..." }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="search"
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/90 shadow-md rounded-full px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:shadow-lg transition-all"
      />
    </div>
  );
};

export default SearchBar;