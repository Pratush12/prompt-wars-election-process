import React, { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

/**
 * GoogleMap Component
 * High-fidelity map integration using the latest functional API.
 * @param {Object} props
 * @param {Object} props.center - Initial map center {lat, lng}
 * @param {Array} props.markers - List of marker objects
 * @quality Uses modern importLibrary for performance
 */
const GoogleMap = ({ center, markers }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        setOptions({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: "weekly",
        });

        const { Map } = await importLibrary("maps");
        const { Marker } = await importLibrary("marker");

        if (!mapRef.current) return;

        const newMap = new Map(mapRef.current, {
          center: center,
          zoom: 15,
          disableDefaultUI: true,
          mapId: '4504f8d373624d0f', // Standard Map ID
        });

        markers.forEach(markerData => {
          new Marker({
            position: markerData.position,
            map: newMap,
            title: markerData.title,
          });
        });

        setMap(newMap);
      } catch (e) {
        console.error("Maps Load Error", e);
        setError("Map failed to load. Please check your API key.");
      }
    };

    initMap();
  }, [center, markers]);

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-6 text-center space-y-2">
        <p className="text-[10px] font-black uppercase tracking-widest leading-tight">{error}</p>
      </div>
    );
  }

  return (
    <div ref={mapRef} className="w-full h-full bg-slate-50 relative">
      {!map && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50/20 backdrop-blur-sm">
           <div className="w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
