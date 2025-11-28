import React from "react";

export default function TagFilter({ tags, selectedTag, onTagChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedTag === tag
              ? "bg-emerald-700 text-white shadow-md"
              : "bg-white text--700 hover:bg-gray-100"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
