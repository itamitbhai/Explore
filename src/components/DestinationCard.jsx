import React, { useState } from "react";
import ARVRPreview from "./Tourist/ARVRPreview"; // <-- ADD THIS IMPORT

const DestinationCard = ({ destination }) => {

  const [showARVR, setShowARVR] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      
      {/* Image */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{destination.location}</p>

        <p className="text-gray-700 mt-3 text-sm line-clamp-3 leading-relaxed">
          {destination.description}
        </p>

        {/* Buttons */}
        <div className="mt-5">
          {/* Two buttons side by side */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 font-semibold transition">
              View Details
            </button>

            {/* AR/VR VIEW opens modal */}
            <button
              onClick={() => setShowARVR(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 font-semibold transition"
            >
              AR/VR View
            </button>
          </div>

          {/* Add to itinerary */}
          <button className="w-full mt-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg py-2.5 font-semibold transition">
            Add to Itinerary
          </button>
        </div>
      </div>

      {/* AR/VR Preview Modal */}
      {showARVR && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl relative">
            
            {/* Close button */}
            <button
              onClick={() => setShowARVR(false)}
              className="absolute top-3 right-3 text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            {/* ARVR Component Loaded Here */}
            <ARVRPreview destination={destination} />

          </div>
        </div>
      )}

    </div>
  );
};

export default DestinationCard;
