import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, MapPin, Mic, Calendar, Settings, ChevronLeft, Globe } from 'lucide-react';
import { TRANSLATIONS, LANGUAGES } from './constants';

// Pages (will be defined below)
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import ReadyToVote from './pages/ReadyToVote';
import CandidateCompare from './pages/CandidateCompare';
import BoothLocator from './pages/BoothLocator';
import VoiceAssistant from './pages/VoiceAssistant';
import Timeline from './pages/Timeline';
import CandidateList from './pages/CandidateList';

const Layout = ({ children, currentLang, setLang }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const showNav = location.pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl">
      {/* Top Bar */}
      {showNav && (
        <header className="sticky top-0 z-50 glass flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} data-testid="back-btn" className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-indian-blue text-blue-900" />
            </button>
            <h1 className="font-bold text-lg text-blue-900">VoteSaathi</h1>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => {
                const next = LANGUAGES[(LANGUAGES.findIndex(l => l.code === currentLang) + 1) % LANGUAGES.length];
                setLang(next.code);
              }}
              data-testid="lang-switch"
              className="flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-900 px-2 py-1 rounded-full"
            >
              <Globe className="w-3 h-3" />
              {LANGUAGES.find(l => l.code === currentLang).native}
            </button>
          </div>
        </header>
      )}

      <main className="flex-1 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 mb-0">
          <NavButton icon={<Home />} label="Home" active={location.pathname === '/dashboard'} onClick={() => navigate('/dashboard')} />
          <NavButton icon={<Users />} label="Candidates" active={location.pathname === '/candidates'} onClick={() => navigate('/candidates')} />
          <div className="relative -mt-12">
             <button 
              onClick={() => navigate('/voice')}
              data-testid="nav-voice"
              className="w-16 h-16 rounded-full blue-gradient flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform border-4 border-white"
             >
                <Mic className="w-8 h-8" />
             </button>
          </div>
          <NavButton icon={<MapPin />} label="Booths" active={location.pathname === '/booths'} onClick={() => navigate('/booths')} />
          <NavButton icon={<Calendar />} label="Timeline" active={location.pathname === '/timeline'} onClick={() => navigate('/timeline')} />
        </nav>
      )}
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} data-testid={`nav-${label.toLowerCase()}`} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-900' : 'text-gray-400'}`}>
    {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const App = () => {
  const [lang, setLang] = useState('en');
  const [location, setLocation] = useState(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <Layout currentLang={lang} setLang={setLang}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Welcome t={t} onComplete={(loc) => setLocation(loc)} />} />
          <Route path="/dashboard" element={<Dashboard t={t} />} />
          <Route path="/ready" element={<ReadyToVote t={t} />} />
          <Route path="/compare" element={<CandidateCompare t={t} />} />
          <Route path="/booths" element={<BoothLocator t={t} />} />
          <Route path="/voice" element={<VoiceAssistant t={t} />} />
          <Route path="/timeline" element={<Timeline t={t} />} />
          <Route path="/candidates" element={<CandidateList t={t} />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
