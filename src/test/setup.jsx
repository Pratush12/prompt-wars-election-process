import { vi, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Fix for framer-motion in JSDOM
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>),
    button: React.forwardRef(({ children, ...props }, ref) => <button ref={ref} {...props}>{children}</button>),
    h2: React.forwardRef(({ children, ...props }, ref) => <h2 ref={ref} {...props}>{children}</h2>),
    p: React.forwardRef(({ children, ...props }, ref) => <p ref={ref} {...props}>{children}</p>),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

vi.mock('react-confetti', () => ({
  default: () => null,
}));

// Mock Google Maps New Functional API with Constructor support
// Use standard functions for constructors to avoid "not a constructor" errors
const MockMap = vi.fn(function() {
  return { setCenter: vi.fn(), setZoom: vi.fn() };
});
const MockMarker = vi.fn(function() {
  return { setMap: vi.fn() };
});

vi.mock('@googlemaps/js-api-loader', () => ({
  setOptions: vi.fn(),
  importLibrary: vi.fn().mockImplementation(async (name) => {
    if (name === "maps") return { Map: MockMap };
    if (name === "marker") return { Marker: MockMarker };
    return {};
  }),
}));

vi.mock('../lib/gemini', () => ({
  getGeminiResponse: vi.fn().mockResolvedValue('Mocked AI response for testing.'),
}));

vi.mock('../lib/firebase', () => ({
  trackInteraction: vi.fn(),
  default: {
    getAnalytics: vi.fn(),
  }
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(),
  logEvent: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = vi.fn();
