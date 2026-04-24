export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' }
];

export const MOCK_ELECTIONS = [
  {
    id: 1,
    title: 'Lok Sabha General Elections 2026',
    date: '2026-05-15',
    type: 'National',
    constituency: 'Bengaluru Central',
    daysLeft: 21,
    status: 'Upcoming'
  },
  {
    id: 2,
    title: 'Karnataka State Assembly By-Election',
    date: '2026-06-12',
    type: 'State',
    constituency: 'Hebbal',
    daysLeft: 48,
    status: 'Upcoming'
  }
];

export const MOCK_CANDIDATES = [
  {
    id: 1,
    name: 'Dr. Ramesh Kumar',
    party: 'People\'s Progress Party (PPP)',
    symbol: '🚀',
    education: 'PhD in Public Policy',
    profession: 'Academic / Social Worker',
    assets: '₹4.5 Crores',
    criminalCases: 0,
    promises: ['Better Public Transport', '24/7 Water Supply', 'Digital Literacy Hubs'],
    image: 'https://i.pravatar.cc/300?u=ramesh'
  },
  {
    id: 2,
    name: 'Smt. Priya Devi',
    party: 'National Vikas Front (NVF)',
    symbol: '⚙️',
    education: 'Masters in Economics',
    profession: 'Businesswoman',
    assets: '₹12.2 Crores',
    criminalCases: 1,
    promises: ['Startup Incentives', 'Women Safety Units', 'Green Parks'],
    image: 'https://i.pravatar.cc/300?u=priya'
  },
  {
    id: 3,
    name: 'Arjun Singh',
    party: 'Common Man Union (CMU)',
    symbol: '🏠',
    education: 'Graduate',
    profession: 'Farmer Activist',
    assets: '₹85 Lakhs',
    criminalCases: 0,
    promises: ['Minimum Support Price', 'Rural Hospital Upgrade', 'Education for All'],
    image: 'https://i.pravatar.cc/300?u=arjun'
  }
];

export const BOOTHS = [
  {
    id: 1,
    name: 'St. Mary\'s Secondary School',
    distance: '0.8 km',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    address: '12th Main Road, Indiranagar, Bengaluru',
    time: '12 mins walking'
  },
  {
    id: 2,
    name: 'Civic Community Hall',
    distance: '1.5 km',
    coordinates: { lat: 12.9721, lng: 77.5930 },
    address: 'Near Metro Station, Bengaluru Central',
    time: '5 mins driving'
  }
];

export const TIMELINE_DATA = [
  { label: 'Voter Registration', date: 'Ongoing', status: 'completed' },
  { label: 'Nomination Filing', date: 'April 10 - April 17', status: 'active' },
  { label: 'Campaigning Phase', date: 'April 18 - May 13', status: 'upcoming' },
  { label: 'Voting Day', date: 'May 15', status: 'upcoming' },
  { label: 'Result Declaration', date: 'May 20', status: 'upcoming' }
];

export const TRANSLATIONS = {
  en: {
    welcome: 'Welcome to VoteSaathi',
    tagline: 'Your Personal Election Assistant',
    getStarted: 'Get Started',
    readyToVote: 'Am I Ready to Vote?',
    findBooth: 'Find My Booth',
    compareCandidates: 'Compare Candidates',
    timeline: 'Election Timeline',
    voiceAsst: 'Voice Assistant',
    location: 'Current Location',
    language: 'Preferred Language'
  },
  hi: {
    welcome: 'वोटसाथी में आपका स्वागत है',
    tagline: 'आपका व्यक्तिगत चुनाव सहायक',
    getStarted: 'शुरू करें',
    readyToVote: 'क्या मैं वोट देने के लिए तैयार हूँ?',
    findBooth: 'अपना बूथ खोजें',
    compareCandidates: 'उम्मीदवारों की तुलना करें',
    timeline: 'चुनाव समयरेखा',
    voiceAsst: 'आवाज़ सहायक',
    location: 'वर्तमान स्थान',
    language: 'पसंदीदा भाषा'
  }
  // Simplified for prototype, expanded in real app
};
