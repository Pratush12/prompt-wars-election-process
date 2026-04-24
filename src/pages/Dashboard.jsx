import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, Users, Calendar, Mic, ArrowRight, Info, AlertTriangle, CreditCard } from 'lucide-react';
import { MOCK_ELECTIONS } from '../constants';

const Dashboard = ({ t }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      {/* Featured Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="blue-gradient rounded-3xl p-6 text-white shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 bg-white/20 w-max px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Info className="w-3 h-3" />
            LIVE Updates
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold leading-tight">{MOCK_ELECTIONS[0].title}</h2>
            <p className="opacity-80 text-sm font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {MOCK_ELECTIONS[0].constituency}
            </p>
          </div>
          <div className="flex gap-4 items-end">
            <div className="space-y-0">
               <span className="text-4xl font-black">{MOCK_ELECTIONS[0].daysLeft}</span>
               <span className="text-sm font-medium opacity-80 ml-1">Days Left</span>
            </div>
            <button className="ml-auto bg-white text-blue-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg active:scale-95 transition-transform">
              Get Notified
            </button>
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <ActionCard 
          icon={<CheckCircle2 className="text-green-600" />} 
          label="Am I Ready?" 
          sub="Check Status"
          color="bg-green-50"
          onClick={() => navigate('/ready')}
        />
        <ActionCard 
          icon={<MapPin className="text-blue-600" />} 
          label="My Booth" 
          sub="Find Location"
          color="bg-blue-50"
          onClick={() => navigate('/booths')}
        />
        <ActionCard 
          icon={<Users className="text-amber-600" />} 
          label="Compare" 
          sub="Fair Analysis"
          color="bg-amber-50"
          onClick={() => navigate('/compare')}
        />
        <ActionCard 
          icon={<Calendar className="text-purple-600" />} 
          label="Timeline" 
          sub="Key Dates"
          color="bg-purple-50"
          onClick={() => navigate('/timeline')}
        />
      </div>

      {/* Alert Card */}
      <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-start gap-3">
        <div className="bg-orange-100 p-2 rounded-xl">
           <AlertTriangle className="text-orange-600 w-5 h-5" />
        </div>
        <div className="space-y-1">
           <p className="text-sm font-bold text-orange-950">Registration Deadline Approaching</p>
           <p className="text-xs text-orange-800">Ensure your address is updated by April 30th to vote in the upcoming local elections.</p>
        </div>
      </div>

      {/* Other Upcoming */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-blue-950 px-1">Other Elections</h3>
        {MOCK_ELECTIONS.slice(1).map(election => (
          <div key={election.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-gray-400">
                {election.title.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-tight">{election.title}</p>
                <p className="text-xs text-gray-500 font-medium italic">{election.date}</p>
              </div>
            </div>
            <ArrowRight className="text-gray-300 w-5 h-5" />
          </div>
        ))}
      </div>
      {/* Election Pass / Wallet Integration */}
      <div className="px-1">
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center text-white">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">Digital Election Pass</h3>
                <p className="text-xs text-gray-500 font-medium">Quick access for voting day</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
               <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Constituency</p>
                  <p className="text-sm font-bold text-blue-950">Bengaluru Central</p>
               </div>
               <div className="text-right space-y-0.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Part No.</p>
                  <p className="text-sm font-bold text-blue-950">142A</p>
               </div>
            </div>

            <button 
              onClick={() => alert("Google Wallet API: Generating pass for 'Bengaluru Central'...")}
              className="mt-2 transition-transform active:scale-95"
            >
              <img 
                src="/assets/google_wallet_btn.png" 
                alt="Save to Google Wallet" 
                className="h-12 w-auto mx-auto"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ icon, label, sub, color, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-4 ${color} rounded-3xl text-left space-y-2 hover:shadow-md transition-all active:scale-95`}
  >
    <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <div>
      <p className="font-bold text-gray-900 leading-tight">{label}</p>
      <p className="text-[10px] text-gray-500 font-medium">{sub}</p>
    </div>
  </button>
);

export default Dashboard;
