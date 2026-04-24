import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Info, ArrowRight, UserCheck } from 'lucide-react';
import ReactConfetti from 'react-confetti';

const QUESTIONS = [
  { id: 'age', text: 'Are you 18 years or older?', info: 'Age must be 18+ as of Jan 1st of the election year.' },
  { id: 'voterId', text: 'Do you have a Voter ID Card?', info: 'EPIC card issued by the Election Commission.' },
  { id: 'roll', text: 'Is your name in the Voter Roll?', info: 'Check nvsp.in to verify your listing.' },
  { id: 'address', text: 'Is your address updated?', info: 'Your current residence must match your voter record.' },
  { id: 'booth', text: 'Do you know your polling booth?', info: 'The specific location where you will cast your vote.' }
];

const ReadyToVote = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: val };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const getScore = () => {
    const values = Object.values(answers);
    const yesCount = values.filter(v => v === true).length;
    return (yesCount / QUESTIONS.length) * 100;
  };

  if (showResult) {
    const score = getScore();
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] space-y-8">
        {score === 100 && <ReactConfetti numberOfPieces={150} recycle={false} />}
        
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl ${score === 100 ? 'bg-green-500' : 'bg-amber-500'}`}
        >
          {score}%
        </motion.div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">
            {score === 100 ? 'Ready to Vote! ✅' : 'Needs Action ⚠️'}
          </h2>
          <p className="text-gray-500 font-medium">
            {score === 100 
              ? 'Great! You have everything you need. See you on voting day!' 
              : 'You are almost there. Complete the pending steps below.'}
          </p>
        </div>

        <div className="w-full space-y-3">
          {QUESTIONS.map(q => (
            <div key={q.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
               <span className="text-sm font-semibold text-gray-700">{q.text}</span>
               {answers[q.id] ? (
                 <Check className="text-green-500 w-5 h-5" />
               ) : (
                 <AlertCircle className="text-amber-500 w-5 h-5" />
               )}
            </div>
          ))}
        </div>

        <button 
          onClick={() => window.location.href = 'https://voters.eci.gov.in/'}
          className="w-full bg-blue-900 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2"
        >
          Open Portal to Finish
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-950">Voter Readiness</h2>
        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Step {step + 1} of {QUESTIONS.length}
        </span>
      </div>

      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          className="h-full bg-blue-900"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="space-y-6 py-4"
        >
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
            <h3 className="text-xl font-bold text-center leading-relaxed">
              {QUESTIONS[step].text}
            </h3>
            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 text-sm text-blue-800">
               <Info className="w-5 h-5 shrink-0 opacity-50" />
               <p>{QUESTIONS[step].info}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
             <button 
              onClick={() => handleAnswer(false)}
              className="flex-1 py-5 bg-white border-2 border-gray-100 rounded-3xl font-bold text-gray-500 hover:border-red-200 hover:text-red-500 transition-all flex items-center justify-center gap-2"
             >
                <X className="w-6 h-6" /> No
             </button>
             <button 
              onClick={() => handleAnswer(true)}
              className="flex-1 py-5 bg-blue-900 text-white rounded-3xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-transform"
             >
                <Check className="w-6 h-6" /> Yes
             </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ReadyToVote;
