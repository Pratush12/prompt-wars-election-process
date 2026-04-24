import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import React, { Suspense } from 'react';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import BoothLocator from '../pages/BoothLocator';
import Timeline from '../pages/Timeline';

// Mock BOOTHS
const mockBooths = [
  { id: 1, name: 'Booth A', address: 'Addr 1', coordinates: { lat: 0, lng: 0 } }
];

describe('Secondary Pages Rendering', () => {
  it('renders BoothLocator', async () => {
    render(<BoothLocator t={{}} />);
    expect(screen.getByText(/Nearby Booths/i)).toBeInTheDocument();
  });

  it('renders Timeline', async () => {
    render(<Timeline t={{}} />);
    expect(screen.getByText(/Election Timeline/i)).toBeInTheDocument();
  });
});

describe('App Integration', () => {
  const renderApp = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };

  it('renders landing route and completes onboarding', async () => {
    renderApp('/');
    
    // Wait for lazy loaded Welcome page
    const input = await screen.findByPlaceholderText(/Enter District/i);
    expect(await screen.findByText(/VoteSaathi/i)).toBeInTheDocument();
    
    fireEvent.change(input, { target: { value: 'Bengaluru' } });
    fireEvent.click(screen.getByLabelText(/Start Voting Assistant/i));
  });

  it('toggles language and bottom nav', async () => {
    renderApp('/dashboard');
    const langBtn = await screen.findByTestId('lang-switch');
    fireEvent.click(langBtn);

    fireEvent.click(screen.getByTestId('nav-candidates'));
    fireEvent.click(screen.getByTestId('nav-booths'));
    fireEvent.click(screen.getByTestId('nav-home'));
  });

  it('handles back button', async () => {
    renderApp('/ready');
    const backBtn = await screen.findByTestId('back-btn');
    fireEvent.click(backBtn);
  });
});
