import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = ({ center, markers }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"]
    });

    loader.load()
      .then((google) => {
        if (!mapRef.current) return;
        const newMap = new google.maps.Map(mapRef.current, {
          center: center,
          zoom: 15,
          disableDefaultUI: true,
        });

        markers.forEach(markerData => {
          new google.maps.Marker({
            position: markerData.position,
            map: newMap,
            title: markerData.title,
          });
        });

        setMap(newMap);
      })
      .catch(e => {
        console.error("Maps Load Error", e);
        setError("Map failed to load. Please check your API key.");
      });
  }, [center, markers]);

  if (error) return <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-500 p-4 text-center">{error}</div>;

  return <div ref={mapRef} className="w-full h-full bg-slate-50" />;
};

export default GoogleMap;
