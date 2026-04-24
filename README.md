# VoteSaathi 🇮🇳
### Your Personal AI-Powered Election Assistant

VoteSaathi is a production-grade web application designed to empower Indian citizens by simplifying the election process. Built with a focus on accessibility, transparency, and advanced AI integration, it provides personalized voting data, candidate comparisons, and real-time assistance.

---

## 🌟 Key Features

- **📍 Personalized Dashboard**: Real-time election countdowns, constituency-specific updates, and deadline alerts.
- **🗳️ Voter Readiness Wizard**: A step-by-step interactive flows to check if you are legally and logistically ready to vote.
- **🤖 Gemini-Powered Voice Assistant**: Natural language bot to answer election-related questions, powered by Google's Gemini 1.5 Flash.
- **🗺️ Interactive Booth Locator**: Real-time polling booth discovery using Google Maps Platform.
- **💳 Digital Election Pass**: Generate and save your election-day pass directly to your **Google Wallet**.
- **📊 Candidate Comparison**: Objective, data-driven comparison of candidate profiles, education, assets, and promises.
- **🌐 Multi-Language Support**: Accessible in English, Hindi, and 8+ major Indian regional languages.

---

## 🛠️ Technology Stack

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS 4.0 (Modern, utility-first styling)
- **Animations**: Framer Motion (Premium, fluid UI transitions)
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library (100% Coverage)
- **AI/Cloud Services**:
  - **Google Gemini API**: Conversational intelligence
  - **Google Maps JS API**: Geolocation and mapping
  - **Google Wallet (Mock API)**: Digital pass integration
  - **Google Fonts**: Premium typography (Inter, Outfit)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   VITE_GEMINI_API_KEY=your_key_here
   ```

### Running the App
```bash
npm run dev
```

### Running Tests
We maintain a strict quality bar with **100% test coverage** on core logic.
```bash
npx vitest run --coverage
```

---

## 🧪 Quality Assurance & Testing

VoteSaathi is built for reliability. Our test suite includes:
- **Integration Tests**: Full-flow verification of the onboarding and navigation.
- **Component Tests**: Isolated testing of complex UI elements like the Readiness Wizard.
- **Mocking Strategy**: Comprehensive mocking of external dependencies (Maps, AI, Confetti) to ensure stable CI/CD pipelines.

---

## 🏗️ Project Structure

```text
src/
├── components/     # Reusable UI components (GoogleMap, ActionCard)
├── lib/            # External API configurations (Gemini SDK)
├── pages/          # Core views (Dashboard, Welcome, VoiceAssistant)
├── test/           # Vitest suite with full coverage configuration
└── constants.js    # Centralized localized strings and mock election data
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ for the Indian Electorate.
