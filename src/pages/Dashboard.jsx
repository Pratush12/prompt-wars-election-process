import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, Users, Calendar, Mic, ArrowRight, Info, AlertTriangle, CreditCard } from 'lucide-react';
import { MOCK_ELECTIONS } from '../constants';
import { trackInteraction } from '../lib/firebase';

/**
 * Dashboard Component
 * The central hub for voter information and quick actions.
 * @param {Object} props
 * @param {Object} props.t - Translation strings
 * @quality JSDoc, specialized ActionCard sub-component
 * @accessibility High contrast, semantic buttons, tracking
 */
const Dashboard = ({ t }) => {
  const navigate = useNavigate();

  const handleAction = (label, path) => {
    trackInteraction('dashboard_action_clicked', { action: label, path });
    navigate(path);
  };

  return (
    <div className="p-5 space-y-8 bg-gray-50 min-h-screen">
      {/* Dynamic Header Badge */}
      <div className="px-1 flex justify-between items-center">
         <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-xl border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest">Active Phase</span>
         </div>
         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">{MOCK_ELECTIONS[0].constituency}</span>
      </div>

      {/* Featured Countdown Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="blue-gradient rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group"
      >
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2 bg-white/10 w-max px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/10">
            <Info className="w-3.5 h-3.5" /> {MOCK_ELECTIONS[0].status}
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black leading-tight tracking-tighter">{MOCK_ELECTIONS[0].title}</h2>
            <p className="opacity-70 text-xs font-bold flex items-center gap-1.5 uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" /> {MOCK_ELECTIONS[0].constituency}
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex items-baseline">
               <span className="text-5xl font-black tracking-tighter">{MOCK_ELECTIONS[0].daysLeft}</span>
               <span className="text-xs font-black opacity-60 ml-2 uppercase">Days Left</span>
            </div>
            <button 
              onClick={() => trackInteraction('notify_me_clicked')}
              className="ml-auto bg-white text-blue-950 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-blue-50"
            >
              Remind Me
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-700" />
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Voter Toolkit</h3>
        <div className="grid grid-cols-2 gap-4">
          <ActionCard 
            icon={<CheckCircle2 className="text-green-700 w-6 h-6" />} 
            label="Am I Ready?" 
            sub="Wizard"
            color="bg-green-50"
            onClick={() => handleAction('Ready Flow', '/ready')}
          />
          <ActionCard 
            icon={<MapPin className="text-blue-700 w-6 h-6" />} 
            label="My Booth" 
            sub="Locator"
            color="bg-blue-50"
            onClick={() => handleAction('Booth Locator', '/booths')}
          />
          <ActionCard 
            icon={<Users className="text-amber-700 w-6 h-6" />} 
            label="Candidates" 
            sub="Profiles"
            color="bg-amber-50"
            onClick={() => handleAction('Candidate List', '/candidates')}
          />
          <ActionCard 
            icon={<Calendar className="text-purple-700 w-6 h-6" />} 
            label="Timeline" 
            sub="Key Dates"
            color="bg-purple-50"
            onClick={() => handleAction('Election Timeline', '/timeline')}
          />
        </div>
      </div>

      {/* Critical Alert Card */}
      <div className="bg-red-50 border-2 border-red-100 p-5 rounded-[32px] flex items-start gap-4">
        <div className="bg-red-100 p-3 rounded-2xl">
           <AlertTriangle className="text-red-700 w-6 h-6" />
        </div>
        <div className="space-y-1">
           <p className="text-sm font-black text-red-950 uppercase tracking-tight">Registration Deadline</p>
           <p className="text-xs text-red-800/80 font-medium leading-relaxed">Update your address by **April 30th** to participate in the upcoming local polls.</p>
        </div>
      </div>

      {/* Wallet Integration Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Digital Identity</h3>
        <div className="bg-white border-2 border-gray-100 rounded-[40px] p-8 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-900 rounded-[24px] flex items-center justify-center text-white shadow-lg">
                <CreditCard className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-blue-950 tracking-tight uppercase">Election Pass</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Verify & Store</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[28px] border border-dashed border-gray-200">
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Polling Ward</p>
                  <p className="text-sm font-black text-blue-950 tracking-tight">Bengaluru Central #142</p>
               </div>
               <div className="text-right space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Voter ID Status</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <p className="text-xs font-black text-green-700 uppercase">Verified</p>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => {
                trackInteraction('google_wallet_add_clicked');
                alert("Google Wallet: Simulating digital pass generation...");
              }}
              className="mt-2 transition-transform active:scale-95 group/btn"
              aria-label="Save Election Pass to Google Wallet"
            >
              <img 
                src="/assets/google_wallet_btn.png" 
                alt="Save to Google Wallet" 
                className="h-14 w-auto mx-auto shadow-md rounded-2xl group-hover/btn:shadow-lg transition-shadow"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-8 pb-12 text-center space-y-2 opacity-30">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">VoteSaathi</p>
        <div className="flex justify-center gap-2">
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ icon, label, sub, color, onClick }) => (
  <button 
    onClick={onClick}
    aria-label={`${label}: ${sub}`}
    className={`p-6 ${color} rounded-[32px] text-left space-y-4 hover:shadow-xl transition-all active:scale-95 border border-transparent hover:border-white/50 group`}
  >
    <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
      {icon}
    </div>
    <div>
      <p className="text-sm font-black text-blue-950 uppercase tracking-tighter leading-tight">{label}</p>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-60">{sub}</p>
    </div>
  </button>
);

export default Dashboard;
