import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Volume2, Send, Languages, ChevronRight } from 'lucide-react';
import { getGeminiResponse } from '../lib/gemini';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [phase, setPhase] = useState('idle');

  const startListening = async () => {
    setIsListening(true);
    setPhase('listening');
    setTranscript('');
    setAiResponse('');
    
    // Simulate speech-to-text
    setTimeout(async () => {
      setTranscript('What are the key points in the voter registration process?');
      setPhase('processing');
      setIsListening(false);

      const response = await getGeminiResponse("Tell me briefly about the voter registration process in India in 2-3 sentences.");
      setAiResponse(response);
      setPhase('speaking');
    }, 2000);
  };

  return (
    <div className="min-h-[85vh] flex flex-col p-6 space-y-8 bg-white overflow-hidden relative">
      {/* Waveform Background */}
      {isListening && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [40, 150, 40] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
              className="w-2 bg-blue-900 mx-1 rounded-full"
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-blue-950">Voice Assistant</h2>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-lg w-max">
             <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold text-blue-800 uppercase tracking-tight">Gemini AI Powered</span>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <Languages className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12 relative">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-4"
            >
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner">
                <Mic className="w-10 h-10" />
              </div>
              <p className="text-gray-400 font-medium">Tap to speak or ask a question</p>
            </motion.div>
          )}

          {(phase === 'listening' || phase === 'processing') && (
            <motion.div 
              key="transcript" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2 max-w-xs"
            >
              <p className="text-blue-900/40 text-sm font-bold uppercase tracking-widest">Listening...</p>
              <h3 className="text-2xl font-bold text-gray-800 italic">"{transcript || '...'}"</h3>
            </motion.div>
          )}

          {phase === 'speaking' && (
            <motion.div 
              key="response" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-blue-900 text-white p-6 rounded-[32px] shadow-2xl relative space-y-4 max-w-sm"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-blue-200">
                <Volume2 className="w-4 h-4" /> AI Voice Assistant
              </div>
              <p className="text-lg font-medium leading-relaxed">{aiResponse}</p>
              <button className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-2xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                Open Directions <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Large Mic Button */}
        <div className="relative">
          {isListening && (
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-blue-900 rounded-full"
            />
          )}
          <button 
            onClick={startListening}
            aria-label={isListening ? "Stop Listening" : "Start Listening"}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all relative z-10 ${isListening ? 'bg-red-500 scale-90' : 'blue-gradient hover:scale-105'}`}
          >
            {isListening ? <X className="text-white w-10 h-10" /> : <Mic className="text-white w-10 h-10" />}
          </button>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase ml-1">Try Asking</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {['Chunav kab hai?', 'Mera booth kaha hai?', 'Candidates kaun hain?'].map((q) => (
            <button key={q} className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl whitespace-nowrap text-sm font-semibold text-gray-600 hover:border-blue-200 transition-all">
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
