import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Dashboard from '../pages/Dashboard';
import BoothLocator from '../pages/BoothLocator';
import Timeline from '../pages/Timeline';
import CandidateCompare from '../pages/CandidateCompare';
import CandidateList from '../pages/CandidateList';
import App from '../App';

const wrap = (comp) => <BrowserRouter>{comp}</BrowserRouter>;

describe('Secondary Pages Rendering', () => {
  const t = { tagline: 'Tagline' };

  it('renders Dashboard with action cards', () => {
    render(wrap(<Dashboard t={t} />));
    expect(screen.getByText(/Lok Sabha General Elections/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Am I Ready?/i));
  });

  it('renders BoothLocator with mock list', () => {
    render(wrap(<BoothLocator t={t} />));
    expect(screen.getAllByText(/St. Mary's Secondary School/i)[0]).toBeInTheDocument();
  });

  it('renders Timeline with markers', () => {
    render(wrap(<Timeline t={t} />));
    expect(screen.getByText(/Voter Registration/i)).toBeInTheDocument();
  });

  it('renders CandidateCompare table', () => {
    render(wrap(<CandidateCompare t={t} />));
    expect(screen.getByText(/Dr. Ramesh Kumar/i)).toBeInTheDocument();
    expect(screen.getByText(/Priya Devi/i)).toBeInTheDocument();
  });

  it('renders CandidateList cards', () => {
    render(wrap(<CandidateList t={t} />));
    expect(screen.getByText(/Arjun Singh/i)).toBeInTheDocument();
  });
});

describe('App Integration', () => {
  it('renders landing route and completes onboarding', () => {
    render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
    expect(screen.getByText(/VoteSaathi/i)).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText(/Enter District/i);
    fireEvent.change(input, { target: { value: 'Bengaluru' } });
    fireEvent.click(screen.getByLabelText(/Get Started/i));
  });

  it('toggles language and bottom nav', () => {
    render(<MemoryRouter initialEntries={['/dashboard']}><App /></MemoryRouter>);
    fireEvent.click(screen.getByTestId('lang-switch'));
    fireEvent.click(screen.getByTestId('nav-candidates'));
    fireEvent.click(screen.getByTestId('nav-booths'));
    fireEvent.click(screen.getByTestId('nav-timeline'));
    fireEvent.click(screen.getByTestId('nav-home'));
    fireEvent.click(screen.getByTestId('nav-voice'));
  });

  it('handles back button', () => {
    render(<MemoryRouter initialEntries={['/ready']}><App /></MemoryRouter>);
    fireEvent.click(screen.getByTestId('back-btn'));
  });

  it('renders all other routes', async () => {
    const routes = [
      { path: '/ready', text: /Readiness/i },
      { path: '/compare', text: /Compare/i },
      { path: '/booths', text: /Booth/i },
      { path: '/voice', text: /Voice/i },
      { path: '/timeline', text: /Timeline/i },
      { path: '/candidates', text: /Candidates/i }
    ];
    for (const r of routes) {
      render(<MemoryRouter initialEntries={[r.path]}><App /></MemoryRouter>);
      expect(await screen.findAllByText(r.text)).toBeTruthy();
      cleanup();
    }
  });
});

describe('Dashboard Action Cards', () => {
  it('clicks all action cards', () => {
    render(wrap(<Dashboard t={{}} />));
    fireEvent.click(screen.getByText(/Am I Ready?/i));
    fireEvent.click(screen.getByText(/My Booth/i));
    fireEvent.click(screen.getByText(/Compare/i));
    fireEvent.click(screen.getByText(/Timeline/i));
    fireEvent.click(screen.getByText(/Get Notified/i));
  });
});
