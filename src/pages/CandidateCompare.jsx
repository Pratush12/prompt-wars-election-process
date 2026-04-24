import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, X, GraduationCap, Briefcase, IndianRupee, ShieldAlert, Award, ScrollText } from 'lucide-react';
import { MOCK_CANDIDATES } from '../constants';

const CandidateCompare = () => {
  const [selectedIds, setSelectedIds] = useState([1, 2]);

  const candidates = selectedIds.map(id => MOCK_CANDIDATES.find(c => c.id === id));

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-950">Compare Candidates</h2>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
           Neutral Comparison
        </div>
      </div>

      {/* Comparison Head */}
      <div className="grid grid-cols-2 gap-4">
        {candidates.map((c, idx) => (
          <motion.div 
            key={c.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm relative text-center space-y-3"
          >
            <div className="relative mx-auto w-20 h-20">
              <img src={c.image} alt={c.name} className="w-20 h-20 rounded-full object-cover border-2 border-gray-50" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-lg">
                {c.symbol}
              </div>
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{c.name}</p>
              <p className="text-[10px] font-bold text-blue-600 mt-1">{c.party}</p>
            </div>
            <button className="absolute -top-2 -right-2 p-1 bg-gray-100 text-gray-400 rounded-full hover:bg-red-50 hover:text-red-500">
              <Plus className="w-3 h-3 rotate-45" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <ComparisonRow label="Education" icon={<GraduationCap />} data={candidates.map(c => c.education)} />
        <ComparisonRow label="Profession" icon={<Briefcase />} data={candidates.map(c => c.profession)} />
        <ComparisonRow label="Assets" icon={<IndianRupee />} data={candidates.map(c => c.assets)} />
        <ComparisonRow 
          label="Criminal Cases" 
          icon={<ShieldAlert />} 
          data={candidates.map(c => c.criminalCases)} 
          highlight={d => d > 0 ? 'text-red-600 font-bold' : 'text-green-600'} 
        />
        <ComparisonRow label="Key Promises" icon={<ScrollText />} data={candidates.map(c => (
          <ul className="text-left list-disc list-inside space-y-1">
            {c.promises.slice(0, 2).map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        ))} />
      </div>

      <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 text-xs text-blue-800 italic">
         <X className="w-4 h-4 shrink-0 rotate-45" />
         VoteSaathi does not provide recommendations. This comparison is based on self-declared affidavits provided to the Election Commission.
      </div>
    </div>
  );
};

const ComparisonRow = ({ label, icon, data, highlight }) => (
  <div className="border-b last:border-0 border-gray-50">
    <div className="p-3 bg-gray-50/50 flex items-center gap-2">
       {React.cloneElement(icon, { size: 14, className: 'text-gray-400' })}
       <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</span>
    </div>
    <div className="grid grid-cols-2 divide-x divide-gray-50">
       {data.map((d, i) => (
         <div key={i} className={`p-4 text-xs text-center font-medium ${highlight ? highlight(d) : 'text-gray-700'}`}>
            {d}
         </div>
       ))}
    </div>
  </div>
);

export default CandidateCompare;
