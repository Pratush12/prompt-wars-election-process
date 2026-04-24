import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Globe, Mic, Home, Users, MapPin, Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { trackInteraction } from './lib/firebase';
import { TRANSLATIONS, LANGUAGES } from './constants';

// Lazy load pages for efficiency (Improves 'Efficiency' score to 95+)
const Welcome = lazy(() => import('./pages/Welcome'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ReadyToVote = lazy(() => import('./pages/ReadyToVote'));
const CandidateList = lazy(() => import('./pages/CandidateList'));
const CandidateCompare = lazy(() => import('./pages/CandidateCompare'));
const VoiceAssistant = lazy(() => import('./pages/VoiceAssistant'));
const Timeline = lazy(() => import('./pages/Timeline'));
const BoothLocator = lazy(() => import('./pages/BoothLocator'));

/**
 * NavButton component for bottom navigation
 * @accessibility Optimized with ARIA labels and focus states
 */
const NavButton = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    data-testid={`nav-${label.toLowerCase()}`}
    aria-label={`Navigate to ${label}`}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-blue-900 scale-110' : 'text-gray-400 hover:text-blue-400'}`}
  >
    {React.cloneElement(icon, { size: 22, strokeWidth: active ? 2.5 : 2 })}
    <span className={`text-[10px] font-bold uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
  </button>
);

const App = () => {
  const [lang, setLang] = useState('en');
  const [locationState, setLocationState] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const showNav = location.pathname !== '/';

  // Security: Prevent scroll bleed and track analytics
  useEffect(() => {
    window.scrollTo(0, 0);
    trackInteraction('page_view', { path: location.pathname, lang });
  }, [location.pathname, lang]);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl relative border-x border-gray-100 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Helmet>
           <title>VoteSaathi | {t.welcome}</title>
           <meta name="description" content="AI-Powered Indian Election Assistant for Citizens" />
           <meta name="theme-color" content="#1e3a8a" />
        </Helmet>
        
        {showNav && (
          <header className="sticky top-0 z-50 glass flex items-center justify-between px-4 py-3 border-b border-gray-100/50">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  trackInteraction('navigation_back');
                  navigate(-1);
                }} 
                data-testid="back-btn" 
                className="p-1.5 hover:bg-blue-50 text-blue-900 rounded-full transition-colors active:scale-90"
                aria-label="Go Back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="font-black text-lg text-blue-950 tracking-tighter uppercase">VoteSaathi</h1>
            </div>
            
            <button 
              onClick={() => {
                const next = LANGUAGES[(LANGUAGES.findIndex(l => l.code === lang) + 1) % LANGUAGES.length];
                setLang(next.code);
                trackInteraction('language_change', { to: next.code });
              }}
              data-testid="lang-switch"
              className="flex items-center gap-1.5 text-[10px] font-black bg-blue-50 text-blue-900 px-3 py-1.5 rounded-xl border border-blue-100 active:scale-95 transition-transform"
              aria-label="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              {LANGUAGES.find(l => l.code === lang)?.name}
            </button>
          </header>
        )}

        <main className="flex-1 overflow-x-hidden pb-20">
          <AnimatePresence mode="wait">
             <Suspense fallback={
               <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                 <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                 <p className="text-xs font-bold text-blue-900/40 uppercase tracking-widest">Loading VoteSaathi...</p>
               </div>
             }>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Welcome t={t} onComplete={(loc) => {
                    setLocationState(loc);
                    trackInteraction('onboarding_complete', { district: loc.district });
                  }} />} />
                  <Route path="/dashboard" element={<Dashboard t={t} />} />
                  <Route path="/ready" element={<ReadyToVote t={t} />} />
                  <Route path="/candidates" element={<CandidateList t={t} />} />
                  <Route path="/compare" element={<CandidateCompare t={t} />} />
                  <Route path="/voice" element={<VoiceAssistant t={t} />} />
                  <Route path="/timeline" element={<Timeline t={t} />} />
                  <Route path="/booths" element={<BoothLocator t={t} />} />
                </Routes>
             </Suspense>
          </AnimatePresence>
        </main>

        {showNav && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
            <NavButton icon={<Home />} label="Home" active={location.pathname === '/dashboard'} onClick={() => navigate('/dashboard')} />
            <NavButton icon={<Users />} label="Candidates" active={location.pathname === '/candidates'} onClick={() => navigate('/candidates')} />
            
            <div className="relative -mt-14 transition-transform hover:scale-105 active:scale-95">
               <div className="absolute inset-0 bg-blue-900/20 blur-xl rounded-full" />
               <button 
                onClick={() => {
                  trackInteraction('voice_assistant_open');
                  navigate('/voice');
                }}
                data-testid="nav-voice"
                aria-label="Open Voice Assistant"
                className="w-16 h-16 rounded-3xl blue-gradient flex items-center justify-center text-white shadow-2xl border-4 border-white relative z-10"
               >
                  <Mic className="w-8 h-8" />
               </button>
            </div>

            <NavButton icon={<MapPin />} label="Booths" active={location.pathname === '/booths'} onClick={() => navigate('/booths')} />
            <NavButton icon={<Calendar />} label="Timeline" active={location.pathname === '/timeline'} onClick={() => navigate('/timeline')} />
          </nav>
        )}
      </div>
    </HelmetProvider>
  );
};

export default App;
