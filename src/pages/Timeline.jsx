import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { TIMELINE_DATA } from '../constants';

const Timeline = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-blue-950">Election Timeline</h2>
        <p className="text-gray-500 text-sm font-medium">Follow the roadmap to Election Day</p>
      </div>

      <div className="relative ml-4 space-y-12">
        {/* Vertical Line */}
        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-200" />

        {TIMELINE_DATA.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-10"
          >
            {/* Timeline Dot */}
            <div className={`absolute left-[-5px] top-1 w-3 h-3 rounded-full border-2 border-white z-10 ${
              item.status === 'completed' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
              item.status === 'active' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
              'bg-gray-300'
            }`} />

            {/* Content */}
            <div className={`p-5 rounded-3xl border transition-all ${
              item.status === 'active' ? 'bg-white border-blue-100 shadow-xl shadow-blue-50' : 'bg-gray-50/50 border-gray-100'
            }`}>
              <div className="flex justify-between items-start mb-2">
                 <h3 className={`font-bold ${item.status === 'active' ? 'text-blue-900' : 'text-gray-900'}`}>
                   {item.label}
                 </h3>
                 {item.status === 'completed' && <CheckCircle2 className="text-green-500 w-4 h-4" />}
                 {item.status === 'active' && <Clock className="text-blue-500 w-4 h-4 animate-pulse" />}
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{item.date}</p>
              
              {item.status === 'active' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-2xl text-[11px] text-blue-800 font-medium">
                  Currently open. Candidates are filing their papers at the district headquarters.
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Footer Info */}
      <div className="bg-gray-50 p-4 rounded-2xl text-center">
         <p className="text-xs text-gray-400">Dates are subject to change by the Election Commission of India (ECI).</p>
      </div>
    </div>
  );
};

export default Timeline;
