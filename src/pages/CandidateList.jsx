import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronRight, User } from 'lucide-react';
import { MOCK_CANDIDATES } from '../constants';

const CandidateList = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-950">Candidate List</h2>
        <div className="flex gap-2">
           <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400">
              <Search className="w-5 h-5" />
           </button>
           <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400">
              <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_CANDIDATES.map((candidate, idx) => (
          <motion.div 
            key={candidate.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex items-center gap-4 hover:border-blue-200 transition-all active:scale-[0.98]">
               {/* Photo */}
               <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-50">
                  <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover" />
               </div>

               {/* Info */}
               <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{candidate.name}</h3>
                  <p className="text-xs font-bold text-blue-600 mb-2 truncate">{candidate.party}</p>
                  <div className="flex gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                     <span className="bg-gray-50 px-2 py-0.5 rounded-md">{candidate.education.split(' ')[0]}</span>
                     <span className="bg-gray-50 px-2 py-0.5 rounded-md">{candidate.criminalCases} Cases</span>
                  </div>
               </div>

               <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <ChevronRight className="w-5 h-5" />
               </div>
            </div>
            
            {/* Symbol Badge */}
            <div className="absolute top-2 right-2 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center text-sm">
               {candidate.symbol}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-blue-900 text-white p-6 rounded-[32px] shadow-xl relative overflow-hidden">
         <div className="relative z-10 space-y-2">
            <h4 className="font-bold">Missing someone?</h4>
            <p className="text-xs text-blue-200 leading-relaxed font-medium">Final candidate lists are published after the nomination withdrawal date. Currently showing tentative list.</p>
         </div>
         <User className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
      </div>
    </div>
  );
};

export default CandidateList;
