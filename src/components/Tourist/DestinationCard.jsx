import React, { useEffect, useRef, useState, memo } from "react";
import PropTypes from "prop-types";
import ARVRPreview from "./ARVRPreview";
import ViewDetails from "./ViewDetails";
const DEBUG = false;

function useBodyScrollLock(active) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev;
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

/** small focus trap */
function useModalFocusTrap(open, modalRef, onClose) {
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current = document.activeElement;
    const modalEl = modalRef.current;
    if (modalEl) {
      // focus the modal container itself (or first focusable child)
      const focusable = modalEl.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (focusable || modalEl).focus();
    }

    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        // very small focus trap implementation
        const focusableEls = modalEl.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableEls.length) {
          e.preventDefault();
          return;
        }
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      // restore focus
      try {
        previouslyFocusedRef.current?.focus?.();
      } catch (err) {
        /* ignore */
      }
    };
  }, [open, modalRef, onClose]);
}

function DestinationCardInner({ destination }) {
  const [showARVRModal, setShowARVRModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const detailsRef = useRef(null);
  const arRef = useRef(null);

  useBodyScrollLock(showDetails || showARVRModal);
  useModalFocusTrap(showDetails, detailsRef, () => setShowDetails(false));
  useModalFocusTrap(showARVRModal, arRef, () => setShowARVRModal(false));

  if (!destination || typeof destination !== "object") {
    return (
      <article className="bg-white rounded-xl border border-amber-100 p-6 shadow-sm">
        <p className="text-sm text-red-600">No destination data provided</p>
      </article>
    );
  }

  const openDetails = (e) => {
    e?.stopPropagation?.();
    DEBUG && console.log("openDetails:", destination?.id);
    setShowARVRModal(false);
    setShowDetails(true);
  };

  const openAR = (e) => {
    e?.stopPropagation?.();
    DEBUG && console.log("openAR:", destination?.id);
    setShowDetails(false);
    setShowARVRModal(true);
  };

  return (
    <>
      <article
        className="bg-white rounded-xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        role="group"
      >
        <div className="w-full h-48 overflow-hidden rounded-t-xl bg-gray-100">
          {destination.image ? (
            <img
              src={destination.image}
              alt={destination.name || "destination image"}
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              draggable={false}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-emerald-700 mb-1">{destination.name}</h3>

          {destination.location && (
            <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
              <span aria-hidden>📍</span>
              <span>{destination.location}</span>
            </p>
          )}

          <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
            {destination.description}
          </p>

          <div className="mt-5">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={openDetails}
                onKeyDown={(e) => e.key === "Enter" && openDetails(e)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                aria-label={`View details for ${destination.name}`}
              >
                View Details
              </button>

              <button
                type="button"
                onClick={openAR}
                onKeyDown={(e) => e.key === "Enter" && openAR(e)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                aria-label={`Open AR/VR for ${destination.name}`}
              >
                AR/VR View
              </button>
            </div>

            <button
              type="button"
              className="w-full mt-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg py-2.5 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              aria-label={`Add ${destination.name} to itinerary`}
              onClick={(e) => {
                e.stopPropagation();
                // placeholder: integrate with your itinerary logic
                DEBUG && console.log("Add to itinerary clicked:", destination.id);
              }}
            >
              Add to Itinerary
            </button>
          </div>
        </div>
      </article>

      {/* DETAILS MODAL */}
      {showDetails && (
        <div
          className="fixed inset-0 z-[2000] bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
          aria-hidden="true"
        >
          <div
            ref={detailsRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${destination.name} details`}
            tabIndex={-1}
            className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 max-h-[90vh] overflow-auto relative focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
              aria-label="Close details"
            >
              ✕
            </button>
            <ViewDetails destination={destination} onClose={() => setShowDetails(false)} />
          </div>
        </div>
      )}

      {/* AR/VR MODAL */}
      {showARVRModal && (
        <div
          className="fixed inset-0 z-[2000] bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowARVRModal(false)}
          aria-hidden="true"
        >
          <div
            ref={arRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${destination.name} AR/VR preview`}
            tabIndex={-1}
            className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 max-h-[90vh] overflow-auto relative focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowARVRModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
              aria-label="Close AR/VR preview"
            >
              ✕
            </button>
            <ARVRPreview destination={destination} onClose={() => setShowARVRModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

DestinationCardInner.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default memo(DestinationCardInner);
