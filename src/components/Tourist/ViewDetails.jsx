import React from "react";

export default function ViewDetails({ destination, onClose, onOpenARVR }) {
  if (!destination) {
    console.warn("ViewDetails received no destination!");
    return (
      <div className="p-6 text-center text-red-600">
        No destination data available.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {destination.name}
          </h1>

          {destination.location && (
            <p className="text-sm text-gray-500 mt-1">
              {destination.location}
            </p>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 rounded-md px-3 py-1 text-xl"
            aria-label="Close details"
          >
            ✕
          </button>
        )}
      </div>

      {/* Image + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Image */}
        <div className="md:col-span-1">
          <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border shadow-sm">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Summary Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {destination.rating && (
              <span className="inline-block bg-emerald-600 text-white text-sm px-3 py-1 rounded-full">
                ⭐ {destination.rating}
              </span>
            )}

            {destination.duration && (
              <span className="inline-block bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full">
                {destination.duration}
              </span>
            )}

            {destination.price && (
              <span className="inline-block bg-amber-700 text-white text-sm px-3 py-1 rounded-full">
                From ${destination.price}
              </span>
            )}
          </div>
        </div>

        {/* Main Details */}
        <div className="md:col-span-2">

          {/* Overview */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Overview</h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            {destination.description}
          </p>

          {/* Highlights */}
          {Array.isArray(destination.highlights) &&
            destination.highlights.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  Highlights
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {destination.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 flex items-center gap-2"
                    >
                      <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full" />
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5 font-semibold transition">
              Book Now
            </button>

            {/* AR/VR Preview Button (Opens AR modal) */}
            <button
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 font-semibold transition"
              onClick={onOpenARVR}
            >
              AR/VR Preview
            </button>

            <button className="flex-1 bg-white border border-gray-200 text-gray-700 rounded-lg py-2.5 font-medium transition">
              Save to Itinerary
            </button>
          </div>

          {/* Extra Info */}
          <div className="mt-6 text-sm text-gray-600">
            {destination.notes && <p className="mb-2">{destination.notes}</p>}
            <p>
              <strong>Tips:</strong> Wear comfortable shoes for outdoor
              exploration. Check weather before travel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
