import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Languages } from 'lucide-react';

const Welcome = ({ t, onComplete }) => {
  const navigate = useNavigate();
  const [district, setDistrict] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indian-saffron/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indian-green/10 rounded-full -ml-32 -mb-32 blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center text-center space-y-8"
      >
        <div className="relative">
          <div className="w-24 h-24 blue-gradient rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
             <span className="text-white text-4xl font-black -rotate-12">VS</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indian-saffron rounded-full flex items-center justify-center">
             <div className="w-4 h-4 rounded-full border-2 border-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-blue-950 tracking-tight">{t.welcome}</h1>
          <p className="text-gray-500 font-medium">{t.tagline}</p>
        </div>

        <div className="w-full space-y-4">
          <div className="relative">
             <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-900 w-5 h-5" />
             <input 
              type="text" 
              placeholder="Enter District / PIN Code"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
             />
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {['English', 'Hindi', 'Kannada', 'Telugu'].map((l) => (
              <button key={l} className="px-4 py-2 whitespace-nowrap bg-gray-50 border border-gray-100 rounded-full text-sm font-semibold hover:border-blue-900 transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => {
            onComplete?.({ district });
            navigate('/dashboard');
          }}
          disabled={!district}
          aria-label="Get Started"
          className="w-full blue-gradient text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:shadow-blue-200 transition-all disabled:opacity-50 disabled:grayscale"
        >
          {t.getStarted}
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-gray-400 max-w-[200px]">
          By continuing, you agree to our privacy policy. Your data is processed securely and neutrally.
        </p>
      </motion.div>
    </div>
  );
};

export default Welcome;
