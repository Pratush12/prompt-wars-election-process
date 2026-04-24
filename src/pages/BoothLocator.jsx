import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Info, Phone, ExternalLink } from 'lucide-react';
import { BOOTHS } from '../constants';
import GoogleMap from '../components/GoogleMap';

const BoothLocator = () => {
  const mapCenter = { lat: 12.9716, lng: 77.5946 };
  const markers = BOOTHS.map(b => ({
    position: b.coordinates,
    title: b.name
  }));

  return (
    <div className="p-0 space-y-0">
      {/* Search Header */}
      <div className="p-4 bg-white border-b border-gray-100 flex gap-2">
         <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by area / PIN" 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-xl text-sm border-none focus:ring-1 focus:ring-blue-900 outline-none"
              defaultValue="Indiranagar, Bengaluru"
            />
         </div>
      </div>

      {/* Real Google Map Area */}
      <div className="h-64 bg-slate-100 relative overflow-hidden border-b border-gray-100">
         <GoogleMap center={mapCenter} markers={markers} />
      </div>

      {/* Booth List */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-gray-900">Nearby Booths</h3>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            2 Found
          </span>
        </div>

        {BOOTHS.map(booth => (
          <motion.div 
            key={booth.id}
            whileHover={{ y: -2 }}
            className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                 <h4 className="font-bold text-gray-900">{booth.name}</h4>
                 <p className="text-xs text-gray-500 font-medium">{booth.address}</p>
               </div>
               <div className="text-right">
                 <p className="text-sm font-black text-blue-900">{booth.distance}</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase">{booth.time}</p>
               </div>
            </div>

            <div className="flex gap-2 text-xs font-bold pt-2 divide-x divide-gray-100">
               <div className="flex items-center gap-1 text-green-600 pr-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  No Queue
               </div>
               <div className="flex items-center gap-1 text-gray-500 px-3">
                  <Navigation className="w-3 h-3" />
                  Level Access
               </div>
            </div>

            <div className="flex gap-3">
               <button className="flex-1 bg-blue-900 text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                  <Navigation className="w-4 h-4" /> Get Directions
               </button>
               <button className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:text-blue-900 transition-colors">
                  <Phone className="w-5 h-5" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* FAQ Link */}
      <div className="p-4">
         <div className="bg-amber-50 p-4 rounded-2xl flex items-center gap-3">
            <Info className="text-amber-600 w-5 h-5 shrink-0" />
            <p className="text-xs text-amber-900 font-medium leading-normal">
              Not finding your booth? Ensure you are checking for the <strong>correct constituency</strong>. <span className="underline font-bold">Read FAQ</span>
            </p>
         </div>
      </div>
    </div>
  );
};

export default BoothLocator;
