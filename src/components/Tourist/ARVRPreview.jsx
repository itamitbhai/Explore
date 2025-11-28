import React, { useState } from "react";


export default function ARVRPreview({ destination = null, onClose = () => {} }) {
  const [isARActive, setIsARActive] = useState(false);

  // If a destination provides a preview image or an arvrLink, use that — otherwise fallback to demo.
  const demoFallback = {
    name: destination?.name ?? "Sample Location",
    type: destination?.arvrType ?? "360° / AR",
    preview: destination?.preview ?? destination?.image ?? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=450&fit=crop",
    arvrLink: destination?.arvrLink ?? null,
  };

  return (
    <div className="w-full">
      {/* Header with title + close */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{demoFallback.name}</h2>
          <p className="text-sm text-gray-500">{demoFallback.type}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsARActive(false);
              onClose();
            }}
            className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded"
            aria-label="Close preview"
          >
            Close ✕
          </button>
        </div>
      </div>

      {/* Preview / AR area */}
      {!isARActive ? (
        <div className="space-y-4">
          <div className="w-full h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden border">
            <img
              src={demoFallback.preview}
              alt={demoFallback.name}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-gray-600">
            Preview the destination above. Click <strong>Launch Experience</strong> to enter the AR/VR demo.
            Replace this area with your 360° viewer, model-viewer, or WebXR entry point as needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsARActive(true)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 px-4 font-semibold transition"
            >
              Launch Experience
            </button>

            <button
              onClick={() => onClose()}
              className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 rounded-lg py-2.5 px-4 font-medium transition"
            >
              Close Preview
            </button>
          </div>
        </div>
      ) : (
        // AR Mode placeholder — replace with actual AR/VR implementation
        <div className="space-y-4">
          <div className="w-full bg-black rounded-lg overflow-hidden h-[60vh] md:h-[60vh] flex items-center justify-center">
            {/* If you have a real AR/VR link embed it here (iframe / model-viewer / three.js canvas / WebXR) */}
            {demoFallback.arvrLink ? (
              <iframe
                src={demoFallback.arvrLink}
                title={`${demoFallback.name} AR/VR`}
                className="w-full h-full"
                allow="xr-spatial-tracking; vr; fullscreen; camera"
              />
            ) : (
              <div className="text-white text-center px-6">
                <p className="text-lg font-semibold">AR/VR Experience Active</p>
                <p className="text-sm mt-2 text-white/80">
                  This is a placeholder AR/VR area. Integrate your WebXR / 360° viewer here.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsARActive(false)}
              className="bg-white border border-gray-200 text-gray-700 rounded-lg py-2.5 px-4 font-medium w-full"
            >
              Exit AR Mode
            </button>

            <button
              onClick={() => {
                // Optional: trigger fullscreen for immersive demo
                document.documentElement.requestFullscreen?.();
              }}
              className="bg-amber-700 hover:bg-amber-800 text-white rounded-lg py-2.5 px-4 font-semibold"
            >
              Fullscreen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
