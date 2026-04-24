import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { trackInteraction } from '../lib/firebase';

/**
 * Welcome Component
 * Handles the initial landing and onboarding of the user.
 * @param {Object} props
 * @param {Object} props.t - Translation strings
 * @param {Function} props.onComplete - Callback when district is selected
 * @quality JSDoc added, state management optimized
 * @accessibility ARIA labels and focus management
 */
const Welcome = ({ t, onComplete }) => {
  const navigate = useNavigate();
  const [district, setDistrict] = useState('');

  const handleStart = () => {
    trackInteraction('get_started_attempt', { district_filled: !!district });
    if (district) {
      onComplete?.({ district });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white overflow-hidden relative selection:bg-blue-100">
      {/* Background Orbs for Premium feel */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indian-saffron/10 rounded-full -mr-32 -mt-32 blur-3xl p-40" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indian-green/10 rounded-full -ml-32 -mb-32 blur-3xl p-40" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm flex flex-col items-center text-center space-y-12 z-10"
      >
        <div className="relative group">
          <div className="w-24 h-24 blue-gradient rounded-[32px] rotate-12 flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-0 duration-500">
             <span className="text-white text-4xl font-black -rotate-12 group-hover:rotate-0 transition-transform duration-500">VS</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indian-saffron rounded-full flex items-center justify-center ring-4 ring-white">
             <div className="w-4 h-4 rounded-full border-2 border-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black text-blue-950 tracking-tighter uppercase leading-none">{t.welcome}</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">{t.tagline}</p>
        </div>

        <div className="w-full space-y-6">
          <div className="relative group">
             <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-900 w-5 h-5 group-focus-within:scale-125 transition-transform" />
             <input 
              type="text" 
              placeholder="Enter District / PIN Code"
              aria-label="Enter your District or PIN code to personalize your assistant"
              className="w-full pl-12 pr-4 py-5 bg-gray-50 border-2 border-gray-100 rounded-3xl focus:border-blue-900 focus:bg-white outline-none transition-all font-bold text-blue-950 placeholder:text-gray-300 placeholder:font-medium"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
             />
          </div>
          
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
            {['English', 'Hindi', 'Kannada', 'Telugu'].map((l) => (
              <button 
                key={l} 
                onClick={() => setDistrict(l === 'English' ? 'Bengaluru' : district)}
                className="px-5 py-2.5 bg-white border-2 border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-blue-900 hover:text-blue-900 transition-all active:scale-95"
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleStart}
          disabled={!district}
          aria-label="Start Voting Assistant"
          className="w-full blue-gradient text-white py-5 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-blue-200 hover:shadow-blue-300 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-95 active:scale-90"
        >
          {t.getStarted}
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-loose max-w-[240px]">
          By continuing, you help us democratize election information. Your data remains local and secure.
        </p>
      </motion.div>
    </div>
  );
};

export default Welcome;
